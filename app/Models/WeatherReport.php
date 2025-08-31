<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo; // <-- Optional, but good practice to import

class WeatherReport extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'municipality',
        'sky_condition',
        'wind',
        'precipitation',
        'sea_condition',
        'report_date',
        'user_id', // Make sure this is in the array
    ];

    // --- ADD THIS FUNCTION ---
    /**
     * Get the user that owns the weather report.
     */
    public function user(): BelongsTo
    {
        // This line tells Laravel that this report "belongs to" a User,
        // and it can find that user by looking at the 'user_id' column.
        return $this->belongsTo(User::class);
    }


    public function editHistories()
    {
        return $this->hasMany(EditHistory::class)->latest(); // Order by most recent
    }
}
