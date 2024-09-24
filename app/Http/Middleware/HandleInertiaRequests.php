<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\File;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'translations' => function () {
                $locale = app()->getLocale();
                return $this->loadTranslations($locale);
            },
        ]);
    }

    /**
     * Load translations for the given locale.
     *
     * @param string $locale
     * @return array
     */
    private function loadTranslations(string $locale): array
    {
        $path = base_path("lang/{$locale}");
        $translations = [];

        // Load PHP files
        foreach (File::allFiles($path) as $file) {
            if ($file->getExtension() === 'php') {
                $key = $file->getFilenameWithoutExtension();
                $translations[$key] = require $file->getPathname();
            }
        }

        // Load JSON file
        $jsonPath = base_path("lang/{$locale}.json");
        if (File::exists($jsonPath)) {
            $translations = array_merge($translations, json_decode(File::get($jsonPath), true));
        }

        return $translations;
    }
}
