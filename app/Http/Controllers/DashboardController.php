<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(): \Inertia\Response
    {
        $role = Auth::user()->roles;
        return Inertia::render(
            'Dashboard',
            ['userRole' => $role->first()->name]
        );
    }
}
