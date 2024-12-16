<?php


namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{

    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array

     */
    protected $except = [
        // Agrega aquí las rutas que deseas excluir de la verificación CSRF
        'api/*', // Esto deshabilita CSRF para todas las rutas que comienzan con /api/
    ];
}
