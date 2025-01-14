import { useEffect, useMemo, useState } from 'react';
import ApiService from '@/api/ApiService';

interface Source {
  name: string;
  id: number;
}

interface Category {
  name: string;
  id: number;
}

interface Author {
  name: string;
  id: number;
}

interface Article {
  id: number;
  title: string;
  content: string;
  source: Source;
  url: string;
  published_at: string;
  category: Category;
  author: Author;
  created_at: string;
  updated_at: string;
}

const useArticle = (id: string | undefined) => {
  const [article, setArticle] = useState<Article | null>(null);
  const apiService = useMemo(() => new ApiService(), []);

  useEffect(() => {
    apiService.setToken();

    if (id) {
      const fetchArticle = async () => {
        try {
          const data = await apiService.fetchData<Article>(`${process.env.NEXT_PUBLIC_API_HOST}/article/${id}`);
          setArticle(data);
        } catch (error) {
          console.error('Failed to fetch article', error);
        }
      };

      fetchArticle().then(() => {});
    }
  }, [apiService, id]);

  return article;
};

export default useArticle;
