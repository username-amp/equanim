<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BreatheController extends Controller
{
    public function index()
    {
        return Inertia::render('breathe/index');
    }
} 