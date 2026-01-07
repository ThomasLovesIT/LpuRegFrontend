import { useEffect, useState, useCallback } from "react";
import api from "../lib/axios";
import NoteCard from "../components/NoteCard";
import NoteCardSkeleton from "../components/NoteCardSkeleton";
import NotesNotFound from "../components/NotesNotFound";
import { RefreshCcwIcon, AlertCircleIcon } from "lucide-react";
import { toast } from 'react-hot-toast';
// 1. Import the Auth Hook
import { useAuthContext } from "../hooks/useAuthContext";

const HomePage = () => {
  // ... state setup
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle")
  const { user } = useAuthContext();

  const fetchNotes = useCallback(async (signal) => {
    // Guard clause still useful so we don't fetch if logged out
    if (!user){
      setError("You must be logged in to view notes");
        return; 
    }
       

    try {
      setStatus("loading");
      
      // ✨ LOOK HOW CLEAN THIS IS NOW!
      // No more headers. Axios handles it silently.
      const { data } = await api.get("/notes", { signal });

      setNotes(data); 
      setStatus("success");
    } catch (error) {
       setError(error.message);
          
    }
  }, [user]); 

  useEffect(() => {
    // If we have a user, fetch the data
    if (user) {
        const controller = new AbortController();
        fetchNotes(controller.signal);
        return () => controller.abort();
    }
  }, [fetchNotes, user, error]); // Add user here too

  // ... (Rest of your UI code remains the same)
  // 1. LOADING STATE
  if (status === "loading") {
    return (
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => <NoteCardSkeleton key={i} />)}
      </div>
    );
  }

  // 2. ERROR STATE
  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="bg-error/10 p-4 rounded-full mb-4">
          <AlertCircleIcon className="size-12 text-error" />
        </div>
        <h2 className="text-2xl font-bold text-base-content">Connection Interrupted</h2>
        <p className="text-base-content/60 max-w-sm mt-2 mb-6">
          We couldn't reach the forest. You might be refreshing too fast or the server is busy.
        </p>
        <button 
          onClick={() => fetchNotes()} 
          className="btn btn-primary gap-2"
        >
          <RefreshCcwIcon className="size-4" />
          Try Again
        </button>
      </div>
    );
  }

  // 3. EMPTY STATE
  if (status === "success" && notes.length === 0) {
    return <NotesNotFound />;
  }

  // 4. SUCCESS STATE
  return (
  
    
    <div className="container mx-auto p-6">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} setNotes={setNotes} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;