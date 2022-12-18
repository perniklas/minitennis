import BottomNavigationBar from '../BottomMenuBar/BottomNavigationBar';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import './MyGames.css';
import MyMatches from './MyMatches';
import IncomingMatches from './IncomingMatches';
import DeclareWinner from './DeclareWinner';
import MyStats from './MyStats';
import BottomBarButtons from '../BottomNavigationButtons/BottomNavigationButtons';
import { User } from '../../interfaces/User';
import { auth, db } from '../../helpers/firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { Match } from '../../interfaces/Match';
import { getMyFinishedMatchesListener, users } from '../../helpers/firestore';

interface GameProps {
  users: Array<User>
}

const MyPage = (props: GameProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const emptyMatches: Match[] = [];
  const [matches, setMatches] = useState(emptyMatches);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  useEffect(() => {
    if (!loggedIn) return;
    
    const unsubscribe = getMyFinishedMatchesListener(setMatches);

    return () => unsubscribe();
  }, [loggedIn]);

  return (
    <div className="home">
      <Header />
      <MyStats matches={matches} />
      <IncomingMatches loggedIn={loggedIn} users={props.users} />
      <DeclareWinner loggedIn={loggedIn} />
      <MyMatches matches={matches} />
      <BottomNavigationBar
        buttons={
          BottomBarButtons()
        }
      ></BottomNavigationBar>
    </div>
  )
};

export default MyPage;