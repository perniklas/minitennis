import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TbHome, TbPlus, TbTournament } from "react-icons/tb";
import { faTableTennis, faMeh, faSun } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../helpers/firebase";
import { Link } from "react-router-dom";

const dashboardButton = (
    <Link to={'/'} id="navigationbutton_dashboard">
        <div>
            <TbHome style={{ margin: '0 auto' }} />
        </div>
        <span>
            Dashboard
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

const myGamesButton = (notification: boolean = false) => {
    const loggedIn: boolean = auth.currentUser?.uid ? true : false;

    return (
        <Link id="navigationbutton_mygames" to={loggedIn ? '/mygames' : 'login'}>
            <div>
                {notification ? <FontAwesomeIcon id="navigationbutton_mygames__notification" icon={faSun} /> : null}
                <FontAwesomeIcon icon={faMeh} />
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
            <FontAwesomeIcon icon={faTableTennis} />
            <TbPlus style={{ margin: 'auto' }}></TbPlus>
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