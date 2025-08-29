<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeatherReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'municipality',
        'sky_condition',
        'wind',
        'precipitation',
        'sea_condition',
        'report_date',
    ];
}
