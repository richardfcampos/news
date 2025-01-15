<?php

use App\Console\Commands\FetchArticles;
use Illuminate\Support\Facades\Schedule;

//just for testing purposes we are adding everyMinute
Schedule::command(FetchArticles::class)->everyMinute();
