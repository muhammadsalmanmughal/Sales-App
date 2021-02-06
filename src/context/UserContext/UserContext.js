import React, { createContext, useReducer } from 'react'
import UserReducer from './UserReducer'
//Initial State
const UserInitialState = {
    userData: {
        name: 'M.Salman',
        email: 'muhammadsalman0403@gmail.com',
        id: '123456789abcdefgh'
    }
}

//Create Context
export const UserDataContext = createContext(UserInitialState)

//Create Provider
export const UserDataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, UserInitialState)
    return (
        <UserDataContext.Provider value={{
            userData: state.userData
        }}>
            {children}
        </UserDataContext.Provider>
    )
}