import MovieSlider from '../../components/MovieSlider';
import FeaturedMovieCarousel from '../../components/FeaturedMovieCarousel';
import { featuredMovies, popularMovies, topRatedMovies, getTopRatedMovies } from '../../data/movies';

const Home = () => {
  // Lấy top 5 phim có rating cao nhất từ featuredMovies
  const top5FeaturedMovies = getTopRatedMovies(featuredMovies, 5);

  return (
    <div className="space-y-8">
      {/* Featured Movie Section - Top 5 phim có rating cao nhất */}
      <FeaturedMovieCarousel movies={top5FeaturedMovies} />

      {/* Most Popular Section */}
      <MovieSlider title="Most Popular" movies={popularMovies.slice(0, 3)} />

      {/* Top Rating Section */}
      <MovieSlider title="Top Rating" movies={topRatedMovies.slice(0, 3)} />
    </div>
  );
};

export default Home;