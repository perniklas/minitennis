import { db } from "./firebase";
import {
    query,
    getDocs,
    collection,
    orderBy,
    QueryDocumentSnapshot,
} from "firebase/firestore";
import { User } from "../interfaces/User";

var users: Array<User> = [];

const getUsers = async () => {
    users = [];
    const userQuery = query(collection(db, "users"));
    const userDocs = await getDocs(userQuery);
    userDocs.forEach((snapshot: QueryDocumentSnapshot) => {
        var userData = snapshot.data();
        var user: User = {
            id: userData.uid,
            name: userData.name,
            wins: userData.wins ?? 0,
            losses: userData.losses ?? 0,
            rating: userData.rating ?? -1
        };

        users.push(user);
    });

    return users;
}

const getMatches = async () => {
    const matches: Array<any> = [];
    const matchQuery = query(collection(db, "matches"));
    const matchDocs = await getDocs(matchQuery);
    matchDocs.forEach((snapshot: QueryDocumentSnapshot) => {
        const match = snapshot.data();
        matches.push(match)
    });

    return matches;
}

const getTournaments = async () => {
    const tourneys: Array<any> = [];
    const tQuery = query(collection(db, "tournaments"));
    const tDocs = await getDocs(tQuery);
    tDocs.forEach((snapshot: QueryDocumentSnapshot) => {
        const tourney = snapshot.data();
        tourneys.push(tourney)
    });

    return tourneys;
}

const getDashboardOverview = async () => {
    const users = await getUsers();
    const matches = await getMatches();
    const tournaments = await getTournaments();

    return {
        loadedUsers: users,
        loadedMatches: matches,
        loadedTournaments: tournaments
    };
};

const createMatch = async () => {
    
};

export {
    getDashboardOverview,
    getUsers,
    getMatches,
    getTournaments,
    createMatch
}