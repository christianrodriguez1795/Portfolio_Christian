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
        $response = $next($request);

        $sessionId = $request->session()->getId();
        $page = $request->path();
        $ipAddress = $request->ip();
        $userAgent = $request->userAgent();

        Visit::create([
            'session_id' => $sessionId,
            'page' => $page,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
        ]);

        return $response;
    }
}
