import { User } from "firebase/auth";

export const SET_USER = 'SET_USER';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_SUCCESS = 'SET_SUCCESS';

type PartialUser = Partial<User>;

interface setUserAction {
    type: typeof SET_USER;
    user: PartialUser | null;
}

interface setLoadingAction {
    type: typeof SET_LOADING;
    loading: boolean;
}

interface setErrorAction {
    type: typeof SET_ERROR;
    error: Record<string, string> | null;
}

interface setSuccessAction {
    type: typeof SET_SUCCESS;
    success: Record<string, string> | null;
}

export type UserAction = setUserAction;

export function setUser(user: PartialUser | null): setUserAction {
    return {
        type: SET_USER,
        user: user
    }
}

export type ProcessActions = setLoadingAction | setErrorAction | setSuccessAction;

export function setLoading(loading: boolean): setLoadingAction {
    return {
        type: SET_LOADING,
        loading
    }
}

export function setError(error: Record<string, string> | null): setErrorAction {
    return {
        type: SET_ERROR,
        error
    }
}

export function setSuccess(success: Record<string, string> | null): setSuccessAction {
    return {
        type: SET_SUCCESS,
        success
    }
}