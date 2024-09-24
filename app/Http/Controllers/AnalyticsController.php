<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index(Request $request)
    {
        $visits = Visit::selectRaw('page, COUNT(*) as visits')
            ->groupBy('page')
            ->get()
            ->toArray();

        return Inertia::render('Dashboard', [
            'visits' => $visits
        ]);
    }
}
