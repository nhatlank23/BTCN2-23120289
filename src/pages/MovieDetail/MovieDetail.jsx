import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '../../services/movieService';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-xl text-gray-600 dark:text-gray-400">Movie not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {movie.title}
      </h1>
      
      {/* Placeholder - sẽ thêm nội dung chi tiết sau */}
      <div className="text-gray-600 dark:text-gray-400">
        <p>Year: {movie.year}</p>
        <p>ID: {movie.id}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
