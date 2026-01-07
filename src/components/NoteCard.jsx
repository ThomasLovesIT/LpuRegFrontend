import { PenSquareIcon, Trash2Icon, ClockIcon } from "lucide-react";
import { Link } from "react-router";
import { formatPHDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";


const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e) => {
    // 1. Prevent the card's Link from triggering
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      // 2. Use note._id directly from props
      await api.delete(`/notes/${note._id}`);
      setNotes((prev) => prev.filter((item) => item._id !== note._id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    /* Change the 'to' path below to match your Route in App.jsx */
    <Link
      to={`/notes/${note._id}`} 
      className="group card bg-base-200 hover:bg-base-100 transition-all duration-300 border border-white/5 hover:border-primary/30 border-t-4 border-t-primary shadow-md hover:-translate-y-1"
    >
      <div className="card-body p-5">
        <h3 className="card-title text-base-content group-hover:text-primary transition-colors">
          {note.title}
        </h3>
        <p className="text-base-content/70 line-clamp-3 text-sm mb-4">
          {note.content}
        </p>
        <div className="card-actions justify-between items-center mt-auto pt-4 border-t border-base-content/5">
          <span className="text-[11px] uppercase tracking-widest font-bold text-base-content/40">
           {formatPHDate(note.createdAt)} {/* Changed here */}
          </span>
          <div className="flex items-center gap-1">
            <div className="btn btn-ghost btn-xs btn-circle text-base-content/50 group-hover:text-primary">
              <PenSquareIcon className="size-4" />
            </div>
            <button
              className="btn btn-ghost btn-xs btn-circle text-error/50 hover:text-error hover:bg-error/10"
              onClick={handleDelete}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;