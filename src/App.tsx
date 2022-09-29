import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";

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
