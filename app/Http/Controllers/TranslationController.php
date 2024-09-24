<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Lang;

class TranslationController extends Controller
{
    public function index(Request $request)
    {
        $locale = $request->get('locale', App::getLocale());
        App::setLocale($locale);

        $translations = Lang::get('*');

        return response()->json($translations);
    }
}

