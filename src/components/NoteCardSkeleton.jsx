
const NoteCardSkeleton = () => {
  return (
    <div className="card bg-base-200 border border-white/5 border-t-4 border-t-base-300 animate-pulse">
      <div className="card-body p-5">
        {/* Title Skeleton */}
        <div className="h-6 bg-base-300 rounded-md w-3/4 mb-4"></div>
        
        {/* Content Skeleton Lines */}
        <div className="space-y-2">
          <div className="h-3 bg-base-300 rounded w-full"></div>
          <div className="h-3 bg-base-300 rounded w-full"></div>
          <div className="h-3 bg-base-300 rounded w-2/3"></div>
        </div>

        {/* Footer Skeleton */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-base-content/5">
          <div className="h-3 bg-base-300 rounded w-16"></div>
          <div className="flex gap-2">
            <div className="size-6 bg-base-300 rounded-full"></div>
            <div className="size-6 bg-base-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCardSkeleton;