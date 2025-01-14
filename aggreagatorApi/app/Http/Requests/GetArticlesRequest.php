<?php

namespace App\Http\Requests;

use App\Dto\ArticleDto;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class GetArticlesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
        'keyword' => 'nullable|string|max:255',
        'date' => 'nullable|date',
        'category' => 'nullable|integer',
        'author' => 'nullable|integer',
        'source' => 'nullable|integer',
        'limit' => 'nullable|integer|min:1|max:100',
        ];
    }

    public function toDto():ArticleDto
    {
        return new ArticleDto(
            keyword: $this->keyword,
            date: $this->date,
            category: $this->category,
            source: $this->source,
            author: $this->author,
            limit: $this->limit
        );
    }
}
