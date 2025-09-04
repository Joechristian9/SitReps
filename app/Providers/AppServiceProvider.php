<?php

namespace App\Providers;

use App\Models\WeatherReport;
use App\Policies\WeatherReportPolicy;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    protected $policies = [
        WeatherReport::class => WeatherReportPolicy::class, // Add this line
    ];

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
