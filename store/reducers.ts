import { User } from 'firebase/auth';
import { SET_USER, UserAction, ProcessActions, SET_LOADING, SET_ERROR, SET_SUCCESS } from './actions';

type UserState = {
    user: User | null,
}

type ProcessState = {
    loading: boolean,
    error: Record<string, string> | null,
    success: Record<string, string> | null
}

const initialUserState: UserState = {
    user: null,
}

const processInitialState: ProcessState = {
    loading: false,
    error: null,
    success: null
}

export function userReducer(state = initialUserState, action: UserAction) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

export function processReducer(state = processInitialState, action: ProcessActions) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        case SET_SUCCESS:
            return {
                ...state,
                success: action.success
            }
        default:
            return state;
    }
}