import { Card } from "./ui/card";

const MovieCard = ({ movie, size = "normal" }) => {
  return (
    <div className="flex-shrink-0 cursor-pointer group transition-transform duration-300 hover:scale-110 hover:z-50 relative">
      <Card className="overflow-hidden border-0 p-0">
        <div className={`relative overflow-hidden ${size === "large" ? "w-[300px] h-[450px]" : "w-[360px] h-[300px]"
          }`}>
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Card>

      {/* Thông tin bên dưới - xuất hiện khi hover */}
      <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 mt-[-10px] px-2 w-[360px] absolute hover:z-1000 hover-w:[400px]">
        <p className="text-2xl font-semibold text-white py-2 px-3 rounded shadow-lg break-words bg-gray-900 dark:bg-gray-800">
          {movie.title} ({movie.year})
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
