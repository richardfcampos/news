<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserFilter;

class UserFilterService
{
    public function createOrUpdate(User $user, array $sources, array $categories, array $authors): ?UserFilter
    {
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
