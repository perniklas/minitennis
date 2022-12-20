import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useReducer, useState } from 'react';
import Home from './components/Home/Home';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Reset from "./components/Auth/Reset";
import NewGame from './components/NewGame/NewGame';
import MyPage from './components/MyGames/MyPage';
import { getAllRegisteredUsers, getUsers } from './helpers/firestore';

function App() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    let route = window.location.href.split('/').at(-1);
    if (!route.length) route = 'dashboard';
    document.getElementById(`navigationbutton_${route}`)?.classList.add('active');

    if (users.length) {
      console.log('users are already loaded thanks');
      return;
    } 
      
    getUsers().then(response => {
      setUsers(response);
    });

    // const unsubscribe = getAllRegisteredUsers(setUsers, 1000);
    // return () => unsubscribe();
  });

  return (
    <div id="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home users={users} tournaments={[]} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/newgame" element={<NewGame users={users ?? []} />} />
          <Route path="/mygames" element={<MyPage users={users ?? []} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
