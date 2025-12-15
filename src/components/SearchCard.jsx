import { Card } from "./ui/card";
import { Link } from 'react-router-dom';

const SearchCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow p-0 cursor-pointer">
        {/* Poster Image */}
        <div className="relative w-full h-[400px] overflow-hidden">
          <img 
            src={movie.image} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

      {/* Movie Info */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h3 className="font-bold text-xl text-center text-gray-900 dark:text-white line-clamp-2">
          {movie.title} ({movie.year})
        </h3>

        {/* Genres */}
        {movie.genres && movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {movie.genres.map((genre, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
    </Link>
  );
};

export default SearchCard;
