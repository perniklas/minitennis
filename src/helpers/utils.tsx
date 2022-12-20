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

function getK(gamesPlayed: number) {
    if (gamesPlayed < 30) {
      return 32;
    } else if (gamesPlayed < 100) {
      return 18;
    } else {
      return 8;
    }
  }

export {
    truncateName,
    formatDate,
    formatTime,
    formatToPercentageString
};