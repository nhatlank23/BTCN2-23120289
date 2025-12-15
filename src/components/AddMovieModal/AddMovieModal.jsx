import { useState } from 'react';
import { Button } from '../ui/button';
import { searchMovies, searchPeople, getPersonDetail } from '../../services/movieService';

export default function AddMovieModal({ isOpen, onClose, onAddMovie }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addedMovies, setAddedMovies] = useState(new Set()); // Track movies đã thêm

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      
      // 1. Tìm phim theo tên
      const movieResults = await searchMovies(searchQuery.trim());
      
      // 2. Tìm người (diễn viên/đạo diễn) theo tên
      const peopleResults = await searchPeople(searchQuery.trim());
      
      // 3. Lấy phim từ các người tìm được
      const moviesFromPeople = [];
      for (const person of peopleResults) {
        const personDetail = await getPersonDetail(person.id);
        const personMovies = personDetail?.known_for || [];

        if (personMovies && personMovies.length > 0) {
          moviesFromPeople.push(...personMovies);
        }
      }
      
      // 4. Merge và loại trùng (dựa vào id)
      const allMovies = [...movieResults, ...moviesFromPeople];
      const uniqueMovies = Array.from(
        new Map(allMovies.map(movie => [movie.id, movie])).values()
      );
      
      setSearchResults(uniqueMovies);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = (movie) => {
    onAddMovie(movie);
    setAddedMovies(prev => new Set([...prev, movie.id]));
  };

  const handleClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    setAddedMovies(new Set());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full h-fit max-h-[80vh] overflow-hidden flex flex-col shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-slate-100 dark:bg-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Add Favourite Movie
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search Section */}
        <div className="p-4 border-b dark:border-gray-700">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500 text-sm"
              autoFocus
            />
            <button 
              type="submit"
              disabled={loading}
              className="text-gray-700 dark:text-gray-200 px-4 py-1.5 rounded-md hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 font-medium border-2 border-gray-500 dark:border-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="max-h-96 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((movie) => {
                const isAdded = addedMovies.has(movie.id);
                const year = movie.year || (movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A');
                const posterUrl = movie.image || 'https://via.placeholder.com/60x90?text=No+Image';

                return (
                  <div 
                    key={movie.id} 
                    className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-gray-700 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    {/* Movie Poster */}
                    <img 
                      src={posterUrl} 
                      alt={movie.title}
                      className="w-12 h-18 object-cover rounded"
                    />
                    
                    {/* Movie Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                        {movie.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {year}
                      </p>
                    </div>

                    {/* Add Button */}
                    <button
                      onClick={() => handleAddClick(movie)}
                      disabled={isAdded}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isAdded 
                          ? 'bg-green-500 text-white cursor-default' 
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                      title={isAdded ? 'Added' : 'Add to favourites'}
                    >
                      {isAdded ? (
                        // Dấu tích
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        // Dấu cộng
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-2 opacity-50">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <p className="text-sm">Enter movie name and click Search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
