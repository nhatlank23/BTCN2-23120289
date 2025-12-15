import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '../../services/movieService';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullPlot, setShowFullPlot] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetail(id);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-xl text-gray-600 dark:text-gray-400">Loading movie details...</p>
      </div>
    );
  }
  console.log('Movie detail:', movie);
  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-xl text-gray-600 dark:text-gray-400">Movie not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header: Title and Year */}
      <div className="border-b pb-4 border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {movie.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
          {movie.year}
        </p>
      </div>

      {/* Main Content: Image + Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Poster */}
        <div className="md:col-span-1">
          <img 
            src={movie.image} 
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Right: Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Rating */}
          {movie.ratings?.imDb && (
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {movie.ratings.imDb}/10
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                (IMDb)
              </span>
            </div>
          )}

          {/* Runtime */}
          {movie.runtime && (
            <div>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Runtime:</strong> {movie.runtime}
              </span>
            </div>
          )}

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Genres
              </h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Directors */}
          {movie.directors && movie.directors.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Director{movie.directors.length > 1 ? 's' : ''}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {movie.directors.map(d => d.name).join(', ')}
              </p>
            </div>
          )}

          {/*Description */}
          {movie.plot_full && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Plot
              </h2>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: showFullPlot 
                      ? movie.plot_full 
                      : movie.plot_full.substring(0, 300) + (movie.plot_full.length > 300 ? '...' : '')
                  }}
                />
                {movie.plot_full.length > 300 && (
                  <button
                    onClick={() => setShowFullPlot(!showFullPlot)}
                    className="text-blue-600 dark:text-blue-400 hover:underline mt-2 font-medium"
                  >
                    {showFullPlot ? 'Thu gọn' : 'Xem thêm'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Cast */}
          {movie.actors && movie.actors.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Cast
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {movie.actors.map((actor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {actor.image && (
                      <img 
                        src={actor.image} 
                        alt={actor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {actor.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
