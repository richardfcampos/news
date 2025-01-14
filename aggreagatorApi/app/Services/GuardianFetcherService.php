<?php

namespace App\Services;

use App\Services\Interfaces\ArticleFetcherInterface;
use Illuminate\Support\Facades\Http;

class GuardianFetcherService implements ArticleFetcherInterface
{
    public function fetchArticles(): array
    {
        $response = Http::get('https://content.guardianapis.com/search', [
            'q' => 'news',
            'show-fields' => 'body,byline',
            'api-key' => env('GUARDIAN_API_KEY'),
        ]);

        $data = $response->json();
        $articles = $data['response']['results'] ?? [];
        return $this->normalizeArticles($articles);
    }

    private function normalizeArticles(array $articles): array
    {
        return array_map(function ($article) {
            return [
                'url' => $article['webUrl'] ?? null,
                'title' => $article['webTitle'] ?? null,
                'content' => $article['fields']['body'] ?? null,
                'publishedAt' => $article['webPublicationDate'] ?? null,
                'category' => $article['sectionName'] ?? null,
                'source' => 'The Guardian',
                'author' => $article['fields']['byline'] ?? null,
            ];
        }, $articles);
    }
}
