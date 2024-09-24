<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SkillsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skills = [
            ['name' => 'JavaScript'],
            ['name' => 'PHP'],
            ['name' => 'Laravel'],
            ['name' => 'React'],
            ['name' => 'Vue.js'],
            ['name' => 'Node.js'],
            ['name' => 'CSS'],
            ['name' => 'HTML'],
            ['name' => 'Python'],
            ['name' => 'Django'],
            ['name' => 'SQL'],
            ['name' => 'MySQL'],
            ['name' => 'PostgreSQL'],
            ['name' => 'MongoDB'],
            ['name' => 'Git'],
            ['name' => 'Docker'],
            ['name' => 'Kubernetes'],
            ['name' => 'AWS'],
            ['name' => 'Azure'],
            ['name' => 'Google Cloud'],
            ['name' => 'TypeScript'],
            ['name' => 'SASS'],
            ['name' => 'LESS'],
            ['name' => 'Bootstrap'],
            ['name' => 'Tailwind CSS'],
            ['name' => 'Webpack'],
            ['name' => 'Babel'],
            ['name' => 'GraphQL'],
            ['name' => 'REST APIs'],
            ['name' => 'Jenkins'],
            ['name' => 'CI/CD'],
            ['name' => 'Agile'],
            ['name' => 'Scrum'],
            ['name' => 'JIRA'],
            ['name' => 'Trello'],
            ['name' => 'Redux'],
            ['name' => 'MobX'],
            ['name' => 'Express.js'],
            ['name' => 'Flask'],
            ['name' => 'Ruby on Rails'],
            ['name' => 'Java'],
            ['name' => 'Spring Boot'],
            ['name' => 'C#'],
            ['name' => '.NET'],
            ['name' => 'C++'],
            ['name' => 'Rust'],
            ['name' => 'Go'],
            ['name' => 'Swift'],
            ['name' => 'Kotlin'],
            ['name' => 'Flutter'],
            ['name' => 'React Native'],
            ['name' => 'Electron'],
            ['name' => 'TensorFlow'],
            ['name' => 'PyTorch'],
            ['name' => 'Machine Learning'],
            ['name' => 'Artificial Intelligence'],
            ['name' => 'Blockchain'],
            ['name' => 'Solidity'],
            ['name' => 'Ethereum'],
            ['name' => 'Bitcoin'],
            ['name' => 'Smart Contracts'],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }
    }
}
