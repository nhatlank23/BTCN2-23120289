import { Card } from "./ui/card";

const MovieCard = ({ movie, size = "normal" }) => {
  return (
    <Card className="flex-shrink-0 cursor-pointer group overflow-hidden border-0">
      <div className={`relative overflow-hidden ${
        size === "large" ? "w-[300px] h-[450px]" : "w-[200px] h-[300px]"
      }`}>
        <img 
          src={movie.image} 
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-bold text-lg mb-1 line-clamp-2">{movie.title}</h3>
            <div className="flex justify-between items-center text-sm">
              <span>{movie.year}</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                {movie.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
