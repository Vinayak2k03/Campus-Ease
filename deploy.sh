#!/bin/bash
set -e

# Navigate to project directory
cd ~/Campus-Ease

# Install required packages if not already installed
if ! command -v npm &> /dev/null; then
  echo "Installing Node.js and npm..."
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt install -y nodejs
fi

if ! command -v pm2 &> /dev/null; then
  echo "Installing PM2..."
  sudo npm install -g pm2
fi

if ! command -v nginx &> /dev/null; then
  echo "Installing nginx..."
  sudo apt update
  sudo apt install -y nginx
fi

# Create Backend .env file with environment variables
cat > Backend/.env << EOF
DATABASE_URL=${DATABASE_URL}
JWT_SECRET=${JWT_SECRET}
EOF

# Create uploads directory if it doesn't exist
mkdir -p Backend/uploads
chmod 755 Backend/uploads

# Create Backend PM2 configuration
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: "Campus-Ease-backend",
      script: "./Backend/server.js",
      env: {
        NODE_ENV: "production",
        PORT: 4000
      }
    },
    {
      name: "Campus-Ease-frontend",
      script: "npx",
      args: "serve -s frontend/dist -l 3000",
      env: {
        NODE_ENV: "production"
      }
    },
    {
      name: "Campus-Ease-admin",
      script: "npx",
      args: "serve -s Admin/dist -l 3001",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
EOF

# Configure Nginx
sudo bash -c 'cat > /etc/nginx/sites-available/Campus-Ease << EOT
server {
    listen 80;
    server_name ${DOMAIN_NAME};

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location /admin {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_redirect off;
    }

    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location /images {
        alias /home/$USER/Campus-Ease/Backend/uploads;
    }
}
EOT'

# Install serve package globally if not already installed
if ! npm list -g serve &> /dev/null; then
  sudo npm install -g serve
fi

# Enable site if not already enabled
sudo ln -sf /etc/nginx/sites-available/Campus-Ease /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

# Stop any existing PM2 processes
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# Start applications with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "Deployment completed successfully!"
