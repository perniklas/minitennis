import './App.css';
import './components/Header/Header.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home/Home';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Reset from "./components/Auth/Reset";
import NewGame from './components/NewGame/NewGame';

function App() {
  return (
    <div id="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/newgame" element={<NewGame />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
