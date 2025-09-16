import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Publishers from "./components/Publishers";
import Books from "./components/Books";
import Footer from "./components/Footer";
import CreateBook from "./components/CreateBook";
import "./styles/base.scss";



const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Publishers/>} />
        <Route path="/publishers" element={<Publishers/>} />
        <Route path="/books" element={<Books/>} />
        <Route path="/add-book" element={<CreateBook/>} />
        <Route path="/update-book/:bookId" element={<CreateBook/>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;
