import { db } from "./firebase";
import {
    query,
    where,
    getDocs,
    collection,
    QueryDocumentSnapshot,
    addDoc,
    DocumentData,
    Query,
    orderBy,
    limit,
    onSnapshot,
    QuerySnapshot,
    updateDoc,
    doc,
    deleteDoc,
    setDoc,
    increment
} from "firebase/firestore";
import { User } from "../interfaces/User";
import { auth } from '../helpers/firebase';
import { Match, MatchStats } from "../interfaces/Match";
import { Tournament } from "../interfaces/Tournament";
import { calculateRatings } from "./utils";
import { store } from '../Redux/store';

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
            docId: snapshot.id,
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
    const matchQuery = query(collection(db, "matches"), orderBy('timespan', 'desc'), limit(10));
    const matchDocs = await getDocs(matchQuery);
    const users = store.getState().users;
    matchDocs.forEach((snapshot: QueryDocumentSnapshot) => {
        const matchData = snapshot.data();
        const match = createMatchFromData(users, snapshot.id, matchData);
        matches.push(match);
    });

    return matches;
}

const createMatchFromData = (stateUsers: User[], id: string, matchData: DocumentData) => {
    const users = stateUsers;
    const players = matchData.players.map((id: string) => users.find(u => u.id === id));
    const match: Match = {
        id: id,
        players: players,
        challenger: matchData.challenger,
        timestamp: matchData.timestamp,
        accepted: matchData.accepted ?? false,
        winner: matchData.winner
    };

    return match;
};

const getMatchesFromFirestore = async (query: Query<DocumentData>) => {
    if (!auth.currentUser?.uid) return [];
    const matches: Array<Match> = [];
    const matchDocs = await getDocs(query);
    const users = store.getState().users;
    matchDocs.forEach((snapshot: QueryDocumentSnapshot) => {
        const matchData = snapshot.data();
        const match = createMatchFromData(users, snapshot.id, matchData);
        matches.push(match);
    });

    matches.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);

    return matches;
};

const getMyMatches = async () => {
    const matchQuery = query(collection(db, "matches"), where("players", "array-contains", auth.currentUser.uid), orderBy('timestamp', 'desc'));
    return await getMatchesFromFirestore(matchQuery);
};

/*
    LISTENERS START
*/

const handleMatchListenerSnapshots = (docsSnap: QuerySnapshot<DocumentData>, setState: Function) => {
    const matchList: Match[] = [];
    const users = store.getState().users;
    docsSnap.forEach(doc => {
        const match = createMatchFromData(users, doc.id, doc.data());
        matchList.push(match);
    });

    setState(matchList);
}

export const getAllRegisteredUsers = (setState: Function, limiter: number = 10) => {
    const matchQuery = query(collection(db, "users"), orderBy('rating', 'desc'), limit(limiter));
    return onSnapshot(matchQuery, docsSnap => {
        const userList: User[] = [];
        docsSnap.forEach(doc => {
            const user = doc.data() as User;
            userList.push(user);
        });

        setState(userList);
    });
};

export const getAllFinishedMatchesListener = (setState: Function, limiter: number = 10) => {
    const matchQuery = query(collection(db, "matches"), where("winner", "!=", null), orderBy("winner", "desc"), orderBy('timestamp', 'desc'), limit(limiter));
    return onSnapshot(matchQuery, docsSnap => handleMatchListenerSnapshots(docsSnap, setState));
};

export const getMyFinishedMatchesListener = (setState: Function) => {
    const matchQuery = query(collection(db, "matches"), where("players", "array-contains", auth.currentUser.uid),
        where("winner", "!=", null), orderBy('winner', 'asc'), orderBy('timestamp', 'desc'));
    return onSnapshot(matchQuery, docsSnap => handleMatchListenerSnapshots(docsSnap, setState));
};

export const getIncomingMatchesListener = (setState: Function) => {
    const matchQuery = query(collection(db, "matches"), where("players", "array-contains", auth.currentUser.uid),
        where("accepted", "==", false), where("challenger", "!=", auth.currentUser.uid), orderBy('challenger', 'asc'), orderBy('timestamp', 'desc'));
    return onSnapshot(matchQuery, docsSnap => handleMatchListenerSnapshots(docsSnap, setState));
};

