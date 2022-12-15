import { matchSlice } from './reducers';
import { ThunkAction, AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Match } from '../interfaces/Match';
import { getDeclareWinnerMatches, getMatches, getMyIncomingMatches, getMyMatchHistory } from '../helpers/firestore';

export const matchActions = matchSlice.actions;

export const fetchAllMatches = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        if (getState().matchHistory.length === 0) {
            const response: Match[] = await getMatches();
            console.log('fetching all matches');
            console.log(response);
            dispatch(matchActions.setAllMatches(response));
        }
    };
};

// export const fetchMyMatches = (): ThunkAction<void, RootState, unknown, AnyAction> => {
//     return async (dispatch, getState) => {
//         const state = getState();
//         if (state.myMatchHistory.length === 0) {
//             const response: Match[] = await getMyMatchHistory();
//             console.log('fetching my matches');
//             console.log(response);
//             dispatch(matchActions.setMyMatchHistory(response));
//         } else {
//             console.log('there were matches');
//         }
//     };
// };

export const fetchMyMatches = createAsyncThunk(
    'fetchMyMatches',
    async () => {
        console.log('fetching my matches');
        return await getMyMatchHistory();
    }
);

// export const fetchMyMatches = (): ThunkAction<void, RootState, unknown, AnyAction> => 
//     async dispatch => {
//         console.log('fetching my matches');
//         const response: Match[] = await getMyMatchHistory();
//         console.log(response);
//         dispatch(matchActions.setMyMatchHistory(response));
//     };

export const fetchIncomingMatches = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        if (getState().incomingMatches.length === 0) {
            const response: Match[] = await getMyIncomingMatches();
            console.log('fetching incoming matches');
            console.log(response);
            dispatch(matchActions.setIncomingMatches(response));
        }
    };
};

export const fetchDeclareWinnerMatches = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        if (getState().declareWinnerMatches.length === 0) {
            const response: Match[] = await getDeclareWinnerMatches();
            console.log('fetching matches ya boys need to declare a winner to, lads');
            console.log(response);
            dispatch(matchActions.setDeclareWinnerMatches(response));
        }
    };
};