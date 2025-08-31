<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('weather_reports', function (Blueprint $table) {
            // Add the user_id column. It's foreign, constrained, and can be null.
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null')->after('id');
        });
    }

    public function down(): void
    {
        Schema::table('weather_reports', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
};
