import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'

const Header = () => {
  return (
    <div className='header' style={{backgroundImage: `url(${assets.header_img})`}}>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes.Whether you're craving the bold spices of Indian cuisine, the comforting familiarity of Italian pasta, or the fresh flavors of sushi, our food delivery service brings the world's finest dishes directly to you. </p>
        <a href="#explore-menu">View Menu</a>
      </div>
    </div>
  )
}

export default Header
