<?php

namespace App\Services;

use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use App\Models\User;
use App\Models\UserFilter;

class UserFilterService
{
    public function createOrUpdate(User $user, array $sources, array $categories, array $authors): ?UserFilter
    {
        if (empty($sources) && empty($categories) && empty($authors)) {
            return null;
        }

        $sourceCount = Source::whereIn('id', $sources)->count();
        $categoryCount = Category::whereIn('id', $categories)->count();
        $authorCount = Author::whereIn('id', $authors)->count();

        if ($sourceCount !== count($sources) || $categoryCount !== count($categories) || $authorCount !== count($authors)) {
            return null;
        }

        if (UserFilter::where('user_id', $user->id)->exists()) {
            UserFilter::where('user_id', $user->id)->update([
                'sources' => $sources,
                'categories' => $categories,
                'authors' => $authors,
            ]);

            return UserFilter::where('user_id', $user->id)->first();
        }

        return UserFilter::create([
            'user_id' => $user->id,
            'sources' => $sources ?? [],
            'categories' => $categories ?? [],
            'authors' => $authors ?? [],
        ]);
    }

    public function getByUserId(int $id)
    {
        return UserFilter::where('user_id', $id)->first();

    }
}
