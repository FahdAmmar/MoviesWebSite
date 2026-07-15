import React from 'react';

const SkeletonLoader: React.FC = () => {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Loading movies"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="animate-pulse" aria-hidden="true">
                    <div className="bg-gray-800 rounded-lg aspect-[2/3]"></div>
                    <div className="mt-2 h-4 bg-gray-800 rounded w-3/4"></div>
                    <div className="mt-1 h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
            ))}
            <span className="sr-only">Loading movies…</span>
        </div>
    );
};

export default SkeletonLoader;