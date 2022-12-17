import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Match } from '../interfaces/Match';

interface StateInterface {
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
    matchHistory: [],
    myMatchHistory: [],
    incomingMatches: [],
    declareWinnerMatches: [],
    loadingAllMatches: false,
    loadingMyMatchHistory: false,
    loadingIncomingMatches: false,
    loadingDeclareWinnerMatches: false
};

export const matchSlice = createSlice({
    name: 'matches',
    initialState,
    reducers: {
        setAllMatches: (state: any, action: PayloadAction<Match[]>) => {
            state.matchHistory = action.payload
        },
        setLoadingAllMatches: (state: any, action: PayloadAction<boolean>) => {
            state.loadingAllMatches = action.payload
        },

        setMyMatchHistory: (state: any, action: PayloadAction<Match[]>) => {
            console.log('setting my match history', action.payload);
            state.myMatchHistory = action.payload
        },
        setLoadingMyMatchHistory: (state: any, action: PayloadAction<boolean>) => {
            state.loadingMyMatchHistory = action.payload
        },

        setIncomingMatches: (state: any, action: PayloadAction<Match[]>) => {
            state.incomingMatches = action.payload
        },
        setLoadingIncomingMatches: (state: any, action: PayloadAction<boolean>) => {
            state.loadingIncomingMatches = action.payload
        },

        setDeclareWinnerMatches: (state: any, action: PayloadAction<Match[]>) => {
            state.declareWinnerMatches = action.payload
        },
        setLoadingDeclareWinnerMatches: (state: any, action: PayloadAction<boolean>) => {
            state.loadingDeclareWinnerMatches = action.payload
        },
    },
});

export const {
    setAllMatches,
    setMyMatchHistory,
    setIncomingMatches,
    setDeclareWinnerMatches
} = matchSlice.actions

export default matchSlice.reducer;