import { myGamesButton, newGameButton, newTournamentButton, dashboardButton } from "../Home/BottomBarButtons";

const BottomBarButtons = (notification: boolean = false) => {
    return [
        //newTournamentButton,
        dashboardButton,
        myGamesButton(notification),
        newGameButton
    ];
};

export default BottomBarButtons;