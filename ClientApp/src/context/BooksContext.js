import { createContext, useContext, useState, useEffect } from "react";
import { service } from "../http/service";

const BooksContext = createContext(null);

const LOCAL_STORAGE_KEY = "nyt_bestsellers_books_data";
const CACHE_EXPIRY_KEY = "nyt_bestsellers_cache_expiry";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function BooksProvider({ children }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadFromCache = () => {
      try {
        const cachedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);

        if (cachedData && cacheExpiry) {
          const now = new Date().getTime();
          const expiry = parseInt(cacheExpiry, 10);

          // If cache is still valid, use it
          if (now < expiry) {
            const parsedData = JSON.parse(cachedData);
            setData(parsedData);
            setIsLoading(false);
            return true;
          } else {
            // Cache expired, remove it
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            localStorage.removeItem(CACHE_EXPIRY_KEY);
          }
        }
      } catch (err) {
        console.error("Error loading from cache:", err);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        localStorage.removeItem(CACHE_EXPIRY_KEY);
      }
      return false;
    };

    // Try to load from cache first
    const cacheValid = loadFromCache();

    // If cache is invalid or doesn't exist, fetch fresh data
    if (!cacheValid) {
      fetchBooks();
    }
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await service.getTopBooksBestSellingByDate();

      // Store in state
      const booksData = { data: response };
      setData(booksData);

      // Store in localStorage with expiry
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(booksData));
        const expiry = new Date().getTime() + CACHE_DURATION;
        localStorage.setItem(CACHE_EXPIRY_KEY, expiry.toString());
      } catch (storageError) {
        console.warn("Failed to save to localStorage:", storageError);
      }

      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError(err);
      setIsLoading(false);
    }
  };

  const refreshBooks = () => {
    // Clear cache and fetch fresh data
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(CACHE_EXPIRY_KEY);
    fetchBooks();
  };

  const value = {
    data,
    isLoading,
    error,
    refreshBooks,
    fetchBooks,
  };

  return (
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
}

