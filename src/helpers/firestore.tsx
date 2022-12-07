import { db } from "./firebase";
import {
    query,
    getDocs,
    collection,
    orderBy,
    QueryDocumentSnapshot,
} from "firebase/firestore";

const getUsers = async () => {
    const users: Array<any> = [];
    const userQuery = query(collection(db, "users"));
    const userDocs = await getDocs(userQuery);
    userDocs.forEach((snapshot: QueryDocumentSnapshot) => {
        const user = snapshot.data();
        user.id = user.uid;
        user.wins = user.wins ?? 0;
        user.losses = user.losses ?? 0;
        user.rating = user.rating ?? 0;

        users.push(user);
    });

    return users;
}

const getMatches = async () => {
    const users: Array<any> = [];
    const userQuery = query(collection(db, "matches"));
    const userDocs = await getDocs(userQuery);
    userDocs.forEach((snapshot: QueryDocumentSnapshot) => {
        const user = snapshot.data();
        users.push(user)
    });

    return users;
}

const getTournaments = async () => {
    const users: Array<any> = [];
    const userQuery = query(collection(db, "tournaments"));
    const userDocs = await getDocs(userQuery);
    userDocs.forEach((snapshot: QueryDocumentSnapshot) => {
        const user = snapshot.data();
        users.push(user)
    });

    return users;
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

export {
    getDashboardOverview,
    getUsers,
    getMatches,
    getTournaments
}