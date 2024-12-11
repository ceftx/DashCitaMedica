<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Specialty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(): \Inertia\Response
    {
        $role = Auth::user()->roles;
        if($role->first()->name == 'admin'){
            $appointment = Appointment::all();
        }
        if($role->first()->name == 'doctor'){
            $appointment = Appointment::all();
        }
        if($role->first()->name == 'patient'){
            $appointment = Appointment::all();
        }

        $specialties = Specialty::with('services', 'doctors')->get();

        return Inertia::render(
            'Dashboard',
            [
                'userRole' => $role->first()->name,
                'appointment' => $appointment,
                'specialties' => $specialties
            ]
        );
    }
}
