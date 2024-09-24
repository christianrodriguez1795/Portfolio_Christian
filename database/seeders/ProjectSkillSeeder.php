<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Skill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtén todos los proyectos y habilidades
        $projects = Project::all();
        $skills = Skill::all();

        // Asocia habilidades aleatorias a cada proyecto
        foreach ($projects as $project) {
            // Selecciona un conjunto aleatorio de habilidades
            $randomSkills = $skills->random(rand(2, 5))->pluck('id'); // Asocia de 2 a 5 habilidades aleatorias

            // Asocia las habilidades al proyecto
            $project->skills()->attach($randomSkills);
        }
    }
}
