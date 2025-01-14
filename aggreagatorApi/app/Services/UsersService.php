<?php

namespace App\Services;

use App\Dto\LoginDto;
use App\Dto\SignUpDto;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersService
{
    public function createUser(SignUpDto $data)
    {
        return User::create([
            'name' => $data->name,
            'email' => $data->email,
            'password' => $data->password
        ]);
    }

    public function login(LoginDto $dto)
    {
        $user = User::where('email', $dto->email)->first();

        if (!$user || !Hash::check($dto->password, $user->password)) {
            throw new \Exception('Invalid credentials');
        }

        $token = $user->createToken('api-token')->plainTextToken;

         return [...$user->toArray(), ...['token' => $token]];

    }
}
