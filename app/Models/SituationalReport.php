<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SituationalReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'typhoon_name',
        'date',
        'typhoon_category',
    ];
}
