import { useState, useEffect } from 'react';
import MovieSlider from '../../components/MovieSlider';
import FeaturedMovieCarousel from '../../components/FeaturedMovieCarousel';
import { getMostPopularMovies } from '../../services/movieService';
import { topRatedMovies, getTopMovies } from '../../data/movies';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        const data = await getMostPopularMovies();
        console.log('API Response:', data); // Debug: xem structure của response
        setPopularMovies(data);
      } catch (error) {
        console.error('Error fetching popular movies:', error);

      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  // Lấy top 5 phim có rating cao nhất từ fake data
  const top5FeaturedMovies = getTopMovies(topRatedMovies, 5);
  const top15RatingMovies = getTopMovies(topRatedMovies, 15);
  return (
    <div className="space-y-8">
      {/* Featured Movie Section - Top 5 phim có rating cao nhất */}
      <FeaturedMovieCarousel movies={top5FeaturedMovies} />

      {/* Most Popular Section - Lấy từ API */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-xl text-gray-600 dark:text-gray-400">Loading popular movies...</div>
        </div>
      ) : (
        <MovieSlider title="Most Popular" movies={popularMovies} />
      )}

      {/* Top Rating Section - Tạm dùng fake data */}
      <MovieSlider title="Top Rating" movies={top15RatingMovies} />
    </div>
  );
};

export default Home;