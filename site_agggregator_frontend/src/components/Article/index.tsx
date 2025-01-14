"use client";

import { useParams } from 'next/navigation';
import useArticle from '@/hooks/useArticle';

export default function Article(){
  const { id } = useParams();
  const article = useArticle(id?.toString());

  return (
    <div className="p-5">
      <h1 className="font-bold text-4xl">{article?.title}</h1>
      <div className="py-5" dangerouslySetInnerHTML={{ __html: article?.content || '' }} />
      <p><strong>Source:</strong> {article?.source.name}</p>
      <p><strong>Author:</strong> {article?.author.name}</p>
      <p><strong>Category:</strong> {article?.category.name}</p>
      <p><strong>Published at:</strong> {article?.published_at}</p>
    </div>
  );
};
