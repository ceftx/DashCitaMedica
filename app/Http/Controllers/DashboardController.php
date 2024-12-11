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
            $appointments = Appointment::all();
        }
        if($role->first()->name == 'doctor'){
            $appointments = Appointment::all();
        }
        if($role->first()->name == 'patient'){
            $appointments = Appointment::all();
        }

        $specialties = Specialty::with('services', 'doctors')->get();

        return Inertia::render(
            'Dashboard',
            [
                'userRole' => $role->first()->name,
                'appointments' => $appointments,
                'specialties' => $specialties,
                'data' => session('data'),
            ]
        );
    }
}
