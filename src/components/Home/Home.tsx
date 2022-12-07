import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import './Home.css';
import BottomNavigationBar from "../BottomMenuBar/BottomNavigationBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TbPlus, TbTournament } from "react-icons/tb";
import { faTableTennis } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    const newTournamentButton = (
        <a href="newtournament">
            <div>
                <TbTournament style={{margin: '0 auto'}} />
                <TbPlus></TbPlus>
            </div>
            <span>
                New tournament
            </span>
        </a>
    );
    
    const newGameButton = (
        <a href="newgame">
            <div>
                <FontAwesomeIcon icon={faTableTennis} />
                <TbPlus style={{margin: 'auto'}}></TbPlus>
            </div>
            <span>
                New game
            </span>
        </a>
    );

    return (
        <div className="home">
            <Header></Header>
            <Dashboard></Dashboard>
            <BottomNavigationBar 
                firstButton={newTournamentButton} 
                secondButton={newGameButton}
            ></BottomNavigationBar>
        </div>
    )
};

export default Home;