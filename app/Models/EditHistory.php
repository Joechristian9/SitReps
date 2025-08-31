<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EditHistory extends Model
{
    use HasFactory;

    protected $fillable = ['weather_report_id', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function weatherReport()
    {
        return $this->belongsTo(WeatherReport::class);
    }
}
