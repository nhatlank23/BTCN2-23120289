import { createContext, useState, useContext } from 'react';
import { loginUser, registerUser, logoutUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    return (storedUser && storedToken) ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    const result = await loginUser(username, password);
    
    if (result.success) {
      const userData = result.data.user;
      const authToken = result.data.token;
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', authToken);
      
      return { success: true };
    } else {
      return { success: false, error: result.error };
    }
  };

  const register = async (username, email, password, phone, dob) => {
    const result = await registerUser(username, email, password, phone, dob);
    
    if (result.success) {
      // Auto login after successful registration
      return await login(username, password);
    } else {
      return { success: false, error: result.error };
    }
  };

  const logout = () => {
    logoutUser(); // Call service to clean up
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
