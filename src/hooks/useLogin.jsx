import { useAuthContext } from './useAuthContext.jsx'
import { useState } from 'react'


export const useLogin = () => {
        const [error, setError] = useState(null)
        const [loading, setloading] = useState(null)
        const { dispatch } = useAuthContext()

       
        const login = async (email, password) => {
            setloading(true);
            setError(null);

            try{
            const response = await fetch('api/user/login', {
                 method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})            
            })

            const json = await response.json()

            if (!response.ok) {
                setloading(false)
                setError(json.error)
                return
            }

            if (response.ok){
                // save the user to local storage.
                localStorage.setItem('user', JSON.stringify(json))
                dispatch({type: 'LOGIN', payload: json})
                setloading(false)
            }
        }catch(error){
            setloading(false)
            setError("Unable to connect to server")
        }

      }

        return {login, loading, error}
}