export const getDeclareWinnerMatchesListener = (setState: Function) => {
    const matchQuery = query(collection(db, "matches"), where("players", "array-contains", auth.currentUser.uid),
        where("accepted", "==", true), where("winner", "==", null), orderBy('timestamp', 'desc'));
    return onSnapshot(matchQuery, docsSnap => handleMatchListenerSnapshots(docsSnap, setState));
};

export const getMyRatingHistoryListener = (setState: Function) => {
    const now = new Date().getTime();
    const threeMonthsAgo = new Date(now - 7906825262).getTime();
    const ratingQuery = query(collection(db, auth.currentUser?.uid), where('timestamp', '>', threeMonthsAgo));
    return onSnapshot(ratingQuery, docsSnap => {
        const matchList: MatchStats[] = [];
        docsSnap.forEach(doc => {
            const data = doc.data();
            const match: MatchStats = {
                id: doc.id,
                timestamp: data.timestamp,
                rating: data.rating,
                win: data.win,
            };
        
            matchList.push(match);
        });

        setState(matchList);
    });
};

/*
    LISTENERS END
*/

export const updateAcceptedMatchInFirestore = async (id: string) => {
    if (!id) return;

    await updateDoc(doc(db, `matches/${id}`), {
        accepted: true
    });
};

export const updateDeclinedMatchInFirestore = async (id: string) => {
    if (!id) return;

    await deleteDoc(doc(db, `matches/${id}`));
};

export const updateWinnerOfMatchInFirestore = async (match: Match, winner: User, loser: User) => {
    await updateDoc(doc(db, `matches/${match.id}`), {
        winner: winner.id
    });

    const { winnerNewRating, loserNewRating } = calculateRatings(winner, loser);

    await updateDoc(doc(db, `users/${winner.docId}`), {
        wins: increment(1),
        rating: winnerNewRating
    });
    await updateDoc(doc(db, `users/${loser.docId}`), {
        losses: increment(1),
        rating: loserNewRating
    });
    await setDoc(doc(db, winner.docId, match.id), {
        timestamp: match.timestamp,
        rating: winner.rating,
        win: true,
    });
    await setDoc(doc(db, loser.docId, match.id), {
        timestamp: match.timestamp,
        rating: loser.rating,
        win: true,
    });

    return [winnerNewRating, loserNewRating];
};

const getMyMatchHistory = async () => {
    const matchQuery = query(collection(db, "matches"), where("players", "array-contains", auth.currentUser.uid), where("winner", "!=", null));
    return await getMatchesFromFirestore(matchQuery);
};

const getMyIncomingMatches = async () => {
    const matchQuery = query(collection(db, "matches"), where("players", "array-contains", auth.currentUser.uid), where('challenger', '!=', auth.currentUser.uid), where("accepted", "==", false));
    return await getMatchesFromFirestore(matchQuery);
};

const getDeclareWinnerMatches = async () => {
    const matchQuery = query(collection(db, "matches"), where("players", "array-contains", auth.currentUser.uid), where("accepted", "==", true), where("winner", "==", null));
    return await getMatchesFromFirestore(matchQuery);
};

const getTournaments = async () => {
    tournaments = [];
    // const tQuery = query(collection(db, "tournaments"));
    // const tDocs = await getDocs(tQuery);
    // tDocs.forEach((snapshot: QueryDocumentSnapshot) => {
    //     const tournamentData = snapshot.data();
    //     var tourney: Tournament = {

    //     };
    //     tournaments.push(tourney)
    // });

    return tournaments;
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
        challenger: myID,
        winner: null,
        timestamp: new Date().getTime(),
        accepted: false
    });
};

export {
    getDashboardOverview,
    getUsers,
    getMatches,
    getMyMatches,
    getTournaments,
    createMatch,
    users,
    getMyIncomingMatches,
    getDeclareWinnerMatches,
    getMyMatchHistory,
}