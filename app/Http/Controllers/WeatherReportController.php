<?php

namespace App\Http\Controllers;

use App\Models\WeatherReport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class WeatherReportController extends Controller
{
    /**
     * Display a listing of the resource.
     * Renders the main page showing all weather reports.
     */
    public function index(Request $request)
    {
        // Start a query on the WeatherReport model, eager loading relationships for performance.
        $query = WeatherReport::with(['user', 'editHistories.user']);

        // Add a search filter if a 'search' term is present in the URL.
        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where('municipality', 'LIKE', "%{$searchTerm}%");
        }

        // Get the final results, ordered by the most recently updated, and paginate them.
        $reports = $query->latest('updated_at')->paginate(10)->withQueryString();

        // Render the Inertia component and pass the reports and filters as props.
        return Inertia::render('SituationOverview/Index', [
            'reports' => $reports,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 1. Validate the data coming from the form.
        // CORRECTED: 'nullable' is used for fields that are not required, matching the database schema.
        $validated = $request->validate([
            'municipality'   => 'required|string|max:100',
            'sky_condition'  => 'nullable|string|max:100',
            'wind'           => 'nullable|string|max:100',
            'precipitation'  => 'nullable|string|max:100',
            'sea_condition'  => 'nullable|string|max:100',
        ]);

        try {
            // 2. Add the authenticated user's ID.
            // REMOVED: `report_date` is now handled automatically by the database via `useCurrent()` in the migration.
            $validated['user_id'] = Auth::id();

            // 3. Create the new WeatherReport record.
            $report = WeatherReport::create($validated);
        } catch (\Exception $e) {
            // If creation fails, log the error and return with a user-friendly message.
            Log::error('Weather Report Creation Failed: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Could not save the report. Please try again.']);
        }

        // 4. Create the first log entry in the edit history for the new report.
        $report->editHistories()->create(['user_id' => Auth::id()]);

        // 5. Redirect the user back to the main reports page with a success message.
        return Redirect::route('situational-reports.index')
            ->with('success', 'Weather report added successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WeatherReport $weather)
    {
        // ADDED: Authorize that the current user is allowed to update this report.
        // This requires a WeatherReportPolicy to be created.
        $this->authorize('update', $weather);

        // 1. Validate the incoming data.
        // CORRECTED: 'nullable' is used for fields that are not required.
        $validated = $request->validate([
            'municipality'   => 'required|string|max:100',
            'sky_condition'  => 'nullable|string|max:100',
            'wind'           => 'nullable|string|max:100',
            'precipitation'  => 'nullable|string|max:100',
            'sea_condition'  => 'nullable|string|max:100',
        ]);

        // 2. Update the 'user_id' to track the last person who edited the report.
        $validated['user_id'] = Auth::id();

        // 3. Update the report's details in the database.
        $weather->update($validated);

        // 4. Create a new entry in the edit history log for this update.
        $weather->editHistories()->create(['user_id' => Auth::id()]);

        // 5. Redirect back to the main page with a success message.
        return Redirect::route('situational-reports.index')
            ->with('success', 'Weather report updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WeatherReport $weather)
    {
        // ADDED: Authorize that the current user is allowed to delete this report.
        $this->authorize('delete', $weather);

        // Delete the report from the database.
        $weather->delete();

        // Redirect back to the main page with a success message.
        return Redirect::route('situational-reports.index')
            ->with('success', 'Weather report deleted successfully!');
    }
}
