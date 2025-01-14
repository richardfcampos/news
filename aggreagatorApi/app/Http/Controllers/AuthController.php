<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Services\UsersService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    protected UsersService $usersService;

    public function __construct(UsersService $usersService)
    {
        $this->usersService = $usersService;
    }


    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $data = $this->usersService->login($request->toDto());

            return response()->json($data);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

    }

    public function signup(SignUpRequest $request): JsonResponse
    {
        $user = $this->usersService->createUser($request->toDto());
        return response()->json($user);

    }
}
