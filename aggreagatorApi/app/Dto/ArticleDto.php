<?php

namespace App\Dto;

use Illuminate\Support\Facades\Date;

class ArticleDto
{
    public function __construct(
        public ?string $keyword,
        public ?Date $date,
        public ?int $category,
        public ?int $source,
        public ?int $author,
        public ?int $limit,
    )
    {}
}
