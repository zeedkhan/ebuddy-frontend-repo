"use client";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { auth } from '@/app/firebase/config';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { z } from 'zod';
import { signUpSchema } from '@/validates';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';


type SignUpFormData = z.infer<typeof signUpSchema>;


export default function SignUp() {
    const [createUserWithEmailAndPassword] = (useCreateUserWithEmailAndPassword(auth));
    const router = useRouter();
    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSignUp = async (data: { email: string, password: string }) => {
        try {
            const response = await createUserWithEmailAndPassword(data.email, data.password);
            console.log("Sign up response", response)
        } catch (error) {
            console.log("Sign up error", error);

        }
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
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={form.handleSubmit(handleSignUp)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoFocus
                        {...form.register("email")}
                        error={!!form.formState.errors.email}
                        helperText={form.formState.errors.email?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        {...form.register("password")}
                        error={!!form.formState.errors.password}
                        helperText={form.formState.errors.password?.message}
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
                            <Button onClick={() => router.push("/signin")}>
                                {"Already have an account?"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container>
    );
}