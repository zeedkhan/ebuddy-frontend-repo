import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/theme/provider";
import ReduxProvider from "@/store/provider";
import Process from "@/components/process";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body>
          <ThemeProvider>
            <AppRouterCacheProvider>
              <Navbar />
              <Process />
              {children}
            </AppRouterCacheProvider>
          </ThemeProvider>
        </body>
      </ReduxProvider>
    </html>
  );
}
