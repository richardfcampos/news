<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetArticlesRequest;
use App\Services\ArticlesService;
use Illuminate\Http\JsonResponse;

class ArticlesController extends Controller
{
    protected ArticlesService $articlesService;

    public function __construct(ArticlesService $articlesService)
    {
        $this->articlesService = $articlesService;
    }


    public function getArticles(GetArticlesRequest $request): JsonResponse
    {
        $articles = $this->articlesService->getArticles($request->toDto(), $request->user());

        return response()->json($articles);
    }

    public function getArticle(int $id): JsonResponse
    {
        $article = $this->articlesService->getArticle($id);

        return response()->json($article);
    }
}
