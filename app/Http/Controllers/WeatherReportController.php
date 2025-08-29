<?php

namespace App\Http\Controllers;

use App\Models\WeatherReport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class WeatherReportController extends Controller
{
    public function index(Request $request)
    {

        $query = WeatherReport::query();

        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where('municipality', 'LIKE', "%{$searchTerm}%");
        }


        $reports = $query->latest('report_date')->paginate(10)->withQueryString();

        return Inertia::render('Weather/Index', [
            'reports' => $reports,

            'filters' => $request->only(['search']),
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'municipality'   => 'required|string|max:100',
            'sky_condition'  => 'nullable|string|max:100',
            'wind'           => 'nullable|string|max:100',
            'precipitation'  => 'nullable|string|max:100',
            'sea_condition'  => 'nullable|string|max:100',
        ]);


        $validated['report_date'] = $request->input('report_date', now());

        WeatherReport::create($validated);

        return Redirect::route('weather.index')
            ->with('success', 'Weather report added successfully!');
    }


    public function update(Request $request, WeatherReport $weather)
    {
        $validated = $request->validate([
            'municipality'   => 'required|string|max:100',
            'sky_condition'  => 'nullable|string|max:100',
            'wind'           => 'nullable|string|max:100',
            'precipitation'  => 'nullable|string|max:100',
            'sea_condition'  => 'nullable|string|max:100',
        ]);



        $weather->update($validated);

        return Redirect::route('weather.index')
            ->with('success', 'Weather report updated successfully!');
    }


    public function destroy(WeatherReport $weather)
    {
        $weather->delete();

        return Redirect::route('weather.index')
            ->with('success', 'Weather report deleted successfully!');
    }
}
