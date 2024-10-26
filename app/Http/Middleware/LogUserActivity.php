<?php

namespace App\Http\Middleware;

use App\Models\Visit;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LogUserActivity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // $response = $next($request);

        // $sessionId = $request->session()->getId();
        // $page = $request->path();
        // $ipAddress = $request->ip();
        // $userAgent = $request->userAgent();

        // Visit::create([
        //     'session_id' => $sessionId,
        //     'page' => $page,
        //     'ip_address' => $ipAddress,
        //     'user_agent' => $userAgent,
        // ]);

        // return $response;

        $response = $next($request);

        // Lista de rutas que deseas registrar
        $allowedPages = [
            '/',                    // Portfolio
            'admin',                // Panel de control
            'projects',             // Proyectos
            'curriculum',           // Curriculum
            'blog',                 // Blog
        ];

        // Obtener la ruta actual
        $currentPage = $request->path();

        // Verificar si la página actual está en la lista de rutas permitidas
        if (in_array($currentPage, $allowedPages)) {
            $sessionId = $request->session()->getId();
            $ipAddress = $request->ip();
            $userAgent = $request->userAgent();

            // Registrar la visita
            Visit::create([
                'session_id' => $sessionId,
                'page' => ucfirst($currentPage),
                'ip_address' => $ipAddress,
                'user_agent' => $userAgent,
            ]);
        }

        return $response;
    }
}
