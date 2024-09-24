<?php

return [
    'name' => 'LaravelPWA',
    'manifest' => [
        'name' => env('APP_NAME', 'My PWA App'),
        'short_name' => 'PWA',
        'start_url' => '/',
        'background_color' => '#ffffff',
        'theme_color' => '#000000',
        'display' => 'standalone',
        'orientation'=> 'any',
        'status_bar'=> 'black',
        'icons' => [
            '72x72' => [
                'path' => '/storage/favicon/favicon_blanco.png',
                'purpose' => 'any'
            ],
            '96x96' => [
                'path' => '/storage/favicon/favicon_blanco.png',
                'purpose' => 'any'
            ],
            '128x128' => [
                'path' => '/storage/favicon/favicon_blanco.png',
                'purpose' => 'any'
            ],
            '144x144' => [
                'path' => '/storage/favicon/favicon_blanco.png',
                'purpose' => 'any'
            ],
            '152x152' => [
                'path' => '/storage/favicon/favicon_blanco.png',
                'purpose' => 'any'
            ],
            '192x192' => [
                'path' => '/storage/favicon/favicon_blanco.png',
                'purpose' => 'any'
            ],
            '384x384' => [
                'path' => '/storage/favicon/favicon_blanco.png',
                'purpose' => 'any'
            ],
            '512x512' => [
                'path' => '/storage/favicon/favicon_blanco.png',
                'purpose' => 'any'
            ],
        ],
        'splash' => [
            '640x1136' => '/storage/favicon/favicon_blanco.png',
            '750x1334' => '/storage/favicon/favicon_blanco.png',
            '828x1792' => '/storage/favicon/favicon_blanco.png',
            '1125x2436' => '/storage/favicon/favicon_blanco.png',
            '1242x2208' => '/storage/favicon/favicon_blanco.png',
            '1242x2688' => '/storage/favicon/favicon_blanco.png',
            '1536x2048' => '/storage/favicon/favicon_blanco.png',
            '1668x2224' => '/storage/favicon/favicon_blanco.png',
            '1668x2388' => '/storage/favicon/favicon_blanco.png',
            '2048x2732' => '/storage/favicon/favicon_blanco.png',
        ],
        'shortcuts' => [
            [
                'name' => 'Shortcut Link 1',
                'description' => 'Shortcut Link 1 Description',
                'url' => '/shortcutlink1',
                'icons' => [
                    "src" => "/images/icons/icon-72x72.png",
                    "purpose" => "any"
                ]
            ],
            [
                'name' => 'Shortcut Link 2',
                'description' => 'Shortcut Link 2 Description',
                'url' => '/shortcutlink2'
            ]
        ],
        'custom' => []
    ]
];
