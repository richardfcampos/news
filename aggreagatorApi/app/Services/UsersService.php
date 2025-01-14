<?php

namespace App\Services;

use App\Http\Requests\SignUpRequest;
use App\Models\User;

class UsersService
{
    public function createUser(SignUpRequest $data)
    {
        return User::create([
            'name' => $data->name,
            'email' => $data->email,
            'password' => $data->password
        ]);
    }
}
