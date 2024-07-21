import { auth } from "@/app/firebase/config";
import { setUser } from "@/store/actions";
import { useAppDispatch } from "@/store/store";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const useAuth = () => {
    const [user] = useAuthState(auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!user) {
            dispatch(setUser(null));
        } else {
            const obj : Partial<User> = JSON.parse(JSON.stringify(user))
            dispatch(setUser(obj));
        }
    }, [user, dispatch]);

    return { user };
};
