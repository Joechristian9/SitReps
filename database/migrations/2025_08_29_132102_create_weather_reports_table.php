<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('weather_reports', function (Blueprint $table) {
            $table->id();
            $table->string('municipality');
            $table->string('sky_condition')->nullable();
            $table->string('wind')->nullable();
            $table->string('precipitation')->nullable();
            $table->string('sea_condition')->nullable();
            $table->timestamp('report_date')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weather_reports');
    }
};
