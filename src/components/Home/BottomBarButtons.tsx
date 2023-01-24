import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TbHome, TbPlus, TbTournament } from "react-icons/tb";
import { faTableTennis, faMeh, faSun } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { TbUserCircle } from "react-icons/tb";
import { CSSProperties } from "react";

const dashboardButton = (
    <Link to={'/'} id="navigationbutton_dashboard">
        <div>
            <TbHome style={{ margin: '0 auto' }} />
        </div>
        <span>
            Home
        </span>
    </Link>
);

const newTournamentButton = (
    <Link to="newtournament" id="navigationbutton_tournaments">
        <div>
            <TbTournament style={{ margin: '0 auto' }} />
            <TbPlus></TbPlus>
        </div>
        <span>
            New tournament
        </span>
    </Link>
);

const myGamesButton = (loggedIn: boolean = false, notification: boolean = false) => {
    return (
        <Link id="navigationbutton_mygames" to={loggedIn ? '/mygames' : '/login'}>
            <div>
                {notification ? <FontAwesomeIcon id="navigationbutton_mygames__notification" icon={faSun} /> : null}
                {/* <FontAwesomeIcon icon={faMeh} /> */}
                <TbUserCircle style={{ margin: '0 auto' }} />
            </div>
            <span>
                Me
            </span>
        </Link>
    )
};

const newGameButton = (
    <Link id="navigationbutton_newgame" to="/newgame">
        <div>
            <FontAwesomeIcon icon={faTableTennis} style={{fontSize: '1.3rem', marginBottom: '6px'}}/>
            <TbPlus></TbPlus>
        </div>
        <span>
            New game
        </span>
    </Link>
);

export {
    dashboardButton,
    newTournamentButton,
    myGamesButton,
    newGameButton
}