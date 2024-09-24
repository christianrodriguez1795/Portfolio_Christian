<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'title' => 'Portfolio',
            'description' => 'Este es el proyecto del porfolio que se esta visitando.',
            'url' => $this->faker->url,
            'image' => '/storage/proyectos/imagenes/Portfolio-Portfolio.png',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
