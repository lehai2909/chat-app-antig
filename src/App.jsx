import { useState } from "react";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Chat from "./components/Chat";
import Search from "./components/Search";
import UserInfo from "./components/UserInfo";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

function App() {
  const isAuthenticated = () => {
    const user = sessionStorage.getItem("user");
    return !!user;
  };
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="content-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/chat"
              element={
                isAuthenticated() ? <Chat /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/about"
              element={
                isAuthenticated() ? <UserInfo /> : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
