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
import { Match } from '../../interfaces/Match';
import { getMyFinishedMatchesListener } from '../../helpers/firestore';
import { loggedIn } from '../../helpers/firebase';
import { highlightActiveTabButton } from '../../helpers/utils';

interface GameProps {
  users: User[];
}

const MyPage = (props: GameProps) => {
  const [matches, setMatches] = useState([]);
  
  useEffect(() => {
    highlightActiveTabButton();
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