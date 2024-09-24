<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Message as MailMessage;

class ContactController extends Controller
{
    public function enviarCorreo(Request $request)
    {
        // Validar la solicitud
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // Guardar el mensaje en la base de datos
        $message = new Message();
        $message->name = $request->name;
        $message->email = $request->email;
        $message->subject = $request->subject;
        $message->message = $request->message;
        $message->save();

        // Enviar el correo electrónico
        try {
            $data = [
                'name' => $request->name,
                'email' => $request->email,
                'subject' => $request->subject,
                'userMessage' => $request->message,
            ];

            Mail::send('emails.contact', $data, function ($mail) use ($request) {
                $mail->to('christian.rodriguez.1795@gmail.com')
                    ->subject($request->subject);
            });

            Log::info('Correo enviado correctamente.');
            return response()->json(['success' => 'Mensaje enviado correctamente.']);
        } catch (\Exception $e) {
            Log::error('Error al enviar el correo: ' . $e->getMessage());
            return response()->json(['error' => 'Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde. ' . $e->getMessage()], 500);
        }
    }
}
