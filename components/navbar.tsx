"use client";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ToggleTheme from '@/theme/toggle-theme';
import Link from 'next/link';
import { Button, Link as MUILink } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const linkProps = {
    component: Link,
    variant: "body2" as Variant,
    color: "inherit"
};

export default function Navbar() {
    const user = useAuth();
    const [signOut, loading, error] = useSignOut(auth);
    const router = useRouter();

    const handleSignout = async () => {
        const success = await signOut();
        if (success) {
            router.push("/")
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <MUILink
                        href="/"
                        {...linkProps}
                    >
                        Home
                    </MUILink>
                    <div>
                        {user.user ? (
                            <Button
                                onClick={handleSignout}
                                color="inherit"
                            >
                                Signout
                            </Button>
                        ) : (
                            <Button
                                onClick={() => router.push("/signin")}
                                color="inherit"
                            >
                                Sign in
                            </Button>
                        )}
                        <ToggleTheme />
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
