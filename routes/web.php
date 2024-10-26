<?php

use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SkillController; // Controlador de habilidades
use App\Http\Controllers\TranslationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Rutas públicas (sin autenticación)
Route::get('/', [PortfolioController::class, 'index'])->name('portfolio.home'); // Página principal del portafolio
Route::post('/', [PortfolioController::class, 'index']); // Manejo de formulario en la página principal
Route::post('/contact', [ContactController::class, 'enviarCorreo']); // Enviar correo desde el formulario de contacto
Route::get('/translations', [TranslationController::class, 'index']); // Obtener traducciones

// Rutas de proyectos (detalles accesibles públicamente)
Route::get('projects/details/{id}', [ProjectController::class, 'details'])->name('projects.details'); // Ver detalles de un proyecto

// Rutas protegidas (requieren autenticación y verificación de email)
Route::middleware(['auth', 'verified'])->group(function () {

    // Rutas de administración y estadísticas
    Route::get('/admin', [AnalyticsController::class, 'index'])->name('dashboard'); // Panel de administración
    Route::get('/statistics', [AnalyticsController::class, 'index'])->name('statistics'); // Estadísticas del usuario

    // Rutas de proyectos (CRUD completo)
    Route::prefix('projects')->name('projects.')->group(function () {
        Route::get('/', [ProjectController::class, 'index'])->name('index'); // Ver lista de proyectos
        Route::get('/create', [ProjectController::class, 'create'])->name('create'); // Formulario para crear un nuevo proyecto
        Route::post('/', [ProjectController::class, 'store'])->name('store'); // Almacenar un nuevo proyecto
        Route::get('/{project}', [ProjectController::class, 'show'])->name('show'); // Ver un proyecto específico
        Route::get('/{project}/edit', [ProjectController::class, 'edit'])->name('edit'); // Formulario para editar un proyecto
        Route::post('/{project}', [ProjectController::class, 'update'])->name('update'); // Actualizar un proyecto
        Route::delete('/{project}', [ProjectController::class, 'destroy'])->name('destroy'); // Eliminar un proyecto
    });

    // Rutas de habilidades (CRUD completo)
    Route::prefix('skills')->name('skills.')->group(function () {
        Route::get('/', [SkillController::class, 'index'])->name('index'); // Ver lista de habilidades
        Route::get('/create', [SkillController::class, 'create'])->name('create'); // Formulario para crear una habilidad
        Route::post('/', [SkillController::class, 'store'])->name('store'); // Almacenar una nueva habilidad
        Route::get('/{skill}', [SkillController::class, 'show'])->name('show'); // Ver una habilidad específica
        Route::get('/{skill}/edit', [SkillController::class, 'edit'])->name('edit'); // Formulario para editar una habilidad
        Route::post('/{skill}', [SkillController::class, 'update'])->name('update'); // Actualizar una habilidad
        Route::delete('/{skill}', [SkillController::class, 'destroy'])->name('destroy'); // Eliminar una habilidad
    });

    // Rutas de curriculum
    Route::prefix('curriculum')->name('curriculum.')->group(function () {
        Route::get('/', [CurriculumController::class, 'index'])->name('index'); // Ver curriculum
        Route::get('/banner', [CurriculumController::class, 'banner'])->name('banner'); // Ver banner del curriculum
    });

    // Rutas de blog
    Route::get('/blog', fn() => Inertia::render('Blog'))->name('blog'); // Página del blog

    // Rutas de mensajes (CRUD completo)
    Route::prefix('messages')->name('messages.')->group(function () {
        Route::get('/', [MessageController::class, 'index'])->name('index'); // Ver lista de mensajes
        Route::post('/', [MessageController::class, 'store'])->name('store'); // Crear un mensaje
        Route::put('/{message}', [MessageController::class, 'update'])->name('update'); // Actualizar un mensaje
        Route::delete('/{message}', [MessageController::class, 'destroy'])->name('destroy'); // Eliminar un mensaje
    });

    // Configuración de perfil
    Route::get('/profile-settings', fn() => Inertia::render('ProfileSettings'))->name('profile-settings'); // Configuración de perfil
});

// Rutas de perfil (requiere autenticación)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit'); // Editar perfil
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update'); // Actualizar perfil
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy'); // Eliminar perfil
});

// Archivo de rutas de autenticación (login, registro, etc.)
require __DIR__ . '/auth.php';
