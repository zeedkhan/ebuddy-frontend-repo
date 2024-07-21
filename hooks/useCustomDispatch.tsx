"use client";

import { setError, setLoading, setSuccess } from "@/store/actions";
import { useAppDispatch } from "@/store/store";

const useCustomDispatch = () => {
    const dispatch = useAppDispatch();

    const clearAndLoad = () => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        dispatch(setSuccess(null));
    }

    const forceSuccess = (success: Record<string, string> | null) => {
        dispatch(setLoading(false));
        dispatch(setError(null));
        dispatch(setSuccess(success));
    }

    const forceError = (error: Record<string, string> | null) => {
        dispatch(setLoading(false));
        dispatch(setError(error));
        dispatch(setSuccess(null));
    }

    const clearAll = () => {
        dispatch(setLoading(false));
        dispatch(setError(null));
        dispatch(setSuccess(null));
    }

    return {
        clearAndLoad: clearAndLoad,
        dispatch: dispatch,
        forceSuccess: forceSuccess,
        forceError: forceError,
        clearAll: clearAll
    }
};


export default useCustomDispatch;