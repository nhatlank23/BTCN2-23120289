import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchCard from '../../components/SearchCard';
import { searchMovies } from '../../services/movieService';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setMovies([]);
        return;
      }

      try {
        setLoading(true);
        const results = await searchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error('Error searching movies:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Search Results
        </h1>
        {query && (
          <p className="text-gray-600 dark:text-gray-400">
            Searching for: <span className="font-semibold">"{query}"</span>
          </p>
        )}
      </div>

      {/* Hiển thị kết quả */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Loading search results...</p>
        </div>
      ) : !query ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Enter a search query to find movies</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No movies found for "{query}"</p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 dark:text-gray-400">
            Found {movies.length} movie{movies.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <SearchCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
