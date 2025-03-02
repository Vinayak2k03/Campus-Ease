import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import FoodLaundry from "./pages/FoodLaundry/FoodLaundry";
import Food from "./pages/Food/Food";
import OrderPlaced from "./pages/PlaceOrder/orderPlaced";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

const App = () => {
  // const{ isAuthenticated, user } = useAuth0();
  // Check if the user's email is the specific email for admin access
  // const isAdmin =
  //   isAuthenticated && user && user.email === "vinayaknagar2810@gmail.com";
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<FoodLaundry />} />
          <Route path="/home" element={<Home />} />
          <Route path="/food/:RestaurantID" element={<Food />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          {/* <Route path="/order/orderPlaced" element={<OrderPlaced />} /> */}
          <Route path="/orderPlaced" element={<OrderPlaced />} />
          <Route path="/login" element={<LoginPopup />} />
          <Route path='/verify' element={<Verify/>} />
          <Route path='/myorders' element={<MyOrders/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
