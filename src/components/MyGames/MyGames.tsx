import { Match, MatchProps } from '../../interfaces/Match';
import BottomNavigationBar from '../BottomMenuBar/BottomNavigationBar';
import Header from '../Header/Header';
import './MyGames.css';
import { newTournamentButton, myGamesButton, newGameButton } from '../Home/BottomBarButtons';
import MyMatches from './MyMatches';
import IncomingMatches from './IncomingMatches';
import DeclareWinner from './DeclareWinner';
import MyStats from './MyStats';

const MyGames = (props: MatchProps) => {
  const matchHistory = props.matches.filter(match => match.winner);
  const incomingMatches = props.matches.filter(match => !match.winner);
  const declareWinnerMatches = props.matches.filter(match => !match.winner && match.accepted);

  return (
    <div className="home">
        <Header />
        <MyStats matches={matchHistory}/>
        <IncomingMatches matches={incomingMatches}/>
        { declareWinnerMatches.length ?
        <DeclareWinner matches={declareWinnerMatches}/> : null }
        <MyMatches matches={matchHistory} />
        <BottomNavigationBar 
            buttons={
                [newTournamentButton, myGamesButton, newGameButton]
            }
        ></BottomNavigationBar>
    </div>
  )
};

export default MyGames;