import { useState, useEffect } from 'react';
import MovieSlider from '../../components/MovieSlider';
import FeaturedMovieCarousel from '../../components/FeaturedMovieCarousel';
import { getMostPopularMovies, getTopRatedMovies, getTopMovies } from '../../services/movieService';


const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [ratingMovies, setRatingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        // Gọi 2 API song song
        const [popularData, ratingData] = await Promise.all([
          getMostPopularMovies(),
          getTopRatedMovies(),
        ]);
        
        setPopularMovies(popularData);
        setRatingMovies(ratingData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Lấy top 5 phim có rating cao nhất cho Featured Carousel
  const top5FeaturedMovies = getTopMovies(ratingMovies, 5);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading movies...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Featured Movie Section - Top 5 phim có rating cao nhất từ API */}
      <FeaturedMovieCarousel movies={top5FeaturedMovies} />

      {/* Most Popular Section - Từ API */}
      <MovieSlider title="Most Popular" movies={popularMovies} />

      {/* Top Rating Section - Từ API */}
      <MovieSlider title="Top Rating" movies={ratingMovies} />
    </div>
  );
};

export default Home;