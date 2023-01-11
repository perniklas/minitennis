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
import { getMyFinishedMatchesListener, getMyRatingHistoryListener } from '../../helpers/firestore';
import { loggedIn } from '../../helpers/firebase';
import { highlightActiveTabButton } from '../../helpers/utils';
import StatCharts from './StatCharts';

interface GameProps {
  users: User[];
  setUsers: Function;
}

const MyPage = (props: GameProps) => {
  const [matches, setMatches] = useState([]);
  const [matchRating, setRating] = useState([]);
  
  useEffect(() => {
    highlightActiveTabButton();
    if (!loggedIn) return;

    const unsubscribeFinishedMatches = getMyFinishedMatchesListener(setMatches);
    const unsubscribeRatingStats = getMyRatingHistoryListener(setRating);
    return () => {
      unsubscribeFinishedMatches();
      unsubscribeRatingStats();
    };
  }, [loggedIn]);

  return (
    <div className="home">
      <Header />
      <MyStats matches={matches} />
      <IncomingMatches loggedIn={loggedIn} users={props.users} />
      <DeclareWinner loggedIn={loggedIn} setUsers={props.setUsers} />
      <MyMatches matches={matches} />
      <StatCharts matches={matchRating}></StatCharts>
      <BottomNavigationBar
        buttons={
          BottomBarButtons()
        }
      ></BottomNavigationBar>
    </div>
  )
};

export default MyPage;