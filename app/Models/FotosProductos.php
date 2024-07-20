<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FotosProductos extends Model
{
    use HasFactory;

    protected $table = 'fotos_productos';

    protected $primaryKey = 'id';

    protected $fillable = ['largeUrl', 'width', 'height', 'fk_producto_id'];

    public function producto()
    {
        return $this->belongsTo(Productos::class, 'fk_producto_id');
    }
}
