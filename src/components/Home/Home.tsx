import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import './Home.css';
import BottomNavigationBar from "../BottomMenuBar/BottomNavigationBar";
import { newTournamentButton, myGamesButton, newGameButton } from './BottomBarButtons';
import DataProps from "../../interfaces/DataProps";

const Home = (props: DataProps) => {
    return (
        <div className="home">
            <Header></Header>
            <Dashboard users={props.users} matches={props.matches} tournaments={props.tournaments}></Dashboard>
            <BottomNavigationBar 
                buttons={
                    [newTournamentButton, myGamesButton, newGameButton]
                }
            ></BottomNavigationBar>
        </div>
    )
};

export default Home;