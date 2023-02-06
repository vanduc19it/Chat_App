import React, { createContext, useContext, useMemo, useState} from 'react'
import { AuthContext } from './AuthProvider';
import useFireStore from '../Hooks/useFireStore';


export const AppContext = createContext();


export default function AppProvider({children}) {

    const {user} = useContext(AuthContext)
    const [selectedRoomId, setSectedRoomId] = useState('')
  
    

    const roomsCondition = useMemo(()=> {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: user?.uid,
        }
    },[user?.uid])

   


    const rooms = useFireStore('rooms', roomsCondition)

    const selectedRoom = useMemo(()=> rooms.find(room => room.id === selectedRoomId) || {},[rooms,selectedRoomId])

    const  usersCondition = useMemo(()=> {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        }
    },[selectedRoom.members])

    const members = useFireStore('users', usersCondition)
    console.log(members)

    return (
        <AppContext.Provider value={{rooms, selectedRoomId, setSectedRoomId, selectedRoom, members}} >
            {children}
        </AppContext.Provider>
    )
}
//save room when get for children component use.
