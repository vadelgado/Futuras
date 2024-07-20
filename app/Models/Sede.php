<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sede extends Model
{
    use HasFactory;

    protected $table = 'sedes';

    protected $primaryKey = 'id';

    protected $fillable = [
        'nombre',
        'imagen',
        'direccion',
        'telefono',
        'telefonoDos',
        'telefonoTres',
        'email',
        'encargado',
        'coordenadas',
        'diasSemana',
        'horario',
        'estado'
    ];
}
