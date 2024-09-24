<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::where('user_id', auth()->id())->with('skills')->get();
        return Inertia::render('Projects/Index', ['projects' => $projects]);
    }

    public function create()
    {
        // Obtén todas las habilidades disponibles
        $skills = Skill::all();

        return Inertia::render('Projects/Create', ['skills' => $skills]);
    }

    public function store(Request $request)
    {
        try {
            // Validación
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'url' => 'nullable|url',
                'image' => 'nullable|image|max:20048',
                // 'skill_id' => 'required|array',
                'skill_id.*' => 'exists:skills,id',
            ]);

            // Creación del proyecto
            $project = new Project($request->all());
            $project->user_id = auth()->id();

            if ($request->hasFile('image')) {
                // Obtén el archivo de la imagen
                $imageFile = $request->file('image');

                // Define la ruta de almacenamiento
                $projectFolderPath = '/storage/projects/' . $project->id . '/images';
                $imageName = 'portada-' . $project->id . '.' . $imageFile->getClientOriginalExtension();

                // Verifica si el directorio ya existe, si no, créalo
                if (!Storage::exists($projectFolderPath)) {
                    Storage::makeDirectory($projectFolderPath);
                }

                // Almacena la nueva imagen en la carpeta especificada
                $path = $imageFile->storeAs($projectFolderPath, $imageName, 'public');

                // Guarda la nueva ruta de la imagen en la base de datos
                $project->image = '/storage/' . $path;
                $project->save();
            }

            $project->save();

            // Decodificación del array de skills desde JSON si es necesario
            $skillIds = json_decode($request->input('skill_id', '[]'), true);

            // Verificación de que $skillIds es un array
            if (is_array($skillIds)) {
                foreach ($skillIds as $skillId) {
                    $project->skills()->attach($skillId);
                }
            }

            return response()->json(['success' => 'Proyecto creado con éxito.']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Mensajes de validación
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Mensaje de excepción general
            return response()->json(['error' => 'Hubo un error al crear el proyecto. Inténtalo de nuevo más tarde. ' . $e->getMessage()], 500);
        }
    }


    public function edit(Project $project)
    {

        // Obtén todas las habilidades disponibles
        $skills = Skill::all();

        // Incluye las habilidades asociadas con el proyecto
        $project->load('skills');

        return Inertia::render('Projects/Edit', [
            'project' => $project,
            'skills' => $skills,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        try {
            // Validación
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'url' => 'nullable|url',
                'image' => 'nullable|image|max:20048',
                // 'skill_id' => 'required|array',
                'skill_id.*' => 'exists:skills,id',
            ]);

            // Actualización del proyecto con los datos validados
            $project->fill($request->only(['title', 'description', 'url']));

            if ($request->hasFile('image')) {
                // Obtén el archivo de la imagen
                $imageFile = $request->file('image');

                // Define la ruta de almacenamiento
                $projectFolderPath = '/storage/projects/' . $project->id . '/images';
                $imageName = 'portada-' . $project->id . '.' . $imageFile->getClientOriginalExtension();

                // Verifica si el directorio ya existe, si no, créalo
                if (!Storage::exists($projectFolderPath)) {
                    Storage::makeDirectory($projectFolderPath);
                }

                // Elimina la imagen antigua si existe
                if ($project->image) {
                    // Construye la ruta completa de la imagen antigua
                    $oldImagePath = 'public/' . $project->image;

                    // Elimina el archivo si existe
                    if (Storage::exists($oldImagePath)) {
                        Storage::delete($oldImagePath);
                    }
                }

                // Almacena la nueva imagen en la carpeta especificada
                $path = $imageFile->storeAs($projectFolderPath, $imageName, 'public');

                // Guarda la nueva ruta de la imagen en la base de datos
                $project->image = '/storage/' . $path;
            }

            $project->save();

            // Decodificación del array de skills desde JSON si es necesario
            $skillIds = json_decode($request->input('skill_id', '[]'), true);

            // Verificación de que $skillIds es un array y actualización de las habilidades asociadas al proyecto
            if (is_array($skillIds)) {
                $project->skills()->sync($skillIds);
            }

            return response()->json(['success' => 'Proyecto actualizado con éxito.']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Mensajes de validación
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Mensaje de excepción general
            return response()->json(['error' => 'Hubo un error al actualizar el proyecto. Inténtalo de nuevo más tarde. ' . $e->getMessage()], 500);
        }
    }


    public function destroy(Request $request, Project $project)
    {
        try {
            // Elimina las habilidades asociadas al proyecto
            $project->skills()->detach();

            // Elimina la imagen si existe
            if ($project->image) {
                // Construye la ruta completa de la imagen
                $imagePath = 'public/' . $project->image;

                // Elimina el archivo si existe
                if (Storage::exists($imagePath)) {
                    Storage::delete($imagePath);
                }
            }

            // Elimina el directorio del proyecto si está vacío
            $projectFolderPath = 'projects/' . $project->id . '/images';
            if (Storage::exists($projectFolderPath) && !Storage::files($projectFolderPath)) {
                Storage::deleteDirectory($projectFolderPath);
            }

            // Elimina el proyecto de la base de datos
            $project->delete();

            return response()->json(['success' => 'Proyecto eliminado con éxito.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Hubo un error al eliminar el proyecto. Inténtalo de nuevo más tarde. ' . $e->getMessage()], 500);
        }
    }
}
