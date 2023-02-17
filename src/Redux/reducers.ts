import { createSlice, PayloadAction, Unsubscribe } from '@reduxjs/toolkit'
import { Match } from '../interfaces/Match';
import { User } from '../interfaces/User';

interface StateInterface {
    loggedIn: boolean;
    users: User[];
    matchHistory: Array<Match>;
    myMatchHistory: Array<Match>;
    incomingMatches: Array<Match>;
    declareWinnerMatches: Array<Match>;
    loadingAllMatches: boolean;
    loadingMyMatchHistory: boolean;
    loadingIncomingMatches: boolean;
    loadingDeclareWinnerMatches: boolean;
}

const initialState: StateInterface = {
    loggedIn: false,
    users: [],
    matchHistory: [],
    myMatchHistory: [],
    incomingMatches: [],
    declareWinnerMatches: [],
    loadingAllMatches: false,
    loadingMyMatchHistory: false,
    loadingIncomingMatches: false,
    loadingDeclareWinnerMatches: false,
};

export const matchSlice = createSlice({
    name: 'matches',
    initialState,
    reducers: {
        setLoggedIn: (state: any, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload;
        },
        setAllUsers: (state: any, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        }, 
        setAllMatches: (state: any, action: PayloadAction<Match[]>) => {
            state.matchHistory = action.payload;
        },
        setMyMatchHistory: (state: any, action: PayloadAction<Match[]>) => {
            state.myMatchHistory = action.payload;
        },
        setIncomingMatches: (state: any, action: PayloadAction<Match[]>) => {
            state.incomingMatches = action.payload;
        },
        setDeclareWinnerMatches: (state: any, action: PayloadAction<Match[]>) => {
            state.declareWinnerMatches = action.payload;
        },
    },
});

export const {
    setLoggedIn,
    setAllUsers,
    setAllMatches,
    setMyMatchHistory,
    setIncomingMatches,
    setDeclareWinnerMatches
} = matchSlice.actions

export default matchSlice.reducer;