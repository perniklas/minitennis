import { myGamesButton, newGameButton, newTournamentButton, dashboardButton } from "../Home/BottomBarButtons";

const BottomBarButtons = () => {
    return [
        //newTournamentButton,
        dashboardButton,
        myGamesButton(),
        newGameButton
    ];
};

export default BottomBarButtons;