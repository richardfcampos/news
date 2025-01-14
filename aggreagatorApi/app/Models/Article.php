<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'content',
        'url',
        'source',
        'published_at',
        'category_id',
        'source_id',
        'author_id',
    ];

    protected $with = ['category', 'source', 'author'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function source()
    {
        return $this->belongsTo(Source::class);
    }

    public function author()
    {
        return $this->belongsTo(Author::class);
    }


    public function scopeFilter(Builder $query, array $filters): Builder
    {
        if (isset($filters['keyword'])) {
            $query->whereRaw("MATCH(title, content) AGAINST(? IN NATURAL LANGUAGE MODE)", [$filters['keyword']]);
        }

        if (isset($filters['date'])) {
            $query->whereDate('published_at', $filters['date']);
        }

        if (isset($filters['category'])) {
            $query->where('category_id', $filters['category']);
        }

        if (isset($filters['source'])) {
            $query->where('source_id', $filters['source']);
        }

        if (isset($filters['author'])) {
            $query->where('author_id', $filters['author']);
        }

        return $query;
    }
}
