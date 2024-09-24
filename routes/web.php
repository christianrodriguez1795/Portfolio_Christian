<?php

use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TranslationController;

Route::get('/translations', [TranslationController::class, 'index']);

// Route::get('/', function () {
//     return Inertia::render('Portfolio', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [PortfolioController::class, 'index'])->name('portfolio.home');
Route::post('/', [PortfolioController::class, 'index']);
Route::post('/contact', [ContactController::class, 'enviarCorreo']);

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', [AnalyticsController::class, 'index'])->name('dashboard');    
    Route::resource('projects', ProjectController::class);
    Route::resource('curriculum', CurriculumController::class);
    Route::get('/blog', fn () => Inertia::render('Blog'))->name('blog');
    Route::get('/messages', fn () => Inertia::render('Messages'))->name('messages');
    // Route::get('/statistics', fn () => Inertia::render('Statistics'))->name('statistics');
    Route::get('/statistics', [AnalyticsController::class, 'index'])->name('statistics');
    Route::get('/profile-settings', fn () => Inertia::render('ProfileSettings'))->name('profile-settings');

    Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
    Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');
    Route::put('/messages/{message}', [MessageController::class, 'update'])->name('messages.update');
    Route::delete('/messages/{message}', [MessageController::class, 'destroy'])->name('messages.destroy');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
