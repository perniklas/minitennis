import { matchSlice, setMyMatchHistory } from './reducers';
import { ThunkAction, AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Match } from '../interfaces/Match';
import { getAllRegisteredUsers, getDeclareWinnerMatches, getMatches, getMyIncomingMatches, getMyMatchHistory, getUsers } from '../helpers/firestore';
import { User } from '../interfaces/User';

export const matchActions = matchSlice.actions;

export const fetchAllUsers = (setState: Function): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        if (!getState().loadingAllMatches) {
            const response: User[] = await getUsers(); 
            dispatch(matchActions.setAllUsers(response));
            setState(response);
        }
    };
};

export const fetchAllMatches = (setState: Function): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        if (!getState().loadingAllMatches) {
            const response: Match[] = await getMatches();
            dispatch(matchActions.setAllMatches(response));
            setState(response);
        }
    };
};

export const fetchLatestMatches = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        if (!getState().loadingAllMatches) {
            console.log('fetching all matches');
            const response: Match[] = await getMatches();
            console.log('all matches: ', response);
            dispatch(matchActions.setAllMatches(response));
        }
    };
};

export const fetchMyMatches = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        console.log('fetching my matches');
        const response: Match[] = await getMyMatchHistory();
        dispatch(matchActions.setMyMatchHistory(response));
    };
};

export const fetchIncomingMatches = (setState: Function): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        if (!getState().loadingIncomingMatches) {
            console.log('fetching incoming matches');
            const response: Match[] = await getMyIncomingMatches();
            dispatch(matchActions.setIncomingMatches(response));
            setState(response);
        }
    };
};

export const fetchDeclareWinnerMatches = (setState: Function): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        if (!getState().loadingDeclareWinnerMatches) {
            console.log('fetching declare-winner-matches (what a clusterfuck of words)');
            const response: Match[] = await getDeclareWinnerMatches();
            dispatch(matchActions.setDeclareWinnerMatches(response));
            setState(response);
        }
    };
};