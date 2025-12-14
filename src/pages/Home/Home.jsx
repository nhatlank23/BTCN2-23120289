import MovieSlider from '../../components/MovieSlider';
import FeaturedMovieCarousel from '../../components/FeaturedMovieCarousel';
import { featuredMovies, popularMovies, topRatedMovies } from '../../data/movies';

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Featured Movie Section */}
      <FeaturedMovieCarousel movies={featuredMovies} />

      {/* Most Popular Section */}
      <MovieSlider title="Most Popular" movies={popularMovies.slice(0, 3)} />

      {/* Top Rating Section */}
      <MovieSlider title="Top Rating" movies={topRatedMovies.slice(0, 3)} />
    </div>
  );
};

export default Home;