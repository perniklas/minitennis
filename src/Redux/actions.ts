import { matchSlice } from './reducers';
import { ThunkAction, AnyAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Match } from '../interfaces/Match';
import { User } from '../interfaces/User';

export const matchActions = matchSlice.actions;

export const setAllUsers = (users: User[]): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(matchActions.setAllUsers(users));
    };
};

export const setAllMatches = (matches: Match[]): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(matchActions.setAllMatches(matches));
    };
};

export const setMyMatches = (matches: Match[]): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(matchActions.setMyMatchHistory(matches));
    };
};

export const setDeclareWinnerMatches = (matches: Match[]): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(matchActions.setDeclareWinnerMatches(matches));
    };
};

export const setIncomingMatches = (matches: Match[]): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(matchActions.setIncomingMatches(matches));
    };
};