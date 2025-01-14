<?php

namespace App\Services;

use App\Services\Interfaces\ArticleFetcherInterface;
use Illuminate\Support\Facades\Http;

class NewsAPIFetcherService implements ArticleFetcherInterface
{

    public function fetchArticles(): array
    {
        $response = Http::get('https://eventregistry.org/api/v1/article/getArticles', [
            'keyword' => 'news',
            'apiKey' => env('NEWS_API_KEY'),
            'includeArticleCategories' => 'true',
        ]);
        $data = $response->json();
        if (!isset($data['articles']) || !isset($data['articles']['results'])) {
            return [];
        }
        $articles = $data['articles']['results'] ?? [];
        return $this->normalizeArticles($articles);
    }

    private function normalizeArticles(array $articles): array
    {
        return array_map(function ($article) {
            return [
                'url' => $article['url'] ?? null,
                'title' => $article['title'] ?? null,
                'content' => $article['body'] ?? null,
                'publishedAt' => $article['date'] ?? null,
                'category' => $article['categories'][0]['name'] ?? null,
                'source' => $article['source']['title'] ?? null,
                'author' => $article['author']['name'] ?? null,
            ];
        }, $articles);
    }
}
