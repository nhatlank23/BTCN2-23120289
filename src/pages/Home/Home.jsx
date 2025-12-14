import MovieSlider from '../../components/MovieSlider';
import MovieCard from '../../components/MovieCard';
import { featuredMovies, popularMovies, topRatedMovies } from '../../data/movies';

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Featured Movie Section */}
      <section>
        {featuredMovies.length > 0 && (
          <div className="flex justify-between items-center">
            {/* Left Arrow */}
            <button className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <MovieCard movie={featuredMovies[0]} size="large" />

            {/* Right Arrow */}
            <button className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
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