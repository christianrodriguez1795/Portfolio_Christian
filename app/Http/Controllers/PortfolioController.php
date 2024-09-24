<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;

class PortfolioController extends Controller
{   
    public function index(Request $request)
    {
        // Obtener todos los proyectos sin paginación
        $proyectos = Project::with('skills')->get();
        
        return Inertia::render('Portfolio', ['proyectos' => $proyectos]);
    }

    public function enviarCorreo(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        $message = Message::create([
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
        ]);

        Mail::raw($request->message, function ($mail) use ($request) {
            $mail->from($request->email, $request->name);
            $mail->to('christian.rodriguez.1795@gmail.com')->subject('New Contact Message');
        });

        return redirect()->back()->with('success', 'Message sent successfully!');
    }
}
