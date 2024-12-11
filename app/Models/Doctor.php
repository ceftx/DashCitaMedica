<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $fillable = [
        'user_id',
        'location_id',
        'specialty_id',
        'fullname',
        'phone',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
