import { myGamesButton, newGameButton, newTournamentButton, dashboardButton } from "../Home/BottomBarButtons";

const BottomBarButtons = (loggedIn: boolean = false, notification: boolean = false) => {
    return [
        //newTournamentButton,
        dashboardButton,
        myGamesButton(loggedIn, notification),
        newGameButton
    ];
};

export default BottomBarButtons;