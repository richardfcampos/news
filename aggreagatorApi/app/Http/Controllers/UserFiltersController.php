<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticlesUserFilters;
use App\Services\UserFilterService;

class UserFiltersController extends Controller
{

    private UserFilterService $userFilterService;
    public function __construct(UserFilterService $userFilterService)
    {
        $this->userFilterService = $userFilterService;
    }
    public function createOrUpdate(ArticlesUserFilters $request)
    {
        $data = $this->userFilterService->createOrUpdate(
            $request->user(),
            $request->get('sources'),
            $request->get('categories'),
            $request->get('authors')
        );

        return response()->json($data);
    }
}
