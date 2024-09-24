<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear el rol de administrador
        $adminRole = Role::create(['name' => 'admin']);

        // Crear el usuario
        $adminUser = User::create([
            'name' => 'Christian',
            'email' => 'christian.rodriguez.1795@gmail.com',
            'password' => Hash::make('admin'),
        ]);

        // Asignar el rol de administrador al usuario
        $adminUser->assignRole($adminRole);
    }
}
