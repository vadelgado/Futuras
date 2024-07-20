<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Noticias extends Model
{ 
    use HasFactory;

    protected $table = 'noticias';

    protected $primaryKey = 'id';

    protected $fillable = ['titulo', 'contenido', 'imagenPortada'];

    public function imagenes()
    {
        return $this->hasMany(ImagenesNoticias::class, 'fk_noticia_id');
    }
}
