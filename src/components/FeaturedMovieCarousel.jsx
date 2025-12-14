import { useState } from 'react';
import MovieCard from './MovieCard';

const FeaturedMovieCarousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? movies.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === movies.length - 1 ? 0 : prev + 1
    );
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section>
      <div className="flex justify-between items-center">
        {/* Left Arrow */}
        <button 
          onClick={handlePrev}
          className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Movie Card with Animation */}
        <div className="relative overflow-hidden">
          <div 
            key={currentIndex}
            className="animate-in fade-in zoom-in-95 duration-500"
          >
            <MovieCard movie={movies[currentIndex]} size="large" />
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={handleNext}
          className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default FeaturedMovieCarousel;
