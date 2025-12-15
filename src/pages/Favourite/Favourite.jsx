import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchCard from '../../components/SearchCard';
import AddMovieModal from '../../components/AddMovieModal/AddMovieModal';
import { Button } from '../../components/ui/button';
import { getFavourites, addToFavourite, removeFromFavourite } from '../../services/favouriteService';

const Favourite = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedMovies, setSelectedMovies] = useState(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const moviesPerPage = 6;

  // Fetch favourites on mount
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    fetchFavourites();
  }, [navigate]);

  const fetchFavourites = async () => {
    setLoading(true);
    setError('');
    
    const result = await getFavourites();
    console.log('Fetch favourites result:', result);
    
    if (result.success) {
      console.log('Favourites data:', result.data);
      setMovies(result.data);
    } else {
      setError(result.error);
      // If token invalid, redirect to login
      if (result.error.includes('Token') || result.error.includes('đăng nhập')) {
        setTimeout(() => navigate('/login'), 2000);
      }
    }
    
    setLoading(false);
  };

  const handleAddMovie = async (movie) => {
    console.log('Adding movie:', movie);
    const result = await addToFavourite(movie.id);
    console.log('Add result:', result);
    
    if (result.success) {
      setSuccessMessage(`Added "${movie.title}" to your favourite list`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refresh the list
      await fetchFavourites();
      setIsModalOpen(false);
    } else {
      setError(result.error);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleToggleSelectMovie = (movieId) => {
    setSelectedMovies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(movieId)) {
        newSet.delete(movieId);
      } else {
        newSet.add(movieId);
      }
      return newSet;
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedMovies.size === 0) return;

    // Hiển thị popup xác nhận
    const confirmed = window.confirm(
      `Are you sure you want to remove ${selectedMovies.size} movie${selectedMovies.size > 1 ? 's' : ''} from your favourite list?`
    );
    
    if (!confirmed) return;

    setIsDeleting(true);
    setError('');

    let successCount = 0;
    let failCount = 0;

    for (const movieId of selectedMovies) {
      const result = await removeFromFavourite(movieId);
      if (result.success) {
        successCount++;
      } else {
        failCount++;
      }
    }

    if (successCount > 0) {
      setSuccessMessage(`Removed ${successCount} movie${successCount > 1 ? 's' : ''} from your favourite list`);
      setTimeout(() => setSuccessMessage(''), 3000);
      await fetchFavourites();
      setSelectedMovies(new Set());
    }

    if (failCount > 0) {
      setError(`Failed to remove ${failCount} movie${failCount > 1 ? 's' : ''}`);
      setTimeout(() => setError(''), 3000);
    }

    setIsDeleting(false);
  };

  // Tính toán pagination
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Header with Action Buttons */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Favourite Movies
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {movies.length} movie{movies.length !== 1 ? 's' : ''} in the list
              {selectedMovies.size > 0 && ` • ${selectedMovies.size} movie${selectedMovies.size !== 1 ? 's' : ''} selected`}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0255D1] hover:bg-[#774743] text-white w-24 h-10 text-md text-center flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add
            </Button>
            <Button
              onClick={handleDeleteSelected}
              disabled={selectedMovies.size === 0 || isDeleting}
              className={`${
                selectedMovies.size > 0 && !isDeleting
                  ? 'bg-red-500 hover:bg-red-200 text-white w-24 h-10 text-md text-center flex items-center justify-center'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed w-24 h-10 text-md text-center flex items-center justify-center'
              }`} 
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              {isDeleting ? 'Removing...' : 'Remove'}
            </Button>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      {movies.length === 0 ? (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No favourite movies yet.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Click "Add Movie" to add your favourite movies
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMovies.map((movie) => (
              <div key={movie.id} className="relative">
                <SearchCard movie={movie} />
                {/* Checkbox overlay */}
                <div className="absolute top-2 left-2">
                  <input
                    type="checkbox"
                    checked={selectedMovies.has(movie.id)}
                    onChange={() => handleToggleSelectMovie(movie.id)}
                    className="w-5 h-5 cursor-pointer accent-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 pt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Page {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}

      {/* Add Movie Modal */}
      <AddMovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddMovie={handleAddMovie}
      />
    </div>
  );
};

export default Favourite;
