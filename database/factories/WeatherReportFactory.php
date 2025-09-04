<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WeatherReport>
 */
class WeatherReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $skyConditions = ['Clear', 'Cloudy', 'Overcast', 'Rainy', 'Stormy'];
        $winds = ['Calm', 'Light Breeze', 'Moderate', 'Strong Wind', 'Gale'];
        $precipitations = ['None', 'Light Rain', 'Moderate Rain', 'Heavy Rain', 'Thunderstorm'];
        $seaConditions = ['Calm', 'Slight', 'Moderate', 'Rough', 'Very Rough'];

        return [
            'municipality' => $this->faker->city(), // generates random city names
            'sky_condition' => $this->faker->randomElement($skyConditions),
            'wind' => $this->faker->randomElement($winds),
            'precipitation' => $this->faker->randomElement($precipitations),
            'sea_condition' => $this->faker->randomElement($seaConditions),
            'report_date' => $this->faker->dateTimeThisYear(),
            'user_id' => \App\Models\User::factory(),
        ];
    }
}
