<?php

namespace App\Services;

use App\Services\Interfaces\ArticleFetcherInterface;
use Illuminate\Support\Facades\Http;

class NYTimesFetcherService implements ArticleFetcherInterface
{
    public function fetchArticles(): array
    {
        $response = Http::get('https://api.nytimes.com/svc/search/v2/articlesearch.json', [
            'q' => 'news',
            'api-key' => env('NYTIMES_API_KEY'),
        ]);

        $data = $response->json();
        $articles = $data['response']['docs'] ?? [];
        return $this->normalizeArticles($articles);
    }

    private function normalizeArticles(array $articles): array
    {
        return array_map(function ($article) {
            $author = $article['byline']['original'] ?? '';
            return [
                'url' => $article['web_url'] ?? null,
                'title' => $article['headline']['main'] ?? null,
                'content' => $article['lead_paragraph'] ?? null,
                'publishedAt' => $article['pub_date'] ?? null,
                'category' => $article['section_name'] ?? null,
                'source' =>  $article['source'] ?? null,
                'author' => str_replace('By ','',  $author) ?? null,
            ];
        }, $articles);
    }

}
