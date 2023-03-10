import { User } from "../interfaces/User";

const truncateName = (name: string) => {
    if (name.length > 10) {
        let names = name.split(" ");
        let firstName = names[0];
        let lastNames = names.map((lName, index) => {
            if (index > 0) {
                return lName.substring(0, 1) + ".";
            }
        }).join("");

        if (firstName.length > 10) {
            return firstName.substring(0, 10) + "...";
        }

        return firstName + " " + lastNames;
    }

    return name;
};

const formatDate = (milliseconds: number) => {
    return new Date(milliseconds).toDateString().replaceAll('/', '.');
};

const formatTime = (milliseconds: number) => {
    return new Date(milliseconds).toLocaleTimeString().substring(0, 5);
};

const formatToPercentageString = (number: number) => {
    const num = number * 100;
    return `${num.toFixed(0)}%`;
};

export const highlightActiveTabButton = () => {
    let route = window.location.href.split('/').at(-1);
    if (!route.length || route === '/') route = 'dashboard';
    document.getElementById(`navigationbutton_${route}`)?.classList.add('active');
};

/**
 * WILL BE REPLACED BY FIRESTORE ONCHANGE LISTENER FUNCTION - PERHAPS!
 * Calculates changes in rating for players based on their current rating and their opponents rating
 * Based on algorithm at https://www.ratingscentral.com/HowItWorks.php
 * 
 * @param winner Should be self explanatory, no? The winner's User instance
 * @param loser See above param
 */
export const calculateRatings = (winner: User, loser: User) => {
    const winnerGamesPlayed = ((winner.wins ?? 0) + (winner.losses ?? 0));
    const winnerK = getK(winnerGamesPlayed);

    const loserGamesPlayed = ((loser.wins ?? 0) + (loser.losses ?? 0));
    const loserK = getK(loserGamesPlayed);

    // Calculate the expected scores for each player
    const winnerExpected = 1 / (1 + Math.pow(10, (loser.rating - winner.rating) / 400));
    const loserExpected = 1 / (1 + Math.pow(10, (winner.rating - loser.rating) / 400));

    // Calculate the new ratings for each player
    const winnerNewRating = winner.rating + winnerK * (1 - winnerExpected);
    const loserNewRating = loser.rating + loserK * (0 - loserExpected);

    return {
        winnerNewRating,
        loserNewRating
    };
}

export const calculateDoublesRatings = (winners: User[], losers: User[]) => {
    const winnersWins = Math.floor((winners[0].wins + winners[1].wins) / 2);
    const winnersLosses = Math.floor((winners[0].losses + winners[1].losses) / 2);
    const winnersRating = (winners[0].rating + winners[1].rating) / 2;

    const losersWins = Math.floor((losers[0].wins + losers[1].wins) / 2);
    const losersLosses = Math.floor((losers[0].losses + losers[1].losses) / 2);
    const losersRating = (losers[0].rating + losers[1].rating) / 2;

    const newWinner: User = {
        docId: '42069',
        id: '69420',
        name: 'Temp',
        wins: winnersWins,
        losses: winnersLosses,
        rating: winnersRating
    }

    const newLoser: User = {
        docId: '42069',
        id: '69420',
        name: 'Temp',
        wins: losersWins,
        losses: losersLosses,
        rating: losersRating
    }

    const newRatings = calculateRatings(newWinner, newLoser);
    const winnersPointsGained = newRatings.winnerNewRating - winnersRating;
    const losersPointsLost = losersRating - newRatings.loserNewRating;

    return {
        winnersPointsGained,
        losersPointsLost
    };
}

function getK(gamesPlayed: number) {
    if (gamesPlayed < 30) {
        return 60;
    } else if (gamesPlayed < 100) {
        return 45;
    } else {
        return 30;
    }
}

export const saveDataToLocalStorage = (category: string, data: Object) => {
    localStorage.setItem(category, JSON.stringify(data));
};

function loadDataFromLocalStorage(category: string) {
    const data = localStorage.getItem(category);
    return data;
};

export const loadFinishedMatchesFromLocalStorage = () => {
    const matchesString = loadDataFromLocalStorage('matches-finished');
    return JSON.parse(matchesString) ?? [];
};

export const loadMyFinishedMatchesFromLocalStorage = () => {
    const matchesString = loadDataFromLocalStorage('matches-my-finished');
    return JSON.parse(matchesString) ?? [];
};

export const loadMyRatingHistoryFromLocalStorage = () => {
    const matchesString = loadDataFromLocalStorage('ratinghistory');
    return JSON.parse(matchesString) ?? [];
};

export const createUserObjectWithAdditionalWinOrLoss = (user: User, winner: boolean) => {
    let newUser: User = {
        name: user.name,
        id: user.id,
        docId: user.docId,
        wins: (winner ? user.wins + 1 : user.wins),
        losses: (winner ? user.losses : user.losses + 1),
        rating: user.rating,
    };

    return newUser;
};

export const updateUserStats = (newRatings: number[], winner: User, loser: User, dispatch?: Function) => {
    winner = createUserObjectWithAdditionalWinOrLoss(winner, true);
    loser = createUserObjectWithAdditionalWinOrLoss(loser, false);

    winner.rating = newRatings[0];
    loser.rating = newRatings[1];

    if (dispatch) dispatch(winner, loser);
}

export {
    truncateName,
    formatDate,
    formatTime,
    formatToPercentageString
};