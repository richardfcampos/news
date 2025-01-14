<?php

namespace App\Services;

use App\Dto\ArticleDto;
use App\Models\Article;
use App\Models\User;

class ArticlesService
{

    protected UserFilterService $userFilterService;
    public function __construct(UserFilterService $userFilterService)
    {
        $this->userFilterService = $userFilterService;
    }
    public function getArticles(ArticleDto $filters, User $user)
    {

        $userFilters = $this->userFilterService->getByUserId($user->id);

        $query = Article::filter([
            'keyword' => $filters->keyword,
            'date' => $filters->date,
            'category' => $filters->category,
            'source' => $filters->source,
            'author' => $filters->author,
        ]);

        if (!empty($userFilters->authors)) {
            $query->whereIn('author_id', $userFilters->authors);
        }

        if (!empty($userFilters->categories)) {
            $query->whereIn('category_id', $userFilters->categories);
        }

        if (!empty($userFilters->sources)) {
            $query->whereIn('source_id', $userFilters->sources);
        }

        return $query->paginate($filters->limit);
    }

    public function getArticle(int $id)
    {
        return Article::find($id);
    }
}
