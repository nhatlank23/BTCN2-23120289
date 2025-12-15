import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchCard from '../../components/SearchCard';
import { searchMovies, searchPeople, getPersonDetail } from '../../services/movieService';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;

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
          const personDetail = await getPersonDetail(person.id);
          const personMovies = personDetail?.known_for || [];

          // getPersonDetail trả về person object, lấy known_for array từ đó
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
        setCurrentPage(1); // Reset về trang 1 khi search mới
      } catch (error) {
        console.error('Error searching movies:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  // Tính toán pagination
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          {/* Results count */}
          <div className="flex justify-between items-center">
            <p className="text-gray-700 dark:text-gray-300">
              found <span className="font-semibold">{movies.length}</span> movies
            </p>
            {totalPages > 1 && (
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Page {currentPage} / {totalPages}
              </p>
            )}
          </div>

          {/* Movies grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMovies.map((movie) => (
              <SearchCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page numbers */}
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 rounded-md transition ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white dark:bg-blue-500'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              {/* Next button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
