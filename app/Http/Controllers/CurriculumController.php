<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CurriculumController extends Controller
{
    public function index()
    {
        // $projects = Project::where('user_id', auth()->id())->get();
        return Inertia::render('Curriculum/Index');
    }

    // public function create()
    // {
    //     return Inertia::render('Projects/Create');
    // }

    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'title' => 'required|string|max:255',
    //         'description' => 'required|string',
    //         'url' => 'nullable|url',
    //         'image' => 'nullable|image|max:2048',
    //     ]);

    //     $project = new Project($request->all());
    //     $project->user_id = auth()->id();

    //     if ($request->hasFile('image')) {
    //         $project->image = $request->file('image')->store('projects', 'public');
    //     }

    //     $project->save();

    //     return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    // }

    // public function edit(Project $project)
    // {
    //     return Inertia::render('Projects/Edit', ['project' => $project]);
    // }

    // public function update(Request $request, Project $project)
    // {
    //     $request->validate([
    //         'title' => 'required|string|max:255',
    //         'description' => 'required|string',
    //         'url' => 'nullable|url',
    //         'image' => 'nullable|image|max:2048',
    //     ]);

    //     $project->fill($request->all());

    //     if ($request->hasFile('image')) {
    //         $project->image = $request->file('image')->store('projects', 'public');
    //     }

    //     $project->save();

    //     return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    // }

    // public function destroy(Project $project)
    // {
    //     $project->delete();
    //     return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    // }
}
