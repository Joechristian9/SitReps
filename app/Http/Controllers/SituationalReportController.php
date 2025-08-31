<?php

namespace App\Http\Controllers;

use App\Models\SituationalReport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SituationalReportController extends Controller
{
    public function index()
    {
        return Inertia::render('SituationalReport/Index', [
            'reports' => SituationalReport::latest()->paginate(10)
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'typhoon_name' => 'required|string|max:255',
            'date' => 'required|date',
            'typhoon_category' => 'required|string|max:255',
        ]);

        SituationalReport::create($request->all());

        return redirect()->back()->with('success', 'Situational report created successfully.');
    }

    public function update(Request $request, SituationalReport $situationalReport)
    {
        $request->validate([
            'typhoon_name' => 'required|string|max:255',
            'date' => 'required|date',
            'typhoon_category' => 'required|string|max:255',
        ]);

        $situationalReport->update($request->all());

        return redirect()->back()->with('success', 'Situational report updated successfully.');
    }
}
