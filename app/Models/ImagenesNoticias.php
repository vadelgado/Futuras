<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagenesNoticias extends Model
{
    use HasFactory;

    protected $table = 'imagenes_noticias';

    protected $primaryKey = 'id';

    protected $fillable = ['largeUrl', 'width', 'height', 'fk_noticia_id'];

    public function noticia()
    {
        return $this->belongsTo(Noticias::class, 'fk_noticia_id');
    }


}
