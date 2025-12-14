import { useState } from 'react';
import MovieSlider from '../../components/MovieSlider';
import MovieCard from '../../components/MovieCard';
import { featuredMovies, popularMovies, topRatedMovies } from '../../data/movies';

const Home = () => {
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  const handlePrevFeatured = () => {
    setCurrentFeaturedIndex((prev) => 
      prev === 0 ? featuredMovies.length - 1 : prev - 1
    );
  };

  const handleNextFeatured = () => {
    setCurrentFeaturedIndex((prev) => 
      prev === featuredMovies.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-8">
      {/* Featured Movie Section */}
      <section>
        {featuredMovies.length > 0 && (
          <div className="flex justify-between items-center">
            {/* Left Arrow */}
            <button 
              onClick={handlePrevFeatured}
              className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="transition-opacity duration-300">
              <MovieCard movie={featuredMovies[currentFeaturedIndex]} size="large" />
            </div>

            {/* Right Arrow */}
            <button 
              onClick={handleNextFeatured}
              className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* Most Popular Section */}
      <MovieSlider title="Most Popular" movies={popularMovies.slice(0, 3)} />

      {/* Top Rating Section */}
      <MovieSlider title="Top Rating" movies={topRatedMovies.slice(0, 3)} />
    </div>
  );
};

export default Home;