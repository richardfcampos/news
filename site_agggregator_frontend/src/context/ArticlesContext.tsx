"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import ApiService from '@/api/ApiService';

interface Article {
  id: number;
  title: string;
  content: string;
  source: string;
  url: string;
  published_at: string;
  category: number;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
}

interface Source {
  id: number;
  name: string;
}

interface Author {
  id: number;
  name: string;
}

interface ArticlesContextProps {
  articles: Article[];
  totalItems: number;
  categories: Category[];
  sources: Source[];
  authors: Author[];
  keyword: string;
  date: string;
  category: string;
  source: string;
  author: string;
  setKeyword: (keyword: string) => void;
  setDate: (date: string) => void;
  setCategory: (category: string) => void;
  setSource: (source: string) => void;
  setAuthor: (author: string) => void;
}

const ArticlesContext = createContext<ArticlesContextProps | undefined>(undefined);

export const ArticlesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [keyword, setKeyword] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  const apiService = useMemo(() => new ApiService(), []);

  useEffect(() => {
    apiService.setToken();
    const fetchArticles = async () => {
      try {
        const query = new URLSearchParams({
          keyword,
          date,
          category,
          source,
          author,
        }).toString();

        const data = await apiService.fetchData<{ data: Article[], total: number }>(
          `${process.env.NEXT_PUBLIC_API_HOST}/articles?${query}`
        );
        setArticles(data.data);
        setTotalItems(data.total);
      } catch (error) {
        console.error('Failed to fetch articles', error);
      }
    };
    fetchArticles();
  }, [keyword, date, category, source, author]);

  useEffect(() => {
    apiService.setToken();
    const fetchCategories = async () => {
      try {
        const data = await apiService.fetchData<Category[]>(`${process.env.NEXT_PUBLIC_API_HOST}/categories`);
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, [apiService]);

  useEffect(() => {
    apiService.setToken();
    const fetchSources = async () => {
      try {
        const data = await apiService.fetchData<Source[]>(`${process.env.NEXT_PUBLIC_API_HOST}/sources`);
        setSources(data);
      } catch (error) {
        console.error("Failed to fetch sources", error);
      }
    };

    fetchSources();
  }, [apiService]);

  useEffect(() => {
    apiService.setToken();
    const fetchAuthors = async () => {
      try {
        const data = await apiService.fetchData<Author[]>(`${process.env.NEXT_PUBLIC_API_HOST}/authors`);
        setAuthors(data);
      } catch (error) {
        console.error("Failed to fetch authors", error);
      }
    };

    fetchAuthors();
  }, [apiService]);

  return (
    <ArticlesContext.Provider value={{ articles, totalItems, categories, sources, authors, keyword, date, category, source, author, setKeyword, setDate, setCategory, setSource, setAuthor }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticlesProvider');
  }
  return context;
};
