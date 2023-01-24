import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import Home from './components/Home/Home';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Reset from "./components/Auth/Reset";
import NewGame from './components/NewGame/NewGame';
import MyPage from './components/MyGames/MyPage';
import { useAppDispatch } from './Redux/hooks';
import { store } from './Redux/store';
import { setAllUsers } from './Redux/actions';
import { getAllRegisteredUsersListener, getIncomingMatchesListener } from './helpers/firestore';
import { User } from './interfaces/User';

function App() {
  const dispatch = useAppDispatch();
  const state = store.getState();
  const [incomingMatches, setIncomingMatches] = useState([]);

  useEffect(() => {
    const userCallback = (pUsers: User[]) => {
      dispatch(setAllUsers(pUsers));
    };

    const unsubFromUsers = getAllRegisteredUsersListener(userCallback);
    let unsubFromIncoming = () => {};

    if (state.loggedIn) {
      unsubFromIncoming = getIncomingMatchesListener(setIncomingMatches);
    }

    return () => {
      unsubFromIncoming();
      unsubFromUsers();
    }
  }, []);

  return (
    <div id="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home notification={(incomingMatches.length > 0)}
          />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/mygames" element={<MyPage />} />
          <Route path="/newgame" element={<NewGame />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
