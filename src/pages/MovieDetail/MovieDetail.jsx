import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '../../services/movieService';
import { Link } from 'react-router-dom';
import ReviewItem from '../../components/ReviewItem';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showFullPlot, setShowFullPlot] = useState(false);
    const [currentActorPage, setCurrentActorPage] = useState(1);
    const actorsPerPage = 3;

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
                {/* Left: Poster + Cast */}
                <div className="md:col-span-1 space-y-6">
                    <img
                        src={movie.image}
                        alt={movie.title}
                        className="w-full rounded-lg shadow-lg"
                    />

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
                                                    className="w-full aspect-square rounded-full object-cover"
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
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Chưa có thông tin diễn viên</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Details */}
                <div className="md:col-span-2 space-y-6">
                    {/* Rating */}
                    {movie.ratings?.imDb && (
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
                        </div>
                    )}

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
                                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition mt-2 font-medium"
                                    >
                                        {showFullPlot ? 'Thu gọn' : 'Xem thêm'}
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p className="text-gray-500 dark:text-gray-400">Chưa có mô tả cho phim này</p>
                            </div>
                        )}
                    </div>

                    {/* Reviews Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            Reviews {movie.reviews && movie.reviews.length > 0 && `(${movie.reviews.length})`}
                        </h2>
                        {movie.reviews && movie.reviews.length > 0 ? (
                            <div className="space-y-4">
                                {movie.reviews.map((review) => (
                                    <ReviewItem key={review.id} review={review} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p className="text-gray-500 dark:text-gray-400">Chưa có review nào cho phim này</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
