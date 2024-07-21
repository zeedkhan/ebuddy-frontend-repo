"use client";

import { RootState } from "@/store/store";
import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Process: React.FC = () => {
    const error = useSelector((state: RootState) => state.process.error);
    const success = useSelector((state: RootState) => state.process.success);
    const loading = useSelector((state: RootState) => state.process.loading);
    return (
        <Container
            sx={{
                padding: "1rem",
                textAlign: "center",
                width: "100%",
            }}
        >
            {error && (
                <Typography
                    variant="h5"
                    color="error"
                >
                    {JSON.stringify(error)}
                </Typography>
            )}
            {success && (
                <Typography
                    variant="h5"
                    color="success"
                >
                    {JSON.stringify(success)}
                </Typography>
            )}
            {
                loading && (
                    <Typography
                        variant="h5"
                        color="info"
                    >
                        Loading...
                    </Typography>
                )
            }
        </Container>
    )
}


export default Process;