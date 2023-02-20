import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import Home from './components/Home/Home';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Reset from "./components/Auth/Reset";
import NewGame from './components/NewGame/NewGame';
import MyPage from './components/MyGames/MyPage';
import { useAppDispatch, useAppSelector } from './Redux/hooks';
import { setAllUsers, setAllMatches, setIncomingMatches, setDeclareWinnerMatches, setMyMatches } from './Redux/actions';
import { getAllFinishedMatchesListener, getAllRegisteredUsersListener, getDeclareWinnerMatchesListener, getIncomingMatchesListener, getMyFinishedMatchesListener } from './helpers/firestore';
import { User } from './interfaces/User';
import { ToastContainer, toast } from 'react-toastify';
import { Unsubscribe } from '@reduxjs/toolkit';
import { Match } from './interfaces/Match';

export const showToast = () => {
  const notify = () => toast.success(`Game created!`);
  notify();
};

function App() {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(state => state.loggedIn);
  const incoming = useAppSelector(state => state.incomingMatches);
  const declareWinner = useAppSelector(state => state.declareWinnerMatches);
  const users = useAppSelector(state => state.users);
  const userCallback = (pUsers: User[]) => {
    dispatch(setAllUsers(pUsers));
  };

  const allMatchesCallback = (pMatches: Match[]) => {
    dispatch(setAllMatches(pMatches));
  };

  useEffect(() => {
    const unsubFromUsers = getAllRegisteredUsersListener(userCallback);
    const unsubFromLatest = getAllFinishedMatchesListener(allMatchesCallback, users, dispatch);
    let unsubFromIncoming: Unsubscribe = () => {};
    let unsubFromDeclareWinner: Unsubscribe = () => {};
    let unsubFromMyMatches: Unsubscribe = () => {};
    
    if (loggedIn) {
      const incomingMatchesCallback = (pMatches: Match[]) => {
        dispatch(setIncomingMatches(pMatches));
      };
      
      const declareWinnerCallback = (pMatches: Match[]) => {
        dispatch(setDeclareWinnerMatches(pMatches));
      };
      
      const myMatchesCallback = (pMatches: Match[]) => {
        dispatch(setMyMatches(pMatches));
      };

      unsubFromIncoming = getIncomingMatchesListener(incomingMatchesCallback, users, dispatch);
      unsubFromDeclareWinner = getDeclareWinnerMatchesListener(declareWinnerCallback, users, dispatch);
      unsubFromMyMatches = getMyFinishedMatchesListener(myMatchesCallback, users, dispatch);
    }

    return () => {
      unsubFromUsers();
      if (unsubFromLatest) unsubFromLatest();
      if (unsubFromIncoming) unsubFromIncoming();
      if (unsubFromDeclareWinner) unsubFromDeclareWinner();
      if (unsubFromMyMatches) unsubFromMyMatches();
    }
  }, [users.length]);

  return (
    <div id="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home notification={(incoming.length > 0 || declareWinner.length > 0)}
          />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/mygames" element={<MyPage />} />
          <Route path="/newgame" element={<NewGame />} />
        </Routes>
      </Router>
      <ToastContainer position='bottom-center'/>
    </div>
  );
}

export default App;