const API_BASE_URL = "https://34.124.214.214:2423";
const APP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    "x-app-token": APP_TOKEN 
  };
};

const fetchFromAPI = async (endpoint) => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!res.ok) {
      console.error(`Error ${res.status}: ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

// --- CÁC HÀM LẤY DỮ LIỆU ---

// 1. Lấy danh sách phim phổ biến (Most Popular)
// Dựa theo URL trong ảnh Postman: /api/movies/most-popular
export const getMostPopularMovies = async () => {
  const response = await fetchFromAPI("/api/movies/most-popular");
  // API trả về object dạng { title: "...", data: [...] } nên ta chỉ lấy mảng .data
  return response?.data || [];
};

// 2. Lấy danh sách phim rating cao 
export const getTopRatedMovies = async () => {
  const response = await fetchFromAPI("/api/movies/top-rated");
  return response?.data || [];
}

// 3. Helper: Lấy top 5 phim có danh thu cao nhất (tạm dùng rating)
export const getTopMovies = (movies, limit = 5) => {
  return [...movies]
    .sort((a, b) => (b.rate || 0) - (a.rate || 0)) 
    .slice(0, limit);
};

// 4. Tìm kiếm phim theo tên
export const searchMovies = async (query) => {
  if (!query) return [];
  const response = await fetchFromAPI(`/api/movies/search?title=${encodeURIComponent(query)}`);
  return response?.data || [];
};

// 5. Tìm người (Diễn viên/Đạo diễn) theo tên
export const searchPeople = async (query) => {
  if (!query) return [];
  // Limit 5 để lấy những người liên quan nhất
  const response = await fetchFromAPI(`/api/persons?q=${encodeURIComponent(query)}&limit=5`);
  console.log('People search response:', response);
  return response?.data || [];
};

// 6. Lấy chi tiết người (để lấy danh sách phim của họ)
export const getPersonDetail = async (personId) => {
  const response = await fetchFromAPI(`/api/persons/${personId}`);
  console.log(`Person detail for ID ${personId}:`, response.known_for);
  return response?.known_for || [];
};

// 7. Lấy chi tiết movie theo ID
export const getMovieDetail = async (movieId) => {
  const response = await fetchFromAPI(`/api/movies/${movieId}`);
  console.log('Movie detail response:', response);
  // API có thể trả về trực tiếp movie object hoặc { data: movie }
  return response?.data || response;
};
