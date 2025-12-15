import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchCard from '../../components/SearchCard';
import { searchMovies, searchPeople, getPersonDetail } from '../../services/movieService';

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
        
        // 1. Tìm phim theo tên
        const movieResults = await searchMovies(query);
        
        // 2. Tìm người (diễn viên/đạo diễn) theo tên
        const peopleResults = await searchPeople(query);
        
        // 3. Lấy phim từ các người tìm được
        const moviesFromPeople = [];
        for (const person of peopleResults) {
          const personMovies = await getPersonDetail(person.id);
          // getPersonDetail đã trả về known_for array (là danh sách movies)
          if (personMovies && personMovies.length > 0) {
            moviesFromPeople.push(...personMovies);
          }
        }
        console.log('Movies from people:', moviesFromPeople);
        // 4. Merge và loại trùng (dựa vào id)
        const allMovies = [...movieResults, ...moviesFromPeople];
        const uniqueMovies = Array.from(
          new Map(allMovies.map(movie => [movie.id, movie])).values()
        );
        
        setMovies(uniqueMovies);
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
