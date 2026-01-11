import React, { useRef, useEffect } from 'react';
import { useTimein } from '../hooks/useAttendance.jsx';

// It's best practice to keep assets like audio files in your public folder.
// This ensures they are served statically and can be accessed with a simple path.
import successSound from '../../public/success.mp3'; // Example path
import errorSound from '../../public/error.mp3';   // Example path

const TimeIn = () => {
  const {
    timein,
    isLoading,
    message,
    isValid,
    studentId,
    setStudentId
  } = useTimein();

  // --- NEW: Refs for Audio ---
  // We use useRef to hold the Audio objects. This prevents them from being
  // re-created on every render, which is much more efficient.
  const successAudio = useRef(new Audio(successSound));
  const errorAudio = useRef(new Audio(errorSound));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (studentId) {
      await timein(studentId);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const formatRegex = /^\d{0,4}(?:-\d{0,5})?$/;

    if (formatRegex.test(value)) {
      setStudentId(value);
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
  }, [message]); // This effect re-runs only when the 'message' object changes.

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl justify-center mb-6 font-bold text-white-700">
            Seminar Attendance
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Student ID</span>
              </label>
              
              <input
                type="text"
                placeholder="xxxx-xxxxx"
                className={`input input-bordered w-full text-lg tracking-wider ${
                   !isValid && studentId.length > 0 ? 'input-error' : 'input-primary'
                }`}
                value={studentId}
                onChange={handleInputChange}
                maxLength={10}
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">Format: 2023-10338</span>
              </label>
            </div>
            
            <div className="card-actions">
              <button
                type="submit"
                className={`btn btn-primary w-full text-lg ${isLoading ? 'loading' : ''}`}
                disabled={isLoading || studentId.length < 10 || !/^\d{4}-\d{5}$/.test(studentId)}
              >
                {isLoading ? 'Recording...' : 'Time In'}
              </button>
            </div>
          </form>

          {message.text && (
            <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} mt-6 shadow-lg`}>
              <div>
                {message.type === 'success' ? (
                   <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                )}
                <span>{message.text}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeIn;