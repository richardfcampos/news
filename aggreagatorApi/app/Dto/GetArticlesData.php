<?php

namespace App\Dto;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class GetArticlesData
{
    public string|null $keyword;
    public string|null $date;
    public int|null $category;
    public int|null $source;
    public int|null $author;
    public int $limit;

    public function __construct(array $data)
    {
        $validator = Validator::make($data, [
            'keyword' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'category' => 'nullable|int',
            'source' => 'nullable|int',
            'author' => 'nullable|int',
            'limit' => 'nullable|integer|min:1|max:100',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $this->keyword = $data['keyword'] ?? null;
        $this->date = $data['date'] ?? null;
        $this->category = $data['category'] ?? null;
        $this->source = $data['source'] ?? null;
        $this->author = $data['author'] ?? null;
        $this->limit = $data['limit'] ?? 15;
    }
}
