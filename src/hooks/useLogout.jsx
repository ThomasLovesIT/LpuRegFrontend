import { useAuthContext } from './useAuthContext.jsx'
import { useState } from 'react'


export const useLogout = () => {
        const { dispatch } = useAuthContext()

        const logout = () => {

       
            //remove user from the storage
            localStorage.removeItem('user');

            //Dispatch logout action
            dispatch({type: 'LOGOUT'})

     }
     return {logout}
}
        
