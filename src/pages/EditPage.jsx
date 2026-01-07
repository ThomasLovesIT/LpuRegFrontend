import { useNavigate } from "react-router-dom"; // Fixed Import source
import { ArrowLeftIcon, SaveIcon, Loader2Icon, PenLineIcon } from "lucide-react";
// REMOVED: api import (The hook handles data now)
// REMOVED: toast import (The hook handles toast now)
import { useEditNote } from '../hooks/useNotes.jsx';

// 1. EVERYTHING must live inside this function
const EditPage = () => { 

  
    // 2. Initialize navigation for the "Cancel" button
    const navigate = useNavigate();

    // 3. Call the hook inside the component
    // Note: I mapped 'isLoading' to 'isUpdating' for your button logic, 
    // or you can just use 'isLoading' for both.
    const { formData, handleChange, handleEditSubmit, isLoading } = useEditNote();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        handleEditSubmit(); 
    }; // 4. Closed the function properly here!

  if (isLoading) return <EditSkeleton />;

  return (
    <div className="min-h-[calc(100-64px)] bg-base-300 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-sm gap-2 text-base-content/60 hover:text-primary transition-all"
          >
            <ArrowLeftIcon className="size-4" />
            Cancel
          </button>
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
            <PenLineIcon className="size-4" />
            Edit Mode
          </div>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-2xl border border-white/5 overflow-hidden">
          <div className="h-1.5 bg-primary w-full" />
          
          <form onSubmit={handleSubmit} className="card-body p-8">
            <h1 className="text-2xl font-bold text-base-content mb-6">Modify Note</h1>

            {/* Title Input */}
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text font-semibold text-base-content/70">Note Title</span>
              </label>
              <input
                type="text"
                 name="title"
                placeholder="Enter title..."
                className="input input-bordered bg-base-200 focus:border-primary transition-all duration-300 font-medium text-lg"
                value={formData.title}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* Content Textarea */}
            <div className="form-control w-full mb-8">
              <label className="label">
                <span className="label-text font-semibold text-base-content/70">Content</span>
              </label>
              <textarea
                name="content"
                className="textarea textarea-bordered bg-base-200 focus:border-primary transition-all duration-300 min-h-[300px] text-base leading-relaxed"
                placeholder="Write your thoughts..."
                value={formData.content}
                 onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* Action Buttons */}
            <div className="card-actions justify-end">
              <button
                type="submit"
                className={`btn btn-primary px-8 gap-2 ${isLoading ? 'btn-disabled' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <SaveIcon className="size-4" />
                )}
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


// Professional Ghost Loader for the Edit form
const EditSkeleton = () => (
  <div className="min-h-screen bg-base-300 py-10 px-4 animate-pulse">
    <div className="max-w-2xl mx-auto">
      <div className="h-8 w-24 bg-base-200 rounded mb-8" />
      <div className="bg-base-100 h-[500px] rounded-2xl" />
    </div>
  </div>
);

export default EditPage;