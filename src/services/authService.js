const API_BASE_URL = "https://34.124.214.214:2423";
const APP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    "x-app-token": APP_TOKEN 
  };
};

// Login API
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      return { 
        success: true, 
        data: {
          token: data.token,
          user: {
            id: data.user.id,
            username: data.user.username,
            email: data.user.email
          }
        }
      };
    } else {
      return { 
        success: false, 
        error: data.message || 'Đăng nhập thất bại' 
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: 'Đã xảy ra lỗi kết nối' 
    };
  }
};

// Register API
export const registerUser = async (username, email, password, phone = '', dob = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ 
        username, 
        email, 
        password,
        phone: phone || '',
        dob: dob || new Date().toISOString().split('T')[0]
      })
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      if (response.status === 409) {
        return { success: false, error: 'Tài khoản đã tồn tại' };
      }
      return { 
        success: false, 
        error: data.message || 'Đăng ký thất bại' 
      };
    }
  } catch (error) {
    console.error('Register error:', error);
    return { 
      success: false, 
      error: 'Đã xảy ra lỗi kết nối' 
    };
  }
};

// Logout (if API requires, otherwise just client-side)
export const logoutUser = async () => {
  // If your API has logout endpoint:
  // try {
  //   const token = localStorage.getItem('token');
  //   await fetch(`${API_BASE_URL}/api/users/logout`, {
  //     method: 'POST',
  //     headers: {
  //       ...getHeaders(),
  //       'Authorization': `Bearer ${token}`
  //     }
  //   });
  // } catch (error) {
  //   console.error('Logout error:', error);
  // }
  
  // Client-side logout
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Get User Profile
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return { 
        success: false, 
        error: 'Chưa đăng nhập' 
      };
    }

    const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
      method: 'GET',
      headers: {
        ...getHeaders(),
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      return { 
        success: true, 
        data: {
          id: data.id,
          username: data.username,
          email: data.email,
          phone: data.phone || '',
          dob: data.dob || '',
          role: data.role || 'user'
        }
      };
    } else {
      if (response.status === 403) {
        return { success: false, error: 'Token không hợp lệ hoặc đã hết hạn' };
      }
      return { 
        success: false, 
        error: data.message || 'Không thể lấy thông tin người dùng' 
      };
    }
  } catch (error) {
    console.error('Get profile error:', error);
    return { 
      success: false, 
      error: 'Đã xảy ra lỗi kết nối' 
    };
  }
};
