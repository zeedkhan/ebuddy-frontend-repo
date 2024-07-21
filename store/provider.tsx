"use client";

import { Provider } from 'react-redux';
import { store } from "@/store/store";
import { useEffect } from 'react';
import { setError, setLoading, setSuccess } from "@/store/actions";
import { usePathname } from 'next/navigation';


const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    useEffect(() => {
        store.dispatch(setError(null));
        store.dispatch(setSuccess(null));
        store.dispatch(setLoading(false));
        console.log(pathname)
    }, [pathname])

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
};


export default ReduxProvider;