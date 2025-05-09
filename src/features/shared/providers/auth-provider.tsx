"use client"

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast"

interface IAuthProvider{
    session: Session | null;
    children: React.ReactNode
}

export default function AuthProvider({
    session,
    children
} : IAuthProvider) {
    return (
        <SessionProvider session={session}>
            <Toaster position="top-right"/>
            {children}
        </SessionProvider>
    );
}