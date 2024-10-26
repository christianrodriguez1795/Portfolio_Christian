<?php

namespace App\Http\Controllers;


use App\Models\Project;
use App\Models\ProjectDetail;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::where('user_id', auth()->id())->with('skills')->get();
        return Inertia::render('Projects/Index', ['projects' => $projects]);
    }

    public function details($id)
    {
        $project = Project::where('id', $id)
            ->with('skills', 'details')->first();
        return Inertia::render('Projects/Details', ['project' => $project]);
    }

    public function create()
    {
        // Obtén todas las habilidades disponibles
        $skills = Skill::orderBy('name', 'asc')->get();

        return Inertia::render('Projects/Create', ['skills' => $skills]);
    }

    public function store(Request $request)
    {
        try {
            // Validación
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'urlGitHub' => 'nullable|url',
                'urlSitio' => 'nullable|url',
                'image' => 'nullable|image|max:2048',
                'skill_id.*' => 'exists:skills,id',
                // 'details' => 'required|array',
            ]);

            // Creación del proyecto
            $project = new Project($request->all());
            $project->user_id = auth()->id();

            // Manejo de imagen
            if ($request->hasFile('image')) {
                $imageFile = $request->file('image');
                $projectFolderPath = 'projects/' . $project->id . '/images';
                $imageName = 'portada-' . $project->id . '.' . $imageFile->getClientOriginalExtension();

                if (!Storage::disk('public')->exists($projectFolderPath)) {
                    Storage::disk('public')->makeDirectory($projectFolderPath);
                }
                $path = $imageFile->storeAs($projectFolderPath, $imageName, 'public');
                $project->image = '/storage/' . $path;
            }

            $project->save();

            // Decodificación de skills
            $skillIds = json_decode($request->input('skill_id', '[]'), true);
            if (is_array($skillIds)) {
                foreach ($skillIds as $skillId) {
                    $project->skills()->attach($skillId);
                }
            }

            // Manejo de detalles
            $details = $request->input('details', []);

            if ($details) {
                Log::info('Detalles recibidos:', ['request' => $request->all()]);
                Log::info('Detalles recibidos:', ['details' => $details]);
                ProjectDetail::create([
                    'project_id' => $project->id,
                    // 'details' => json_encode($details),
                    'details' => $details,

                ]);
            }

            return response()->json(['success' => 'Proyecto creado con éxito.']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Hubo un error al crear el proyecto. Inténtalo de nuevo más tarde. ' . $e->getMessage()], 500);
        }
    }

    public function edit(Project $project)
    {

        // Obtén todas las habilidades disponibles
        $skills = Skill::orderBy('name', 'asc')->get();

        // Incluye las habilidades asociadas con el proyecto
        $project->load('skills');
        $project->load('details');

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
                'urlGitHub' => 'nullable|url',
                'urlSitio' => 'nullable|url',
                'image' => 'nullable|image|max:2048',
                'skill_id.*' => 'exists:skills,id',
            ]);

            // Ajustar los campos opcionales para que se guarden como null si están vacíos
            $data = $request->only(['title', 'description', 'urlGitHub', 'urlSitio']);

            // Verificar si los campos existen en la solicitud, y si no, asignarles null
            $data['urlGitHub'] = array_key_exists('urlGitHub', $data) ? ($data['urlGitHub'] ?: null) : null;
            $data['urlSitio'] = array_key_exists('urlSitio', $data) ? ($data['urlSitio'] ?: null) : null;

            // Actualización del proyecto con los datos validados
            $project->fill($data);

            // Manejo de imagen
            if ($request->hasFile('image')) {
                $imageFile = $request->file('image');
                $projectFolderPath = 'projects/' . $project->id . '/images';
                $imageName = 'portada-' . $project->id . '.' . $imageFile->getClientOriginalExtension();

                // Crear el directorio si no existe
                if (!Storage::disk('public')->exists($projectFolderPath)) {
                    Storage::disk('public')->makeDirectory($projectFolderPath);
                }

                // Eliminar la imagen antigua si existe
                if ($project->image) {
                    $oldImagePath = 'public/' . $project->image;
                    if (Storage::disk('public')->exists($oldImagePath)) {
                        Storage::disk('public')->delete($oldImagePath);
                    }
                }

                // Almacenar la nueva imagen
                $path = $imageFile->storeAs($projectFolderPath, $imageName, 'public');
                $project->image = '/storage/' . $path;
            }

            // Guardar cambios del proyecto
            $project->save();

            // Actualizar las skills asociadas
            $skillIds = json_decode($request->input('skill_id', '[]'), true);
            if (is_array($skillIds)) {
                $project->skills()->sync($skillIds);
            }

            // Manejo de detalles del proyecto
            $details = $request->input('details', []);
            if ($details) {
                Log::info('Detalles recibidos actualizacion:', ['details' => $details]);
                // Si ya hay detalles asociados al proyecto, los eliminamos antes de agregar los nuevos
                $project->details()->delete();

                // Crear los nuevos detalles
                ProjectDetail::create([
                    'project_id' => $project->id,
                    // 'details' => $details, // Guardar como JSON
                    'details' => $details, // Guardar como JSON
                ]);
            }

            return response()->json(['success' => 'Proyecto actualizado con éxito.']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Mensajes de validación
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Log detallado del error general
            Log::error('Error al actualizar el proyecto:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
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
