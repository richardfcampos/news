<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Category;
use App\Models\Source;

class AuthorsController extends Controller
{
    public function getAuthor()
    {
        return response()->json(Author::orderBy('name')->get());
    }
}
