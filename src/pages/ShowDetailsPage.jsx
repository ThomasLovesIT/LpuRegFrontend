import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeftIcon, PenSquareIcon, Trash2Icon, CalendarIcon } from "lucide-react";
import api from "../lib/axios";
import { formatPHDate } from "../lib/utils";
import toast from "react-hot-toast";

const ShowDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await api.get(`/notes/${id}`);
        setNote(data);
      } catch (error) {
        toast.error("Note not found");
        navigate("/"); // Redirect home if note doesn't exist
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  if (loading) return <DetailsSkeleton />;

  return (
    <div className="min-h-screen bg-base-300 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate(`/`)} 
            className="btn btn-ghost gap-2 text-base-content/60 hover:text-primary transition-all"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Notes
          </button>
          
          <div className="flex gap-2">
            <Link to={`/notes/${id}/edit`} className="btn btn-primary btn-sm md:btn-md gap-2">
              <PenSquareIcon className="size-4" />
              <span className="hidden sm:inline">Edit</span>
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline btn-sm md:btn-md gap-2">
              <Trash2Icon className="size-4" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>

        {/* Note Content Area */}
        <article className="bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-white/5">
          {/* Accent Header */}
          <div className="h-2 bg-primary w-full" />
          
          <div className="p-6 md:p-10">

              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-3 text-primary/70 text-sm mb-4 font-medium">
                  <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    <CalendarIcon className="size-4" />
                   {formatPHDate(note.createdAt)} {/* Changed here */}
                    <span className="ml-1 text-[10px] opacity-60">PHT</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-base-content leading-tight">
                  {note.title}
                </h1>
              </header>

            {/* The actual note body */}
            <div className="prose prose-lg max-w-none text-base-content/80 leading-relaxed whitespace-pre-wrap">
              {note.content}
            </div>
          </div>
        </article>

        {/* Footer Meta */}
        <div className="mt-6 text-center">
          <p className="text-xs text-base-content/30 uppercase tracking-[0.2em]">
            Document ID: {note._id}
          </p>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader for professional "perceived speed"
const DetailsSkeleton = () => (
  <div className="min-h-screen bg-base-300 py-8 px-4 animate-pulse">
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between mb-8">
        <div className="h-10 w-32 bg-base-200 rounded-lg" />
        <div className="h-10 w-24 bg-base-200 rounded-lg" />
      </div>
      <div className="bg-base-100 h-[500px] rounded-2xl border border-white/5" />
    </div>
  </div>
);

export default ShowDetailsPage;