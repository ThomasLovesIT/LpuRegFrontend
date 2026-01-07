import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; 
import { useCreatePage } from '../hooks/useNotes.jsx';

const Createpage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  // 🔴 FIX 2: Use 'loading', matching the hook return value
  const { handleSaveNote, error, isLoading } = useCreatePage() 

  const handleSubmit = async (e) => {
    e.preventDefault(); // Fixed semicolon formatting
    await handleSaveNote(title, content);
  }

  return (
    <div className="flex justify-center items-center p-4 min-h-screen bg-base-200">
      <div className="card w-full max-w-xl shadow-2xl bg-base-100">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-6">Create New Note</h1>

          <form onSubmit={handleSubmit}>
            {/* Title Input */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input 
                type="text" 
                placeholder="Enter a descriptive title..." 
                className="input input-bordered w-full" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Content Textarea */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                placeholder="Write your note content here..."
                className="textarea textarea-bordered h-40 w-full"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className={`btn btn-primary w-full ${isLoading ? 'btn-disabled' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                   <>
                     <span className="loading loading-spinner"></span> Saving...
                   </>
                ) : 'Save Note'}
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}
export default Createpage;