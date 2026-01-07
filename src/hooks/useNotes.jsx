import { useEffect,useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../hooks/useAuthContext'; 




export const useCreatePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuthContext(); 
    // [QUESTION 1] Initialize the navigation hook
    const navigate = useNavigate();

    const handleSaveNote = async (title, content) => {

         if (!user) {
            toast.error('You must be logged in');
            return;
        }
        // Validation: Ensure valid input
        if (!title.trim() || !content.trim()) {
            toast.error('Title and content are required.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                // [QUESTION 2] Prepare the data for the server
                body: JSON.stringify({title,content}),
            });

            // [QUESTION 3] The "Fetch Trap" - How do we check for logic errors (404, 500)?
            if (!response.ok) { 
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Server error occurred');
            }

            toast.success('Note created successfully!');
            
            // [QUESTION 4] Redirect the user back to the home page
            navigate('/')

        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            // [QUESTION 5] Ensure the UI doesn't freeze
          setIsLoading(false)
        }
    };

    return { handleSaveNote, isLoading, error };
};

//edit function
export const useEditNote = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  const { user } = useAuthContext(); 
    // State definitions
    const [formData, setFormData] = useState({ title: "", content: "" });
    const [isLoading, setIsLoading] = useState(true); // Default to true so we load immediately
    const [error, setError] = useState(null); // 2. Actually defined this now

    // Fetch the existing note when the hook mounts
    useEffect(() => {
        const fetchNote = async () => {
            try {
                // 3. Changed 'api.get' to 'fetch' for consistency
                const response = await fetch(`/api/notes/${id}`,
                {
                    headers: {  'Authorization': `Bearer ${user.token}` }
                }
                );
                
                if (!response.ok) throw new Error("Could not load note");
                
                const data = await response.json();
                setFormData({ title: data.title, content: data.content });
            } catch (err) {
                toast.error("Could not load note");
                setError(err.message);
                navigate("/"); // Kick them out if note doesn't exist
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchNote();
    }, [id, navigate]);

    // Helper to update state from the UI inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 4. Renamed to camelCase. REMOVED event handling (e).
    // This function now just saves whatever is in formData.
    const handleEditSubmit = async () => {
        // Validation
        if (!formData.title.trim() || !formData.content.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        
        try {
            // 5. Changed 'api.put' to 'fetch'
            const response = await fetch(`/api/notes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json',         
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("Failed to update note");

            toast.success("Note updated successfully");
            navigate(`/`); 
        } catch (err) {
            toast.error(err.message);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // 6. Return the DATA so the UI can actually use it!
    return { 
        formData, 
        handleChange, // Pass a helper to update the form
        handleEditSubmit, 
        isLoading, 
        error 
    };
}
