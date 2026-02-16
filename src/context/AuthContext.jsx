import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const appUser = {
          uid: fbUser.uid,
          email: fbUser.email,
          name: fbUser.displayName || fbUser.email.split('@')[0],
        };
        setUser(appUser);

        
        const saved = localStorage.getItem(`watchlist_${fbUser.uid}`) || localStorage.getItem('watchlist');
        setWatchlist(saved ? JSON.parse(saved) : []);
        localStorage.setItem('netflixUser', JSON.stringify(appUser));
      } else {
        setUser(null);
        
        const savedGuest = localStorage.getItem('watchlist');
        setWatchlist(savedGuest ? JSON.parse(savedGuest) : []);
        localStorage.removeItem('netflixUser');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });

    const appUser = {
      uid: cred.user.uid,
      email: cred.user.email,
      name,
    };
    setUser(appUser);
    localStorage.setItem('netflixUser', JSON.stringify(appUser));
    return appUser;
  };

  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const fbUser = cred.user;
    const appUser = {
      uid: fbUser.uid,
      email: fbUser.email,
      name: fbUser.displayName || fbUser.email.split('@')[0],
    };
    setUser(appUser);
    localStorage.setItem('netflixUser', JSON.stringify(appUser));
    return appUser;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem('netflixUser');
  };

  const persistWatchlist = (list) => {
    if (user && user.uid) {
      localStorage.setItem(`watchlist_${user.uid}`, JSON.stringify(list));
    } else {
      localStorage.setItem('watchlist', JSON.stringify(list));
    }
  };

  const addToWatchlist = (movie) => {
    const exists = watchlist.some((item) => item.id === movie.id);
    if (!exists) {
      const newWatchlist = [...watchlist, movie];
      setWatchlist(newWatchlist);
      persistWatchlist(newWatchlist);
    }
  };

  const removeFromWatchlist = (movieId) => {
    const newWatchlist = watchlist.filter((item) => item.id !== movieId);
    setWatchlist(newWatchlist);
    persistWatchlist(newWatchlist);
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some((item) => String(item.id) === String(movieId));
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
