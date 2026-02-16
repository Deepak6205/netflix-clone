import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('netflixUser');
    const savedWatchlist = localStorage.getItem('watchlist');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Simple validation (in real app, verify with backend)
    if (email && password.length >= 6) {
      const newUser = {
        id: Date.now(),
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
      localStorage.setItem('netflixUser', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const signup = (name, email, password) => {
    if (name && email && password.length >= 6) {
      const newUser = {
        id: Date.now(),
        email,
        name,
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
      localStorage.setItem('netflixUser', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('netflixUser');
  };

  const addToWatchlist = (movie) => {
    const exists = watchlist.some(item => item.id === movie.id);
    if (!exists) {
      const newWatchlist = [...watchlist, movie];
      setWatchlist(newWatchlist);
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
    }
  };

  const removeFromWatchlist = (movieId) => {
    const newWatchlist = watchlist.filter(item => item.id !== movieId);
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(item => item.id === movieId);
  };

  const value = {
    user,
    isLoading,
    watchlist,
    login,
    signup,
    logout,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
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
