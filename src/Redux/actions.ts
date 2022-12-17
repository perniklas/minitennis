import { matchSlice, setMyMatchHistory } from './reducers';
import { ThunkAction, AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Match } from '../interfaces/Match';
import { getDeclareWinnerMatches, getMatches, getMyIncomingMatches, getMyMatchHistory } from '../helpers/firestore';

export const matchActions = matchSlice.actions;

export const fetchAllMatches = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        if (!getState().loadingAllMatches) {
            dispatch(matchActions.setLoadingAllMatches(true));
            const response: Match[] = await getMatches();
            console.log('fetching all matches');
            console.log(response);
            dispatch(matchActions.setAllMatches(response));
            dispatch(matchActions.setLoadingAllMatches(false));
        }
    };
};

export const fetchMyMatches = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        console.log('fetching my matches');
        dispatch(matchActions.setLoadingMyMatchHistory(true));
        const response: Match[] = await getMyMatchHistory();
        dispatch(matchActions.setMyMatchHistory(response));
        dispatch(matchActions.setLoadingMyMatchHistory(false));
    };
};

export const fetchIncomingMatches = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        if (!getState().loadingIncomingMatches) {
            console.log('fetching incoming matches');
            dispatch(matchActions.setLoadingIncomingMatches(true));
            const response: Match[] = await getMyIncomingMatches();
            dispatch(matchActions.setIncomingMatches(response));
            dispatch(matchActions.setLoadingIncomingMatches(false));
        }
    };
};

export const fetchDeclareWinnerMatches = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        if (!getState().loadingDeclareWinnerMatches) {
            console.log('fetching declare-winner-matches (what a clusterfuck of words)');
            dispatch(matchActions.setLoadingDeclareWinnerMatches(true));
            const response: Match[] = await getDeclareWinnerMatches();
            dispatch(matchActions.setDeclareWinnerMatches(response));
            dispatch(matchActions.setLoadingDeclareWinnerMatches(false));
        }
    };
};