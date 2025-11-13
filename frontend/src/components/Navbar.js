import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./ContextReducer";
import CartModal from "./CartModal";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));
  const [showCart, setShowCart] = useState(false);
  const cartItems = useCart();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setShowCart(false);
  };

  const totalQty = cartItems.reduce((s, it) => s + (Number(it.quantity) || 0), 0);

  return (
    <>
      <nav
  className="navbar navbar-expand-lg navbar-dark bg-success sticky-top shadow-sm"
  style={{
    marginBottom: "0",
    padding: "0.3rem 1rem",
    borderBottom: "2px solid #2e7d32",
  }}
>
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fw-bold fst-italic" to="/">
            🍴 Go Hunger
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="btn fs-5 bg-white text-success mx-1" to="/">
                  Home
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto d-flex align-items-center">
              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="btn fs-5 bg-white text-success mx-1" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn fs-5 bg-white text-success mx-1" to="/signup">
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item me-2">
                    <button
                      className="btn fs-5 bg-white text-success mx-1 position-relative"
                      onClick={() => setShowCart(true)}
                    >
                      🛒 My Cart
                      {totalQty > 0 && (
                        <span
                          className="badge rounded-pill bg-danger text-white position-absolute top-0 start-100 translate-middle"
                          style={{ fontSize: "0.7rem" }}
                        >
                          {totalQty}
                        </span>
                      )}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn fs-5 bg-white text-success mx-1"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {showCart && <CartModal onClose={() => setShowCart(false)} />}
    </>
  );
};

export default Navbar;
