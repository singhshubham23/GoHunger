import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import CartPage from "./screens/CartPage";
import { CartProvider } from "./components/ContextReducer";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
