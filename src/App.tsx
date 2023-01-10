import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import Home from './components/Home/Home';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Reset from "./components/Auth/Reset";
import NewGame from './components/NewGame/NewGame';
import MyPage from './components/MyGames/MyPage';
import { loggedIn } from './helpers/firebase';
import { useAppDispatch } from './Redux/hooks';
import { store } from './Redux/store';
import { fetchAllUsers, fetchIncomingMatches } from './Redux/actions';

function App() {
  const dispatch = useAppDispatch();
  let usersLoaded = false;
  let incomingLoaded = false;
  const state = store.getState();
  const [users, setUsers] = useState([]);
  const [incomingMatches, setIncomingMatches] = useState([]);
  
  useEffect(() => {
    if (!state.users.length && !usersLoaded) {
      dispatch(fetchAllUsers(setUsers));
      usersLoaded = true;
    }
    
    if (!state.incomingMatches.length && !incomingLoaded && loggedIn) {
      dispatch(fetchIncomingMatches(setIncomingMatches)); 
      incomingLoaded = true;
    }
  }, []);

  return (
    <div id="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home users={users} notification={(incomingMatches.length > 0)} 
           />} />
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
