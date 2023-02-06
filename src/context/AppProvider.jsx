import React, { createContext, useContext, useMemo} from 'react'
import { AuthContext } from './AuthProvider';
import useFireStore from '../Hooks/useFireStore';


export const AppContext = createContext();


export default function AppProvider({children}) {

    const {user} = useContext(AuthContext)
    const roomsCondition = useMemo(()=> {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: user?.uid,
        }
    },[user?.uid])

    const rooms = useFireStore('rooms', roomsCondition)



    return (
        <AppContext.Provider value={{rooms}}>
            {children}
        </AppContext.Provider>
    )
}
//save room when get for children component use.
