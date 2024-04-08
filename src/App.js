import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import Home from "./components/Layout/Home";
import UpdateProfile from "./components/Layout/UpdateProfile";
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/Layout/ForgotPassword";
import Expenses from "./components/Expenses/Expenses";
import { useSelector } from "react-redux";
import PremiumFeature from "./components/Expenses/PremiumFeature";
import Categories from "./components/Expenses/Categories/Categories";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Signup />} />
          <Route
            path="home"
            element={isLoggedIn ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="update"
            element={isLoggedIn ? <UpdateProfile /> : <Navigate to="/" />}
          />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route
            path="expenses"
            element={isLoggedIn ? <Expenses /> : <Navigate to="/" />}
          />
          <Route
            path="premium"
            element={isLoggedIn ? <PremiumFeature /> : <Navigate to="/" />}
          />
          <Route
            path="categories"
            element={isLoggedIn ? <Categories /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
