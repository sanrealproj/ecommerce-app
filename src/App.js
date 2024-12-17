import "./App.css";
import { Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import Admin from "./components/Admin";
import HomePage from "./components/pages/HomePage";
import ProductsPage from "./components/pages/ProductsPage";
import CartPage from "./components/pages/CartPage";
import ErrorPage from "./components/pages/ErrorPage";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import { useState, useEffect } from "react";
import Navigation from "./components/lauouts/Navigation";
import PrivateRoute from "./PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import FootballMatchesData from "./components/pages/FootballMatchesData";

function App() {
  const loggedUser = JSON.parse(sessionStorage.getItem("loginUser")) || [];
  const authUser = loggedUser.length === 1;
  const userAuth = useSelector((state) => state.users.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    // Logic to set user as authenticated
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (userAuth.length === 1) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [userAuth]);

  const handleLogout = () => {
    sessionStorage.removeItem("loginUser");
    setIsAuthenticated(false);
  };
  return (
    <>
      <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hacker" element={<FootballMatchesData />} />
        <Route
          path="/users"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ProductsPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/users/:id" element={<Register />} />
        <Route path="/login" element={<Login />} />{" "}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
