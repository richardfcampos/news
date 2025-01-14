<?php

namespace App\Dto;

class SignUpDto
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password
    )
    {}
}
