import { db } from "./firebase";
import {
    query,
    getDocs,
    collection,
    orderBy,
    QueryDocumentSnapshot,
    addDoc,
} from "firebase/firestore";
import { User } from "../interfaces/User";
import { auth } from '../helpers/firebase';
import { Match } from "../interfaces/Match";
import { Tournament } from "../interfaces/Tournament";
import { match } from "assert";

var users: Array<User> = [];
var matches: Array<Match> = [];
var tournaments: Array<Tournament> = [];

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

        if (user.id)
            users.push(user);
    });

    return users;
}

const getMatches = async () => {
    matches = [];
    const matchQuery = query(collection(db, "matches"));
    const matchDocs = await getDocs(matchQuery);
    matchDocs.forEach((snapshot: QueryDocumentSnapshot) => {
        const matchData = snapshot.data();
        const players = matchData.players.map((id) => users.find(u => u.id == id));
        const match: Match = {
            players: players,
            timestamp: matchData.timestamp,
            winner: matchData.winner
        };
        matches.push(match);
    });

    return matches;
}

const getMyMatches = () => {
    const myID = auth.currentUser?.uid;
    if (!myID) return;
    return matches.filter((match) => match.players.map(user => user.id).includes(myID));
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

const createMatch = async (againstID: string) => {
    const myID = auth.currentUser?.uid;
    if (!myID) return;

    await addDoc(collection(db, "matches"), {
        players: [
            myID,
            againstID
        ],
        winner: null,
        timestamp: new Date()
    });
};

export {
    getDashboardOverview,
    getUsers,
    getMatches,
    getTournaments,
    createMatch,
    users
}