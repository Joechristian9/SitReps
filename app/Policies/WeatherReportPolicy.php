<?php

namespace App\Policies;

use App\Models\User;
use App\Models\WeatherReport;
use Illuminate\Auth\Access\Response;

class WeatherReportPolicy
{
    /**
     * Determine whether the user can update the model.
     * Only the user who originally created the report can update it.
     * You can add admin-level permissions here as well.
     */
    public function update(User $user, WeatherReport $weatherReport): bool
    {
        // This rule allows the report's original author to update it.
        // To allow an admin to update any report, you could add:
        // return $user->id === $weatherReport->user_id || $user->isAdmin();
        return $user->id === $weatherReport->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     * Only the user who originally created the report can delete it.
     */
    public function delete(User $user, WeatherReport $weatherReport): bool
    {
        return $user->id === $weatherReport->user_id;
    }
}
