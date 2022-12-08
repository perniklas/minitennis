import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TbPlus, TbTournament } from "react-icons/tb";
import { faTableTennis, faMeh } from "@fortawesome/free-solid-svg-icons";

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

const myGamesButton = (
    <a href="mygames">
        <div>
            <FontAwesomeIcon icon={faMeh} />
        </div>
        <span>
            Me
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

export {
  newTournamentButton,
  myGamesButton,
  newGameButton
}