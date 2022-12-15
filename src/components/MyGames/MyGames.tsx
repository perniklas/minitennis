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
import { auth } from '../../helpers/firebase';
import { connect } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setDeclareWinnerMatches, setIncomingMatches, setMyMatchHistory } from '../../Redux/reducers';
import { fetchDeclareWinnerMatches, fetchIncomingMatches, fetchMyMatches } from '../../Redux/actions';
import { RootState } from '../../Redux/store';

interface GameProps {
  users: Array<User>
}

// const matchState = (state: RootState) => ({
//   matchHistory: state.matches.myMatchHistory,
//   incomingMatches: state.matches.incomingMatches,
//   declareWinnerMatches: state.matches.declareWinnerMatches,
// })

// const mapDispatch = {
//   toggleOn: () => ({ type: 'TOGGLE_IS_ON' })
// }

// const connector = connect(matchState, mapDispatch);

const mapStateToProps = (state: RootState) => ({
  matchHistory: state.myMatchHistory,
  incomingMatches: state.incomingMatches,
  declareWinnerMatches: state.declareWinnerMatches,
});

const MyGames = (props: GameProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useAppDispatch();
  
  const matchHistory = useAppSelector(state => state.myMatchHistory);
  const incomingMatches = useAppSelector(state => state.incomingMatches);
  const declareWinnerMatches = useAppSelector(state => state.declareWinnerMatches);

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
    dispatch(setIncomingMatches(newMatches));
    return match;
  };

  const acceptMatch = (id: string) => {
    const match = removeMatchFromIncoming(id);
    const newMatches = declareWinnerMatches;
    newMatches.push(match);
    dispatch(setDeclareWinnerMatches(newMatches));;
  };

  const declineMatch = (id: string) => {
    removeMatchFromIncoming(id);
  }

  useEffect(() => {
    if (!loggedIn)
      return;

      dispatch(fetchMyMatches);
      dispatch(fetchIncomingMatches);
      dispatch(fetchDeclareWinnerMatches);

      // fetchMyMatches();
      // fetchIncomingMatches();
      // fetchDeclareWinnerMatches();

    console.log("MY GAMES: ", matchHistory, incomingMatches, declareWinnerMatches);
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

export default connect(mapStateToProps)(MyGames);