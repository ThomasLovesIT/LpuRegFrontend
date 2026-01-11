import React, { useRef, useEffect, useState } from 'react';
import successSound from '../../public/success.mp3'; // Example path
import errorSound from '../../public/error.mp3';   // Example path

import { useTimeout } from '../hooks/useAttendance.jsx';
const TimeOut = () => {
 const {
    timeout,
    isLoading,
    message,
    isValid,
    studentId,
    setStudentId
  } = useTimeout();
 const successAudio = useRef(new Audio(successSound));
 const errorAudio = useRef(new Audio(errorSound));

 
  const handleInputChange = (e) => {
 const value = e.target.value;
    const formatRegex = /^\d{0,4}(?:-\d{0,5})?$/;

    if (formatRegex.test(value)) {
      setStudentId(value);
    }
    };
  
  // --- UPDATED API SUBMISSION ---
  const handleSubmit = async (e) => {
     e.preventDefault();
    if (studentId) {
      await timeout(studentId);
    }
  };

 useEffect(() => {
    if (message.text) {
      if (message.type === 'success') {
        successAudio.current.play();
      } else {
        errorAudio.current.play();
      }
    }
  }, [message]); 

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl justify-center mb-4">Student Time Out</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Student ID</span>
              </label>
              <input
                type="text"
                placeholder="2023-10338"
                // --- DYNAMIC CLASS FOR VISUAL FEEDBACK ---
                // Using 'input-secondary' to match the button color theme for this page
                className={`input input-bordered w-full text-lg ${isValid ? 'input-secondary' : 'input-error'}`}
                value={studentId}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="card-actions">
              <button
                type="submit"
                className={`btn btn-secondary w-full ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Time Out'}
              </button>
            </div>
          </form>

          {message.text && (
            <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} mt-4 shadow-lg`}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{message.text}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeOut;