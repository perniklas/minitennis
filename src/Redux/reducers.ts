import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Match } from '../interfaces/Match';

interface StateInterface {
    matchHistory: Array<Match>;
    myMatchHistory: Array<Match>;
    incomingMatches: Array<Match>;
    declareWinnerMatches: Array<Match>;
}

const initialState: StateInterface = {
    matchHistory: [],
    myMatchHistory: [],
    incomingMatches: [],
    declareWinnerMatches: []
};

export const matchSlice = createSlice({
    name: 'matches',
    initialState,
    reducers: {
        setAllMatches: (state: any, action: PayloadAction<Match[]>) => {
            state.matchHistory = action.payload
        },
        setMyMatchHistory: (state: any, action: PayloadAction<Match[]>) => {
            console.log('setting my match history', action.payload);
            state.myMatchHistory = action.payload
        },
        setIncomingMatches: (state: any, action: PayloadAction<Match[]>) => {
            state.incomingMatches = action.payload
        },
        setDeclareWinnerMatches: (state: any, action: PayloadAction<Match[]>) => {
            state.declareWinnerMatches = action.payload
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