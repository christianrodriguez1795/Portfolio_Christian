<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SkillController extends Controller
{
    // Función para agregar una nueva tecnología (habilidad)
    public function store(Request $request)
    {
        try {
            // Validar que el campo 'skills' sea un array y que cada habilidad tenga un nombre
            $request->validate([
                'skills' => 'required|array',
                'skills.*' => 'required|string|max:255',
            ]);

            // Recorrer el array de habilidades y crear cada una
            $skills = [];
            foreach ($request->skills as $skillName) {
                $skills[] = Skill::create(['name' => ucfirst(strtolower($skillName))]);
            }

            return response()->json(['success' => 'Habilidades creadas con éxito.', 'skills' => $skills], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Hubo un error al crear las habilidades. ' . $e->getMessage()], 500);
        }
    }

    // Función para eliminar una tecnología (habilidad) existente
    public function destroy($id)
    {
        try {
            // Encontrar la habilidad por su ID
            $skill = Skill::findOrFail($id);

            // Eliminar la habilidad
            $skill->delete();

            return response()->json(['success' => 'Habilidad eliminada con éxito.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Hubo un error al eliminar la habilidad. ' . $e->getMessage()], 500);
        }
    }

    // Función para obtener todas las tecnologías (habilidades)
    public function index()
    {
        try {
            $skills = Skill::all();
            return response()->json($skills);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener las habilidades. ' . $e->getMessage()], 500);
        }
    }
}
