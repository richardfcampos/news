<?php

namespace App\Http\Controllers;

use App\Dto\GetArticlesData;
use App\Http\Requests\GetArticlesRequest;
use App\Services\ArticlesService;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ArticlesController extends Controller
{
    protected ArticlesService $articlesService;

    public function __construct(ArticlesService $articlesService)
    {
        $this->articlesService = $articlesService;
    }


    /**
     * @throws ValidationException
     */
    public function getArticles(GetArticlesRequest $request): JsonResponse
    {
        $filters = new GetArticlesData($request->only(['keyword', 'date', 'category', 'author',  'source', 'limit']));
        $articles = $this->articlesService->getArticles($filters, $request->user());

        return response()->json($articles);
    }

    public function getArticle(int $id): JsonResponse
    {
        $article = $this->articlesService->getArticle($id);

        return response()->json($article);
    }
}
