"use client";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { z } from 'zod';
import { loginSchema } from '@/validates';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setError, setLoading } from '@/store/actions';


type LoginFormData = z.infer<typeof loginSchema>;


export default function Login() {
    const [signIn, successSignIn, loading, error] = (useSignInWithEmailAndPassword(auth));
    const user = useAppSelector((state) => state.user);

    const router = useRouter();
    const dispatch = useAppDispatch();

    const ref = useRef(dispatch);

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        if (user.user || successSignIn) {
            router.push("/");
        }
    }, [user, successSignIn])

    useEffect(() => {
        if (ref.current) {
            ref.current(setLoading(loading));
        }
    }, [loading]);

    useEffect(() => {
        if (error) {
            ref.current(setError({ error: error.message }));
        }
    }, [error]);

    const handleLogin = async (data: { email: string, password: string }) => {
        await signIn(data.email, data.password).catch((error) => {
            console.log("Sign in error", error);
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={form.handleSubmit(handleLogin)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        {...form.register("email")}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...form.register("password")}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" checked disabled />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Button onClick={() => router.push("/signup")}>
                                {"Dont have an account?"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container>
    );
}