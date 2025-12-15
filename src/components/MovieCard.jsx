import { Card } from "./ui/card";
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, size = "normal" }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="flex-shrink-0 cursor-pointer group transition-transform duration-300 hover:scale-120 hover:z-50 relative">
      <Card className={`overflow-hidden border-0 p-0 ${size === "large" ? "rounded-lg" : ""}`}>
        <div className={`relative overflow-hidden ${size === "large" ? "w-[300px] h-[450px] rounded-lg" : "w-[360px] h-[300px]"
          }`}>
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          {size === "large" && (
            <div className="absolute rounded-lg inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-lg font-semibold line-clamp-2">
                  {movie.title}
                </p>
                {movie.year && (
                  <p className="text-white/80 text-sm">{movie.year}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Thông tin bên dưới - xuất hiện khi hover */}
      <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 mt-[-10px] px-2 w-[360px] absolute hover:z-1000 hover-w:[400px]">
        <p className="text-2xl font-semibold text-white py-2 px-3 rounded shadow-lg break-words bg-gray-900 dark:bg-gray-800">
          {movie.title} ({movie.year})
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
