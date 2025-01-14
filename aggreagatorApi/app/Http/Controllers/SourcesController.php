<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Source;

class SourcesController extends Controller
{
    public function getSources()
    {
        return response()->json(Source::orderBy('name')->get());
    }
}
