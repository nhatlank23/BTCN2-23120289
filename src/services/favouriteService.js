const API_BASE_URL = "https://34.124.214.214:2423";
const APP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    "Content-Type": "application/json",
    "x-app-token": APP_TOKEN,
    ...(token && { "Authorization": `Bearer ${token}` })
  };
};

/**
 * Get user's favourite movies
 * GET /api/users/favorites
 */
export const getFavourites = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/favorites`, {
      method: 'GET',
      headers: getHeaders()
    });

    const data = await response.json();
    console.log('getFavourites API response:', data);

    if (response.ok) {
      // API có thể trả về { favorites: [...] } hoặc { data: { favorites: [...] } } hoặc trực tiếp [...]
      const favourites = data.favorites || data.data?.favorites || data.data || data || [];
      console.log('Parsed favourites:', favourites);
      return { 
        success: true, 
        data: favourites
      };
    } else {
      return { 
        success: false, 
        error: data.message || 'Không thể tải danh sách yêu thích' 
      };
    }
  } catch (error) {
    console.error('Get favourites error:', error);
    return { 
      success: false, 
      error: 'Lỗi kết nối. Vui lòng thử lại sau.' 
    };
  }
};

/**
 * Add movie to favourites
 * POST /api/users/favorites/{movieId}
 */
export const addToFavourite = async (movieId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/favorites/${movieId}`, {
      method: 'POST',
      headers: getHeaders()
    });

    const data = await response.json();

    if (response.ok) {
      return { 
        success: true, 
        message: 'Đã thêm vào danh sách yêu thích' 
      };
    } else {
      return { 
        success: false, 
        error: data.message || 'Không thể thêm phim' 
      };
    }
  } catch (error) {
    console.error('Add to favourite error:', error);
    return { 
      success: false, 
      error: 'Lỗi kết nối. Vui lòng thử lại sau.' 
    };
  }
};

/**
 * Remove movie from favourites
 * DELETE /api/users/favorites/{movieId}
 */
export const removeFromFavourite = async (movieId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/favorites/${movieId}`, {
      method: 'DELETE',
      headers: getHeaders()
    });

    const data = await response.json();

    if (response.ok) {
      return { 
        success: true, 
        message: 'Đã xóa khỏi danh sách yêu thích' 
      };
    } else {
      return { 
        success: false, 
        error: data.message || 'Không thể xóa phim' 
      };
    }
  } catch (error) {
    console.error('Remove from favourite error:', error);
    return { 
      success: false, 
      error: 'Lỗi kết nối. Vui lòng thử lại sau.' 
    };
  }
};
