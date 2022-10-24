import './App.css';
import './components/Header/Header.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header/Header';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Reset from "./components/Auth/Reset";

function App() {
  return (
    <div id="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact-path="/register" element={<Register />} />
          <Route exact-path="/reset" element={<Reset />} />
          <Route exact-path="/dashboard" element={<Header />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
