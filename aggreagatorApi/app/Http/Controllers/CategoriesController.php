<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoriesController extends Controller
{
    public function getCategories()
    {
        return response()->json(Category::orderBy('name')->get());
    }
}
