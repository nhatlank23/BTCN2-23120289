import MovieSlider from '../../components/MovieSlider';
import FeaturedMovieCarousel from '../../components/FeaturedMovieCarousel';
import { popularMovies, topRatedMovies, getTopMovies } from '../../data/movies';

const Home = () => {

  
  // Lấy phim có doanh thu cao (tạm dùng rating)
  const top5FeaturedMovies = getTopMovies(topRatedMovies, 5);
  const top15PopularMovies = getTopMovies(popularMovies, 15);
  const top15TopRatedMovies = getTopMovies(topRatedMovies, 15);

  return (
    <div className="space-y-8">
      {/* Featured Movie Section - Top 5 phim có rating cao nhất */}
      <FeaturedMovieCarousel movies={top5FeaturedMovies} />

      {/* Most Popular Section - có pagination */}
      <MovieSlider title="Most Popular" movies={top15PopularMovies} />

      {/* Top Rating Section - có pagination */}
      <MovieSlider title="Top Rating" movies={topRatedMovies} />
      


    </div>
  );
};

export default Home;