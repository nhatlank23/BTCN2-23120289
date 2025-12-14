import { Card } from "./ui/card";

const MovieCard = ({ movie, size = "normal" }) => {
  return (
    <div className="flex-shrink-0 cursor-pointer group transition-transform duration-300 hover:scale-110">
      <Card className="overflow-hidden border-0 p-0">
        <div className={`relative overflow-hidden ${
          size === "large" ? "w-[300px] h-[450px]" : "w-[360px] h-[300px]"
        }`}>
          <img 
            src={movie.image} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Thông tin bên dưới - xuất hiện khi hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 px-2">
          <p className="text-center font-semibold text-gray-900 dark:text-white">
            {movie.title} ({movie.year})
          </p>
        </div>
      </Card>
    </div>
  );
};

export default MovieCard;
