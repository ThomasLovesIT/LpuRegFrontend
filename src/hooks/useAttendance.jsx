import { useState } from 'react'
import { apiRequest } from '../lib/utils.js'; // Import the helper
export const useTimein = () => {
    const [studentId, setStudentId] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [message, setMessage] = useState({text: '', type:''})

    const timein = async (inputId) => {

        const formatRegex = /^\d{4}-\d{5}$/;
        if(!formatRegex.test(inputId)){
            setMessage({text:'Format invalid', type: error})
            setIsValid(false)
            return
        }

        setIsLoading(true)
        setMessage({text:'', type: ''})
            setIsValid(true)
        try{
           const response = await apiRequest('/attendance', {
                method: 'POST',
               headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({student_id: inputId, type: 'IN'})
         })

         const data = await response.json()

         if(!response.ok){
            throw new Error(data.error || data.message)
         }

   
         setMessage({text:data.message, type: 'success'})
         setStudentId('')
        
        }catch(error){
            setMessage({ text: error.message, type: error});
        }finally{
            setIsLoading(false)
        }
    }
    return {
        timein, 
        isLoading, 
        message, 
        isValid, 
        studentId, 
        setStudentId
    }   

}

export const useTimeout = () => {
     const [studentId, setStudentId] = useState('')
     const [isValid, setIsValid] = useState(true)
     const [isLoading, setIsLoading] = useState(false)
     const [message, setMessage] = useState({text: '', type: ''})

     const timeout = async (inputId) => {

           const formatRegex = /^\d{4}-\d{5}$/;
           if(!formatRegex.test(inputId)){
            setMessage({text:'invalid format', type: error})
            setIsValid(false)
            return
           }
               setIsLoading(true)
           setMessage({text:'', type:''})
       
           setIsValid(true)

           try{
              const response = await apiRequest('/attendance', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({student_id: inputId, type: 'OUT'})
                })
                const data = await response.json()
                if (!response.ok){
                    throw new Error(data.message || data.error)
                }
                
            setStudentId('')
            setMessage({text:data.message, type:'success'})
            setIsValid(true)
           }catch(error){
                 setMessage({text:error.message, type:error})
           }finally{
            setIsLoading(false)
           }

     }
     return {
         timeout,
    isLoading,
    message,
    isValid,
    studentId,
    setStudentId
     }
}
