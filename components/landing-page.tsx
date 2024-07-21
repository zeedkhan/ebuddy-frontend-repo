"use client";

import { auth } from "@/app/firebase/config";
import useCustomDispatch from "@/hooks/useCustomDispatch";
import { setLoading } from "@/store/actions";
import { RootState } from "@/store/store";
import { Box, Button } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LandingPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const [token, setToken] = useState<string | null>(null);
    const [users, setUsers] = useState<any[]>([]);

    const [updatedUser, setUpdatedUser] = useState<Record<string, string>>({});
    const [hideRedux, setHideRedux] = useState<boolean>(true);
    const [hideUsers, setHideUsers] = useState<boolean>(true);
    const [hideUpdated, setHideUpdated] = useState<boolean>(true);

    const processStates = useCustomDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken().then((token) => {
                    setToken(token);
                })
            } else {
                setToken(null);
            }
        })
    }, []);

    const handleSetError = (err: unknown) => {
        if (err instanceof AxiosError) {
            processStates.forceError(err.response?.data);
        } else {
            processStates.forceError({ error: "An error occurred" });
        }
    }


    const fetchUsers = async () => {
        processStates.clearAndLoad();
        try {
            const request = await axios.get("http://localhost:8000/fetch-user-data", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUsers(request.data);

            processStates.forceSuccess({ success: "Fetched data" });
        } catch (err) {
            handleSetError(err);
        } finally {
            setLoading(false);
        }
    };


    const updateUserCollection = async () => {
        processStates.clearAndLoad();
        const payload = {
            uid: user.user?.uid || "",
        }
        try {
            const request = await axios.put("http://localhost:8000/update-user-data", payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setUpdatedUser(request.data);
            processStates.forceSuccess({ success: "User updated" });
        } catch (err) {
            handleSetError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <h1>Landing page</h1>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div>
                    <Button
                        sx={{ margin: 2 }}
                        color="inherit"
                        variant="contained"
                        onClick={fetchUsers}
                    >
                        Fetch user
                    </Button>
                </div>
                <div>
                    <Button
                        sx={{ margin: 2 }}
                        variant="contained"
                        color="inherit"
                        onClick={updateUserCollection}
                    >
                        Update Collection
                    </Button>
                </div>
            </Box>

            <Box
                sx={{
                    maxWidth: "80vw",
                    overflow: "auto",
                }}
            >
                <Button onClick={() => setHideRedux(!hideRedux)}>
                    Show data - Redux user:
                </Button>
                <pre hidden={hideRedux}>
                    {JSON.stringify(user, null, 2)}
                </pre>
            </Box>

            <Box
                sx={{
                    marginTop: 10,
                    maxWidth: "80vw",
                    overflow: "auto",
                }}
            >
                <Button onClick={() => setHideUsers(!hideUsers)}>
                    Show data - Fetch users (fetch-user-data):
                </Button>
                <pre hidden={hideUsers}>
                    {JSON.stringify(users, null, 2)}
                </pre>
            </Box>

            <Box
                sx={{
                    marginTop: 10,
                    maxWidth: "80vw",
                    overflow: "auto",
                }}
            >
                <Button onClick={() => setHideUpdated(!hideUpdated)}>
                    Show data - update user (update-user-data):
                </Button>
                <pre hidden={hideUpdated}>
                    {JSON.stringify(updatedUser, null, 2)}
                </pre>
            </Box>


        </Box>
    )
}


export default LandingPage;