<?php

namespace App\Services;

use App\Dto\GetArticlesData;
use App\Models\Article;
use App\Models\User;

class ArticlesService
{

    protected UserFilterService $userFilterService;
    public function __construct(UserFilterService $userFilterService)
    {
        $this->userFilterService = $userFilterService;
    }
    public function getArticles(GetArticlesData $filters, User $user)
    {
        $filters = $this->userFilterService->getByUserId($user->id);
        return Article::filter([
            'keyword' => $filters->keyword,
            'date' => $filters->date,
            'category' => $filters->category,
            'source' => $filters->source,
            'author' => $filters->author,
        ])
            ->whereNotIn('author_id', $filters->authors)
            ->whereNotIn('category_id', $filters->categories)
            ->whereNotIn('source_id', $filters->sources)
            ->paginate($filters->limit);
    }

    public function getArticle(int $id)
    {
        return Article::find($id);
    }
}
