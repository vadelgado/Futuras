<?php

namespace App\Http\Controllers;

use App\Models\Noticias;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class NoticiasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $noticias = Noticias::all();
        return Inertia::render('Noticias/Index', [
            'noticias' => $noticias
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required',
            'contenido' => 'required',
            'imagenPortada' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048'
        ], [
            'titulo.required' => 'El campo título es requerido',
            'contenido.required' => 'El campo contenido es requerido',
            'imagenPortada.image' => 'El archivo debe ser una imagen',
            'imagenPortada.mimes' => 'El archivo debe ser una imagen de tipo: jpeg, png, jpg, gif, svg, webp',
            'imagenPortada.max' => 'El archivo no debe pesar más de 2MB'
        ]);

        $data = $request->only('titulo', 'contenido');

        if ($request->hasFile('imagenPortada')) {
            $file = $request->file('imagenPortada');
            $routeImage = $file->store('imagenPortada', ['disk' => 'public']);
            $data['imagenPortada'] = $routeImage;
        }

        Noticias::create($data);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'titulo' => 'required',
            'contenido' => 'required',
            'imagenPortada' => 'nullable'
        ], [
            'titulo.required' => 'El campo título es requerido',
            'contenido.required' => 'El campo contenido es requerido',
        ]);

        $data = $request->only('titulo', 'contenido');
        $noticia = Noticias::find($id);

        if($request->hasFile('imagenPortada')) {
            $file = $request->file('imagenPortada');
            $routeImage = $file->store('imagenPortada', ['disk' => 'public']);
            $data['imagenPortada'] = $routeImage;

            if($noticia->imagenPortada) {
                Storage::disk('public')->delete($noticia->imagenPortada);
            }
        } else {
            
            if ($noticia->imagenPortada) {
                $data['imagenPortada'] = $noticia->imagenPortada; 
            } else {
                unset($data['imagenPortada']);
            }
        }



        $noticia->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $noticias = Noticias::find($id);
        if ($noticias->imagenPortada) {
            Storage::disk('public')->delete($noticias->imagenPortada);
        }

        $noticias->delete();
    }
}
