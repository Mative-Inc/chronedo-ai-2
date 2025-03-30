"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    // Decode token and set user data
    useEffect(() => {
        const fetchUser = async () => {
            
            const token = localStorage.getItem('token');
            if (token) {
                setLoading(true);
                try {
                    const decodedUser = jwtDecode(token);
                    console.log("decodedUser", decodedUser);
                    const res = await axios.get(`/api/${decodedUser.userId || decodedUser._id}`);
                    console.log("context uerer by id", res.data);
                    if (res.data.user) {
                        // const decodedUser = jwtDecode(res.data.token);
                        setUser(res.data.user); // Set user data from the API
                    } else {
                        setUser(decodedUser); // Fallback to decoded token data
                    }
                } catch (error) {
                    console.error('Invalid token or API error:', error);
                    logout(); // Logout if token is invalid or API fails
                }finally{
                    setLoading(false);
                }
            }
        };

        fetchUser();
    }, [router]);

    // Login function
    const login = (token) => {
        console.log("token", jwtDecode(token));
        localStorage.setItem('token', token);
        const decodedUser = jwtDecode(token);
        console.log("decodedUser, login", decodedUser);
        setUser(decodedUser);
        // router.push('/dashboard');
    };

    const setSession = (session) => {
        if (session) {
            const decodedUser = jwtDecode(session.customToken);
            localStorage.setItem('token', session.customToken);
            console.log("session user", decodedUser);
            setUser(decodedUser);
        }
    }

    // Logout function
    const logout = async () => {
        localStorage.removeItem('token');
        await signOut({ callbackUrl: '/signin', redirect: false });
        await fetch('/api/auth/session?update'); 
        setUser(null);
        router.push('/signin');
        
    };

    return (
        <UserContext.Provider value={{ user, login, logout, setSession, loading }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for easy access
export const useUser = () => useContext(UserContext);
