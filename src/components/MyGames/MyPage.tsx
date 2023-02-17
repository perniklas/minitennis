import BottomNavigationBar from '../BottomMenuBar/BottomNavigationBar';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import './MyGames.css';
import IncomingMatches from './IncomingMatches';
import DeclareWinner from './DeclareWinner';
import MyStats from './MyStats';
import BottomBarButtons from '../BottomNavigationButtons/BottomNavigationButtons';
import { getMyFinishedMatchesListener, getMyRatingHistoryListener } from '../../helpers/firestore';
import { highlightActiveTabButton } from '../../helpers/utils';
import StatCharts from './StatCharts';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import OutgoingMatches from './MyOutgoingMatches';
import Card from '../Cards/Card';
import LatestMatches from '../LatestMatches/LatestMatches';

const MyPage = () => {
  // const [matches, setMatches] = useState([]);
  const matches = useAppSelector(state => state.myMatchHistory);
  const [matchRating, setRating] = useState([]);
  const loggedIn = useAppSelector((state) => state.loggedIn);
  // const users = useAppSelector((state) => state.users);
  // const dispatch = useAppDispatch();
  
  useEffect(() => {
    highlightActiveTabButton();
    if (!loggedIn) return;

    // const unsubscribeFinishedMatches = getMyFinishedMatchesListener(setMatches, users, dispatch);
    const unsubscribeRatingStats = getMyRatingHistoryListener(setRating);
    return () => {
      // unsubscribeFinishedMatches();
      unsubscribeRatingStats();
    };
  }, [loggedIn]);

  return (
    <div className="home">
      <Header />
      <MyStats matches={matches} />
      <IncomingMatches />
      <DeclareWinner />
      <Card title="Match history" child={<LatestMatches matches={matches} />}/>
      <StatCharts matches={matchRating}></StatCharts>
      <OutgoingMatches />
      <BottomNavigationBar
        buttons={
          BottomBarButtons(loggedIn)
        }
      ></BottomNavigationBar>
    </div>
  )
};

export default MyPage;