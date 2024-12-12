<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Specialty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(): \Inertia\Response
    {
        $user =  Auth::user();
        $role = $user->roles;
        $admin = '';
        $doctor = '';
        if ($role->first()->name == 'admin') {
            $appointments = Appointment::all();
            $admin = [
                // 'doctors' => Doctor::with('specialty','location')->get(),
            ];
        }
        if ($role->first()->name == 'doctor') {
            $appointments = Appointment::all();
            $doctor = [
                'data' => $user->doctor,
                'specialty' => $user->doctor->specialty,
                'location' => $user->doctor->location,
            ] ;
        }
        if ($role->first()->name == 'patient') {
            $appointments = Appointment::all();
        }

        $specialties = Specialty::with('services', 'doctors')->get();

        return Inertia::render(
            'Dashboard',
            [
                'admin' => $admin,
                'doctor' => $doctor,
                'userRole' => $role->first()->name,
                'specialties_controller' => $specialties,
                'data' => session('data'),
            ]
        );
    }
}
