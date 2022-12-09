import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TbHome, TbPlus, TbTournament } from "react-icons/tb";
import { faTableTennis, faMeh } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../helpers/firebase";

const dashboardButton = (
    <a id="navigationbutton_dashboard" href="/">
        <div>
            <TbHome style={{ margin: '0 auto' }} />
        </div>
        <span>
            Dashboard
        </span>
    </a>
);

const newTournamentButton = (
    <a id="navigationbutton_tournaments" href="newtournament">
        <div>
            <TbTournament style={{ margin: '0 auto' }} />
            <TbPlus></TbPlus>
        </div>
        <span>
            New tournament
        </span>
    </a>
);

const myGamesButton = () => {
    const loggedIn: boolean = auth.currentUser?.uid ? true : false;

    return (
        <a id="navigationbutton_mygames" href={loggedIn ? 'mygames' : 'login'}>
            <div>
                <FontAwesomeIcon icon={faMeh} />
            </div>
            <span>
                Me
            </span>
        </a>
    )
};

const newGameButton = (
    <a id="navigationbutton_newgame" href="newgame">
        <div>
            <FontAwesomeIcon icon={faTableTennis} />
            <TbPlus style={{ margin: 'auto' }}></TbPlus>
        </div>
        <span>
            New game
        </span>
    </a>
);

export {
    dashboardButton,
    newTournamentButton,
    myGamesButton,
    newGameButton
}