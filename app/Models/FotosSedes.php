<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FotosSedes extends Model
{
    use HasFactory; 

    protected $table = 'fotos_sedes';

    protected $primaryKey = 'id'; 

    protected $fillable = [
        'largeUrl',
        'width',
        'height',
        'fk_sede_id'
    ];
}
