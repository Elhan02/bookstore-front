import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Publishers from "./components/Publishers";
import Books from "./components/Books";
import Footer from "./components/Footer";
import CreateBook from "./components/CreateBook";
import "./styles/base.scss";
import UserContext from "./components/UserContext";
import Login from "./components/Login";



const App = () => {
  const token = localStorage.getItem('token');
  const payload = token? JSON.parse(atob(token.split('.')[1])) : null;
  const [user, setUser] = useState(payload);
  return (
    <UserContext.Provider value={{ user, setUser }}>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Books/>} />
        <Route path="/publishers" element={<Publishers/>} />
        <Route path="/books" element={<Books/>} />
        <Route path="/add-book" element={<CreateBook/>} />
        <Route path="/update-book/:bookId" element={<CreateBook/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Footer />
    </Router>
    </UserContext.Provider>
  )
}

export default App;
