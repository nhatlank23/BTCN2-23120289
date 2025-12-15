import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPersonDetail } from '../../services/movieService';
import { Card } from '@/components/ui/card';

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    const fetchPersonDetail = async () => {
      try {
        setLoading(true);
        const data = await getPersonDetail(id);
        setPerson(data);
      } catch (error) {
        console.error('Error fetching person detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-xl text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-xl text-gray-600 dark:text-gray-400">Person not found</p>
      </div>
    );
  }
  console.log('Person detail:', person);

  // Format ngày sinh từ ISO string sang dd/mm/yyyy
  const formatBirthDate = (isoDate) => {
    if (!isoDate) return null;
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Kiểm tra nếu tiểu sử dài hơn 300 ký tự
  const bioLimit = 300;
  const needsTruncate = person?.summary && person.summary.length > bioLimit;
  const displayBio = needsTruncate && !showFullBio 
    ? person.summary.slice(0, bioLimit) + '...' 
    : person?.summary;

  return (
    <div className="space-y-8">
      {/* Person Header */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Person Image */}
        {person.image && (
          <div className="flex-shrink-0">
            <img
              src={person.image}
              alt={person.name}
              className="w-full md:w-64 rounded-lg shadow-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
              }}
            />
          </div>
        )}

        {/* Person Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {person.name}
          </h1>

          {person.role && (
            <p className="text-lg text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Vai trò:</span> {person.role}
            </p>
          )}

          {person.summary && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Tiểu sử
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {displayBio}
              </p>
              {needsTruncate && (
                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition text-sm font-medium"
                >
                  {showFullBio ? 'Thu gọn' : 'Xem thêm'}
                </button>
              )}
            </div>
          )}

          {person.birth_date && (
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Ngày sinh:</span> {formatBirthDate(person.birth_date)}
            </p>
          )}
        </div>
      </div>

      {/* Known For Movies */}
      {person.known_for && person.known_for.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Nổi tiếng với các phim
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {person.known_for.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 p-0">
                  <div className="relative aspect-[2/3]">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-sm font-semibold line-clamp-2">
                          {movie.title}
                        </p>
                        {movie.year && (
                          <p className="text-white/80 text-xs">{movie.year}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonDetail;