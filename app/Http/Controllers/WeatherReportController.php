<?php

namespace App\Http\Controllers;

use App\Models\WeatherReport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

class WeatherReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Eager load the 'user' (last updater) and 'editHistories.user' (full history) relationships
        // This is crucial for performance and for sending complete data to the frontend.
        $query = WeatherReport::with(['user', 'editHistories.user']);

        // Handle search functionality
        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where('municipality', 'LIKE', "%{$searchTerm}%");
        }

        // Paginate the results and ensure search filters are maintained on pagination links
        $reports = $query->latest('updated_at')->paginate(10)->withQueryString();

        return Inertia::render('Weather/Index', [
            'reports' => $reports,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Enforce that all fields are required
        $validated = $request->validate([
            'municipality'   => 'required|string|max:100',
            'sky_condition'  => 'required|string|max:100',
            'wind'           => 'required|string|max:100',
            'precipitation'  => 'required|string|max:100',
            'sea_condition'  => 'required|string|max:100',
        ]);

        // Set the report date and assign the current user's ID
        $validated['report_date'] = now();
        $validated['user_id'] = Auth::id();

        // Create the report
        $report = WeatherReport::create($validated);

        // Create the first entry in the edit history log for this report
        $report->editHistories()->create(['user_id' => Auth::id()]);

        return Redirect::route('weather.index')
            ->with('success', 'Weather report added successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WeatherReport $weather)
    {
        // Enforce that all fields are required on update as well
        $validated = $request->validate([
            'municipality'   => 'required|string|max:100',
            'sky_condition'  => 'required|string|max:100',
            'wind'           => 'required|string|max:100',
            'precipitation'  => 'required|string|max:100',
            'sea_condition'  => 'required|string|max:100',
        ]);

        // Update the 'user_id' to reflect the last person who edited the report
        $validated['user_id'] = Auth::id();

        // Update the report details
        $weather->update($validated);

        // Create a new entry in the edit history log for this update
        $weather->editHistories()->create(['user_id' => Auth::id()]);

        return Redirect::route('weather.index')
            ->with('success', 'Weather report updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WeatherReport $weather)
    {
        $weather->delete();

        return Redirect::route('weather.index')
            ->with('success', 'Weather report deleted successfully!');
    }
}
