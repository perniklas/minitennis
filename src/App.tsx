import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useReducer } from 'react';
import Home from './components/Home/Home';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Reset from "./components/Auth/Reset";
import NewGame from './components/NewGame/NewGame';
import MyGames from './components/MyGames/MyGames';
import { firestoreReducer } from './firestoreReducer';
import { getDashboardOverview, getMyMatches } from './helpers/firestore';

function App() {
  const [state, dispatch] = useReducer(firestoreReducer, {
    matches: [],
    users: [],
    tournaments: []
  });

  let route = window.location.href.split('/').at(-1);
  if (!route.length) route = 'dashboard';
  console.log(`navigationbutton_${route}`);
  document.getElementById(`navigationbutton_${route}`)?.classList.add('active');

  useEffect(() => {
    getDashboardOverview().then(response => {
      dispatch({
        type: 'set',
        key: 'users',
        value: response.loadedUsers
      });

      dispatch({
        type: 'set',
        key: 'matches',
        value: response.loadedMatches
      });

      dispatch({
        type: 'set',
        key: 'tournaments',
        value: response.loadedTournaments
      });
    });
  }, []);

  return (
    <div id="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home users={state.users} matches={state.matches} tournaments={state.tournaments} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/newgame" element={<NewGame users={state.users ?? []} />} />
          <Route path="/mygames" element={<MyGames users={state.users ?? []} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
