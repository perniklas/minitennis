import BottomNavigationBar from '../BottomMenuBar/BottomNavigationBar';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import './MyGames.css';
import MyMatches from './MyMatches';
import IncomingMatches from './IncomingMatches';
import DeclareWinner from './DeclareWinner';
import MyStats from './MyStats';
import BottomBarButtons from '../BottomNavigationButtons/BottomNavigationButtons';
import { getMyFinishedMatchesListener, getMyRatingHistoryListener } from '../../helpers/firestore';
import { highlightActiveTabButton } from '../../helpers/utils';
import StatCharts from './StatCharts';
import { useAppSelector } from '../../Redux/hooks';

const MyPage = () => {
  const [matches, setMatches] = useState([]);
  const [matchRating, setRating] = useState([]);
  const loggedIn = useAppSelector((state) => state.loggedIn);
  
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
      <IncomingMatches />
      <DeclareWinner />
      <MyMatches matches={matches} />
      <StatCharts matches={matchRating}></StatCharts>
      <BottomNavigationBar
        buttons={
          BottomBarButtons(loggedIn)
        }
      ></BottomNavigationBar>
    </div>
  )
};

export default MyPage;