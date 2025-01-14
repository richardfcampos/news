<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use App\Services\UsersService;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    protected UsersService $usersService;

    public function __construct(UsersService $usersService)
    {
        $this->usersService = $usersService;
    }


    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        // Verify password
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Create token
        $token = $user->createToken('api-token')->plainTextToken;

        // Return token
        return response()->json([...$user->toArray(), ...['token' => $token]]);
    }

    public function signup(SignUpRequest $request)
    {
        $user = $this->usersService->createUser($request);
        return response()->json($user);

    }
}
