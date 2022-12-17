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
import { connect, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { fetchDeclareWinnerMatches, fetchIncomingMatches, fetchMyMatches } from '../../Redux/actions';

interface GameProps {
  users: Array<User>
}

const MyPage = (props: GameProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useAppDispatch();
  let loadingMyMatches: boolean,
    loadingIncomingMatches: boolean,
    loadingDeclareWinnerMatches: boolean = false;

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  if (loggedIn) {
    if (!loadingMyMatches) {
      loadingMyMatches = true;
      dispatch(fetchMyMatches());
    }

    if (!loadingIncomingMatches) {
      loadingIncomingMatches = true;
      dispatch(fetchIncomingMatches());
    }

    if (!loadingDeclareWinnerMatches) {
      loadingDeclareWinnerMatches = true;
      dispatch(fetchDeclareWinnerMatches());
    }
  }

  return (
    <div className="home">
      <Header />
      <MyStats />
      <IncomingMatches users={props.users} />
      <DeclareWinner />
      <MyMatches />
      <BottomNavigationBar
        buttons={
          BottomBarButtons()
        }
      ></BottomNavigationBar>
    </div>
  )
};

export default MyPage;