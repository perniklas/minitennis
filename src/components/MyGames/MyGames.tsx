import { Match } from '../../interfaces/Match';
import BottomNavigationBar from '../BottomMenuBar/BottomNavigationBar';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import './MyGames.css';
import MyMatches from './MyMatches';
import IncomingMatches from './IncomingMatches';
import DeclareWinner from './DeclareWinner';
import MyStats from './MyStats';
import { getDeclareWinnerMatches, getMyIncomingMatches, getMyMatchData, getMyMatches, getMyMatchHistory } from '../../helpers/firestore';
import BottomBarButtons from '../BottomNavigationButtons/BottomNavigationButtons';
import { User } from '../../interfaces/User';
import { auth } from '../../helpers/firebase';

interface GameProps {
  users: Array<User>
}

const MyGames = (props: GameProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [matchHistory, setMatchHistory] = useState([]);
  const [incomingMatches, setIncomingMatches] = useState([]);
  const [declareWinnerMatches, setDeclareWinnerMatches] = useState([]);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const removeMatchFromIncoming = (id: string) => {
    const match = incomingMatches.find(m => m.id === id);
    const newMatches = incomingMatches.filter(m => m.id !== id);
    setIncomingMatches(newMatches);
    return match;
  };

  const acceptMatch = (id: string) => {
    const match = removeMatchFromIncoming(id);
    const newMatches = declareWinnerMatches;
    newMatches.push(match);
    setDeclareWinnerMatches(newMatches);
  };

  const declineMatch = (id: string) => {
    removeMatchFromIncoming(id);
  }

  useEffect(() => {
    console.log('yes');
    if (!loggedIn)
      return;

    getMyIncomingMatches().then((incoming: Array<Match>) => {
      console.log("requests:", incoming);
      setIncomingMatches(incoming);
    });

    getMyMatchHistory().then((matches: Array<Match>) => {
      setMatchHistory(matches);
    });

    getDeclareWinnerMatches().then((matches: Array<Match>) => {
      setDeclareWinnerMatches(matches);
    });
  }, [loggedIn]);

  return (
    <div className="home">
      <Header />
      <MyStats matches={matchHistory} />
      {incomingMatches.length ?
        <IncomingMatches matches={incomingMatches} acceptMatch={acceptMatch} declineMatch={declineMatch} users={props.users} /> : null} 

      {declareWinnerMatches.length ?
        <DeclareWinner matches={declareWinnerMatches} /> : null}
      <MyMatches matches={matchHistory} />
      <BottomNavigationBar
        buttons={
          BottomBarButtons()
        }
      ></BottomNavigationBar>
    </div>
  )
};

export default MyGames;