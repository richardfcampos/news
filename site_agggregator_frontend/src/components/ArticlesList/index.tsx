"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import usePagination from '@/hooks/usePagination';
import Pagination from '@/components/Pagination';
import { useArticles } from '@/context/ArticlesContext';

export default function ArticlesList() {
  const { articles, totalItems } = useArticles();
  const router = useRouter();
  const itemsPerPage = 15;

  const { currentPage, totalPages, totalRecords, goToPage, nextPage, prevPage, lastPage } = usePagination({
    totalItems,
    itemsPerPage,
  });

  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const handleCardClick = (id: number) => {
    router.push(`/article/${id}`);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map(article => (
          <div
            key={article.id}
            className="border p-4 rounded shadow cursor-pointer"
            onClick={() => handleCardClick(article.id)}
          >
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p>{truncateContent(article.content, 100)}</p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
        onPageChange={goToPage}
        nextPage={nextPage}
        prevPage={prevPage}
        lastPage={lastPage}
      />
    </div>
  );
}
