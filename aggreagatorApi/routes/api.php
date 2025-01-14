<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorsController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\SourcesController;
use App\Http\Controllers\UserFiltersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function() {
    Route::get('user', function (Request $request) {
        return response()->json($request->user());
    });

    Route::get('verify-token', function (Request $request) {
        return response()->json(['message' => 'Token is authenticated'], 200);
    });

    Route::get('articles', [ArticlesController::class, 'getArticles']);

    Route::get('article/{id}', [ArticlesController::class, 'getArticle']);

    Route::get('categories', [CategoriesController::class, 'getCategories']);

    Route::get('sources', [SourcesController::class, 'getSources']);

    Route::get('authors', [AuthorsController::class, 'getAuthor']);

    Route::post('custom-feed', [UserFiltersController::class, 'createOrUpdate']);

});



Route::post('/login', [AuthController::class, 'login']);

Route::post('/sign-up', [AuthController::class, 'signup']);
