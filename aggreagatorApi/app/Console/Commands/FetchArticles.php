<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use Carbon\Carbon;
use Illuminate\Console\Command;

class FetchArticles extends Command
{
    protected $signature = 'fetch:articles';
    protected $description = 'Fetch articles from various news APIs';

    private $fetchers;

    public function __construct(array $fetchers)
    {
        parent::__construct();
        $this->fetchers = $fetchers;
    }

    public function handle()
    {
        foreach ($this->fetchers as $fetcher) {
            $articles = $fetcher->fetchArticles();
            $this->storeArticles($articles);
        }
    }

    private function storeArticles($articles): void
    {

        foreach ($articles as $articleData) {

            if (Article::where('url', $articleData['url'])->exists()) {
                continue; // Skip this article if the URL already exists
            }

            $category = Category::firstOrCreate(['name' => $articleData['category'] ?? 'Uncategorized']);
            $source = Source::firstOrCreate(['name' => $articleData['source'] ?? 'Unknown source']);
            $author = Author::firstOrCreate(['name' => $articleData['author'] ?? 'Unknown author']);
            Article::updateOrCreate(
                ['url' => $articleData['url']],
                [
                    'title' => $articleData['title'] ?? 'No Title',
                    'content' => $articleData['content'] ?? 'No Content',
                    'source_id' => $source->id,
                    'author_id' => $author->id,
                    'published_at' => isset($articleData['publishedAt']) ? Carbon::parse($articleData['publishedAt'])->format('Y-m-d H:i:s') : null,
                    'category_id' => $category->id,
                ]
            );
        }
    }
}
