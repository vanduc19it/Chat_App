import { getAuth } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();


export default function AuthProvider({children}) {

    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const auth = getAuth();


    useEffect(() => {
        const unsubscribed = auth.onIdTokenChanged((user) => {
            console.log('authprovider', user)
            if(user?.uid) {
                setUser(user);
               
                localStorage.setItem('accessToken', user.accessToken);
                return;
            }
            //reset user info
            setUser({});
            
            localStorage.clear();
            navigate('/login')
        })
        return () => {
            unsubscribed();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[auth])


    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
//save userinfo when user login for children component use.
