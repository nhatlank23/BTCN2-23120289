import { useState } from 'react';
import MovieCard from './MovieCard';

const MovieSlider = ({ title, movies, size = "normal" }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState('next'); // Track hướng di chuyển
  const moviesPerPage = 3;
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  // Tính movies hiển thị cho trang hiện tại
  const startIndex = currentPage * moviesPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + moviesPerPage);

  // Handle navigation
  const goToPrevPage = () => {
    setDirection('prev'); // Đặt hướng là prev
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const goToNextPage = () => {
    setDirection('next'); // Đặt hướng là next
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
      
      <div className="flex justify-between items-center">
        {/* Left Arrow */}
        <button 
          onClick={goToPrevPage}
          className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Movies with slide animation */}
        <div className="flex justify-center items-center gap-4 overflow-hidden">
          <div 
            key={currentPage}
            className={`flex gap-4 animate-in duration-300 ${
              direction === 'next' ? 'slide-in-from-right' : 'slide-in-from-left'
            }`}
          >
            {currentMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} size={size} />
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={goToNextPage}
          className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieSlider;
