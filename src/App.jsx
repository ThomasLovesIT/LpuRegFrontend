import React, { useState, useEffect } from 'react';
// 1. Import Navigate
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 



import RateLimitedUi from './components/RateLimitedUi.jsx';

import TimeIn from './pages/TimeInPage.jsx';
import TimeOut from './pages/TimeOutPage.jsx';

// Navbar
import NavBar from './components/NavBar.jsx'; 

// 2. Import the Auth Hook
import { useAuthContext } from './hooks/useAuthContext';

const App = () => {
  const [isThrottled, setIsThrottled] = useState(false);
  
  // 3. Get the user from Global State
  const { user } = useAuthContext();

  useEffect(() => {
    const handleRateLimit = () => setIsThrottled(true);
    window.addEventListener("rate-limited", handleRateLimit);
    return () => window.removeEventListener("rate-limited", handleRateLimit);
  }, []);

  return (
    <div data-theme="forest" className="min-h-screen bg-base-300">
      
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#171212',
            color: '#00FF9D',
            border: '1px solid rgba(0,255,157,0.2)'
          },
        }}
      />

      {isThrottled && <RateLimitedUi />}

      <NavBar />

      <div className="w-full">
        {/* 4. YOU WERE MISSING THIS OPENING TAG 👇 */}
        <Routes>
       
           

         <Route path="https://lpuregbackend.onrender.com/timein" element={<TimeIn />} />
        <Route path="https://lpuregbackend.onrender.com/timeout" element={<TimeOut />} />

        

        
         
          

        </Routes> 
        {/* You had this closing tag, but no opener! */}
      </div>
    </div>
  );
};

export default App;