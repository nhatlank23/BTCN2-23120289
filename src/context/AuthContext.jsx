import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    return (storedUser && storedToken) ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('API_URL/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      
      // Mock login - Replace with real API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      const mockUser = {
        id: 1,
        email: email,
        name: email.split('@')[0]
      };
      const mockToken = 'mock_token_' + Date.now();
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Đăng nhập thất bại' };
    }
  };

  const register = async (name, email, password) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('API_URL/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password })
      // });
      
      // Mock register - Replace with real API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful registration
      const mockUser = {
        id: 1,
        email: email,
        name: name
      };
      const mockToken = 'mock_token_' + Date.now();
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Đăng ký thất bại' };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
