import { db } from "./firebase";
import {
    query,
    where,
    collection,
    addDoc,
    DocumentData,
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
import { calculateRatings, loadFinishedMatchesFromLocalStorage, loadMyFinishedMatchesFromLocalStorage, loadMyRatingHistoryFromLocalStorage, saveDataToLocalStorage } from "./utils";

// var users: Array<User> = [];
// var matches: Array<Match> = [];
var tournaments: Array<Tournament> = [];

const createMatchFromData = (stateUsers: User[], id: string, matchData: DocumentData) => {
    const users = stateUsers;
    const players = matchData.players.map((id: string) => users.find(u => u.id === id));
    const match: Match = {
        id: id,
        players: players,
        challenger: matchData.challenger,
        timestamp: matchData.timestamp,
        accepted: matchData.accepted ?? false,
        winner: matchData.winner,
        score: matchData.scores
    };

    return match;
};

const handleMatchListenerSnapshots = (docsSnap: QuerySnapshot<DocumentData>, users: User[], setState: Function, saveToLocal?: Function, localMatches?: Match[]) => {
    let matchList: Match[] = [];
    if (localMatches) {
        localMatches.forEach(match => {
            matchList.push(match);
        });
    }

    docsSnap.forEach(doc => {
        const match = createMatchFromData(users, doc.id, doc.data());
        matchList.push(match);
    });

    if (saveToLocal) {
        saveToLocal(matchList);
    }

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

export const getAllFinishedMatchesListener = (dispatch: Function, users: User[], limiter: number = 10) => {
    if (!users.length) return;
    let timestamp = 0;
    const locallySavedMatches = loadFinishedMatchesFromLocalStorage();
    if (locallySavedMatches && locallySavedMatches.length) {
        locallySavedMatches.sort((a: Match, b: Match) => a.timestamp < b.timestamp ? -1 : 1);
        timestamp = locallySavedMatches.at(-1).timestamp;
    }

    const matchQuery = query(collection(db, "matches"), where('done', '==', true), where('timestamp', '>', timestamp), orderBy('timestamp', 'desc'), limit(limiter));
    const saveCallback = (matches: Match[]) => {
        saveDataToLocalStorage('matches-finished', matches);
    };

    return onSnapshot(matchQuery, docsSnap => {
        handleMatchListenerSnapshots(docsSnap, users, dispatch, saveCallback, locallySavedMatches);
    });
};

export const getMyFinishedMatchesListener = (dispatch: Function, users: User[]) => {
    let timestamp = 0;
    const locallySavedMatches = loadMyFinishedMatchesFromLocalStorage();
    if (locallySavedMatches && locallySavedMatches.length) {
        locallySavedMatches.sort((a: Match, b: Match) => a.timestamp < b.timestamp ? -1 : 1);
        timestamp = locallySavedMatches.at(-1).timestamp;
    }

    const matchQuery = query(collection(db, "matches"), where("players", "array-contains", auth.currentUser.uid),
        where('done', '==', true), where('timestamp', '>', timestamp), orderBy('timestamp', 'desc'));
    const saveCallback = (matches: Match[]) => {
        saveDataToLocalStorage('matches-my-finished', matches);
    };

    return onSnapshot(matchQuery, docsSnap => handleMatchListenerSnapshots(docsSnap, users, dispatch, saveCallback, locallySavedMatches));
};

export const getIncomingMatchesListener = (dispatch: Function, users: User[]) => {
    const matchQuery = query(collection(db, "matches"), where("players", "array-contains", auth.currentUser.uid),
        where("accepted", "==", false), where("challenger", "!=", auth.currentUser.uid), orderBy('challenger', 'asc'), orderBy('timestamp', 'desc'));
    return onSnapshot(matchQuery, docsSnap => handleMatchListenerSnapshots(docsSnap, users, dispatch));
};

export const getOutgoingMatchesListener = (dispatch: Function, users: User[]) => {
    const matchQuery = query(collection(db, "matches"), where("accepted", "==", false), where("challenger", "==", auth.currentUser.uid));
    return onSnapshot(matchQuery, docsSnap => handleMatchListenerSnapshots(docsSnap, users, dispatch));
};

export const getDeclareWinnerMatchesListener = (dispatch: Function, users: User[]) => {
    const matchQuery = query(collection(db, "matches"), where("players", "array-contains", auth.currentUser.uid),
        where("accepted", "==", true), where("winner", "==", null), orderBy('timestamp', 'desc'));
    return onSnapshot(matchQuery, docsSnap => handleMatchListenerSnapshots(docsSnap, users, dispatch));
};

export const getAllRegisteredUsersListener = (dispatch: Function) => {
    const userQuery = query(collection(db, "users"));
    return onSnapshot(userQuery, docsSnap => {
        const userList: User[] = [];
        docsSnap.forEach(doc => {
            const data = doc.data();
            const user: User = {
                id: doc.id,
                docId: doc.id,
                name: data.name,
                rating: data.rating ?? 1000,
                wins: data.wins ?? 0,
                losses: data.losses ?? 0,
            };
            userList.push(user);
        });

        dispatch(userList);
    });
};

export const getMyRatingHistoryListener = (setState: Function) => {
    const now = new Date().getTime();
    const threeMonthsAgo = new Date(now - 7906825262).getTime();
    let timestamp = threeMonthsAgo;
    const locallySavedRatings = loadMyRatingHistoryFromLocalStorage();
    if (locallySavedRatings.length) {
        timestamp = locallySavedRatings.at(-1).timestamp;
    }
    const ratingQuery = query(collection(db, auth.currentUser?.uid), where('timestamp', '>', timestamp));
    return onSnapshot(ratingQuery, docsSnap => {
        const matchList: MatchStats[] = [];
        locallySavedRatings.forEach((rating: MatchStats) => matchList.push(rating));
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

        saveDataToLocalStorage('ratinghistory', matchList);

        setState(matchList);
    });
};

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


export interface MatchResults {
    winner: User;
    loser: User;
    scores?: {
        winner?: number;
        loser?: number;
    }
};

export const updateWinnerOfMatchInFirestore = async (matchId: string, results: MatchResults) => {
    const { winner, loser, scores } = results;
    const { winnerNewRating, loserNewRating } = calculateRatings(winner, loser);
    const timestamp = new Date().getTime();

    if (scores) {
        await updateDoc(doc(db, `matches/${matchId}`), {
            winner: winner.id,
            done: true,
            scores
        });
    } else {
        await updateDoc(doc(db, `matches/${matchId}`), {
            winner: winner.id,
            done: true,
        });
    }

    await updateDoc(doc(db, `users/${winner.id}`), {
        wins: increment(1),
        rating: winnerNewRating
    });
    await updateDoc(doc(db, `users/${loser.id}`), {
        losses: increment(1),
        rating: loserNewRating
    });
    await setDoc(doc(db, winner.id, matchId), {
        timestamp: timestamp,
        rating: winnerNewRating,
        win: true,
    });
    await setDoc(doc(db, loser.id, matchId), {
        timestamp: timestamp,
        rating: loserNewRating,
        win: true,
    });

    return [winnerNewRating, loserNewRating];
};

export const createMatch = async (againstID: string, results?: MatchResults) => {
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
        accepted: true
    }).then(async docRef => {
        if (results && results.winner) {
            await updateWinnerOfMatchInFirestore(docRef.id, results);
        }
    });
};