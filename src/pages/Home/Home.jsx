import MovieSlider from '../../components/MovieSlider';
import MovieCard from '../../components/MovieCard';
import { featuredMovies, popularMovies, topRatedMovies } from '../../data/movies';

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Featured Movie Section */}
      <section className="relative">
        <div className="flex justify-center items-center">
          {featuredMovies.length > 0 && (
            <div className="relative group">
              {/* Left Arrow */}
              <button className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <MovieCard movie={featuredMovies[0]} size="large" />

              {/* Right Arrow */}
              <button className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Most Popular Section */}
      <MovieSlider title="Most Popular" movies={popularMovies} />

      {/* Top Rating Section */}
      <MovieSlider title="Top Rating" movies={topRatedMovies} />
    </div>
  );
};

export default Home;