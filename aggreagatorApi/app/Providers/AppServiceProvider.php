<?php

namespace App\Providers;

use App\Console\Commands\FetchArticles;
use App\Services\GuardianFetcherService;
use App\Services\NewsAPIFetcherService;
use App\Services\NYTimesFetcherService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(FetchArticles::class, function ($app) {
            return new FetchArticles([
                new NewsAPIFetcherService(),
                new GuardianFetcherService(),
                new NYTimesFetcherService(),
            ]);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
