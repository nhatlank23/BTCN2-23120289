import { useState } from 'react';
import MovieCard from './MovieCard';

const MovieSlider = ({ title, movies, size = "normal" }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
      
      <div className="flex justify-center items-center gap-4">
        {/* Left Arrow - Static */}
        <button className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Movies */}
        <div className="flex justify-center items-center gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} size={size} />
          ))}
        </div>

        {/* Right Arrow - Static */}
        <button className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieSlider;
