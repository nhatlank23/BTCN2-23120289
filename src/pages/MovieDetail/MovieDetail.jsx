import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetail } from '../../services/movieService';
import { Link } from 'react-router-dom';
import ReviewItem from '../../components/ReviewItem';
import { getFavourites, addToFavourite, removeFromFavourite } from '../../services/favouriteService';

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showFullPlot, setShowFullPlot] = useState(false);
    const [currentActorPage, setCurrentActorPage] = useState(1);
    const [currentReviewPage, setCurrentReviewPage] = useState(1);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [isFavourite, setIsFavourite] = useState(false);
    const [favouriteLoading, setFavouriteLoading] = useState(false);
    const [message, setMessage] = useState('');
    const actorsPerPage = 3;
    const reviewsPerPage = 4;
    const isLoggedIn = !!localStorage.getItem('token');

    const handleMouseMove = (e) => {
        setTooltipPosition({
            x: e.clientX + 15,
            y: e.clientY + 15
        });
    };

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

    // Check if movie is in favourites
    useEffect(() => {
        const checkIfFavourite = async () => {
            if (!isLoggedIn) return;
            
            const result = await getFavourites();
            if (result.success) {
                const inFavourites = result.data.some(fav => String(fav.id) === String(id));
                setIsFavourite(inFavourites);
            }
        };

        if (movie) {
            checkIfFavourite();
        }
    }, [id, isLoggedIn, movie]);

    const handleToggleFavourite = async () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        setFavouriteLoading(true);
        setMessage('');

        try {
            if (isFavourite) {
                const result = await removeFromFavourite(id);
                if (result.success) {
                    setIsFavourite(false);
                    setMessage('Removed from favourites');
                } else {
                    setMessage(result.error || 'Failed to remove');
                }
            } else {
                const result = await addToFavourite(id);
                if (result.success) {
                    setIsFavourite(true);
                    setMessage('Added to favourites');
                } else {
                    setMessage(result.error || 'Failed to add');
                }
            }
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error toggling favourite:', error);
            setMessage('An error occurred');
            setTimeout(() => setMessage(''), 3000);
        } finally {
            setFavouriteLoading(false);
        }
    };

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
            {/* Success/Error Message */}
            {message && (
                <div className={`px-4 py-3 rounded-lg text-sm ${
                    message.includes('error') || message.includes('An error') || message.includes('Failed')
                        ? 'bg-red-50 border border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
                        : 'bg-green-50 border border-green-200 text-green-600 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
                }`}>
                    {message}
                </div>
            )}

            {/* Header: Title and Year */}
            <div className="border-b pb-4 border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                            {movie.title}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                            {movie.year}
                        </p>
                    </div>
                    
                    {/* Favourite Button */}
                    <button
                        onClick={handleToggleFavourite}
                        disabled={favouriteLoading}
                        className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                            !isLoggedIn
                                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                                : isFavourite
                                    ? 'bg-green-500 hover:bg-green-600 hover:scale-110'
                                    : 'bg-blue-500 hover:bg-blue-600 hover:scale-110'
                        }`}
                        title={!isLoggedIn ? 'Login to add favourite' : isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                    >
                        {favouriteLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        ) : isFavourite ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        )}
                        
                        {/* Hover tooltip */}
                        {isLoggedIn && (
                            <span className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 ${
                                isFavourite 
                                    ? 'bg-red-600 text-white' 
                                    : 'bg-gray-900 text-white'
                            } text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
                                {isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content: Image + Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left: Poster + Cast */}
                <div className="md:col-span-1 space-y-6">
                    {/* Poster with fixed aspect ratio */}
                    <div 
                        className="w-full aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg relative"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        onMouseMove={handleMouseMove}
                    >
                        <img
                            src={movie.image}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                            }}
                        />
                    </div>

                    {/* Tooltip theo chuột */}
                    {showTooltip && (
                        <div 
                            className="fixed z-50 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none"
                            style={{
                                left: `${tooltipPosition.x}px`,
                                top: `${tooltipPosition.y}px`,
                                transform: 'translate(-50%, -100%)'
                            }}
                        >
                            Image of {movie.title}
                        </div>
                    )}

                    {/* Cast */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Casts
                        </h2>
                        {movie.actors && movie.actors.length > 0 ? (
                            <>
                                <div className="grid grid-cols-3 gap-3">
                                    {movie.actors
                                        .slice((currentActorPage - 1) * actorsPerPage, currentActorPage * actorsPerPage)
                                        .map((actor, index) => (
                                            <Link
                                                key={index}
                                                to={`/person/${actor.id}`}
                                                className="flex flex-col items-center gap-2 hover:opacity-80 transition"
                                            >
                                                <img
                                                    src={actor.image}
                                                    alt={actor.name}
                                                    className="w-full aspect-square rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                                    }}
                                                />
                                                <span className="text-xs text-center font-medium text-gray-700 dark:text-gray-300 line-clamp-2">
                                                    {actor.name}
                                                </span>
                                            </Link>
                                        ))}
                                </div>
                                {movie.actors.length > actorsPerPage && (
                                    <div className="mt-4 flex justify-center items-center gap-2">
                                        <button
                                            onClick={() => setCurrentActorPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentActorPage === 1}
                                            className="p-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {currentActorPage} / {Math.ceil(movie.actors.length / actorsPerPage)}
                                        </span>
                                        <button
                                            onClick={() => setCurrentActorPage(prev => Math.min(Math.ceil(movie.actors.length / actorsPerPage), prev + 1))}
                                            disabled={currentActorPage === Math.ceil(movie.actors.length / actorsPerPage)}
                                            className="p-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p className="text-gray-500 dark:text-gray-400 text-sm">No cast information available</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Details */}
                <div className="md:col-span-2 space-y-6">
                    {/* Rating */}
                    <div>
                        {movie.ratings?.imDb ? (
                            <div className="flex items-center gap-2">
                                <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {movie.ratings.imDb}/10
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                                    (IMDb)
                                </span>
                            </div>
                        ) : (
                            <div className="text-gray-500 dark:text-gray-400">
                                <strong>Rating:</strong> No data available
                            </div>
                        )}
                    </div>

                    {/* Runtime */}
                    <div>
                        <span className="text-gray-700 dark:text-gray-300">
                            <strong>Runtime:</strong> {movie.runtime || 'No data available'}
                        </span>
                    </div>

                    {/* Genres */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Genres
                        </h2>
                        {movie.genres && movie.genres.length > 0 ? (
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
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No data available</p>
                        )}
                    </div>

                    {/* Directors */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Directors
                        </h2>
                        {movie.directors && movie.directors.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {movie.directors.map((director, index) => (
                                    <Link
                                        key={index}
                                        to={`/person/${director.id}`}
                                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                                    >
                                        {director.name}
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No data available</p>
                        )}
                    </div>

                    {/* Plot */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Plot
                        </h2>
                        {movie.plot_full ? (
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
                                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition mt-2 font-medium cursor-pointer"
                                    >
                                        {showFullPlot ? 'Show less' : 'Show more'}
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p className="text-gray-500 dark:text-gray-400">No plot description available</p>
                            </div>
                        )}
                    </div>

                    {/* Reviews Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            Reviews {movie.reviews && movie.reviews.length > 0 && `(${movie.reviews.length})`}
                        </h2>
                        {movie.reviews && movie.reviews.length > 0 ? (
                            <>
                                <div className="space-y-4">
                                    {movie.reviews
                                        .slice((currentReviewPage - 1) * reviewsPerPage, currentReviewPage * reviewsPerPage)
                                        .map((review) => (
                                            <ReviewItem key={review.id} review={review} />
                                        ))}
                                </div>
                                
                                {/* Pagination */}
                                {movie.reviews.length > reviewsPerPage && (
                                    <div className="mt-6 flex justify-center items-center gap-2">
                                        <button
                                            onClick={() => setCurrentReviewPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentReviewPage === 1}
                                            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {currentReviewPage} / {Math.ceil(movie.reviews.length / reviewsPerPage)}
                                        </span>
                                        <button
                                            onClick={() => setCurrentReviewPage(prev => Math.min(Math.ceil(movie.reviews.length / reviewsPerPage), prev + 1))}
                                            disabled={currentReviewPage === Math.ceil(movie.reviews.length / reviewsPerPage)}
                                            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p className="text-gray-500 dark:text-gray-400">No reviews available for this movie</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
