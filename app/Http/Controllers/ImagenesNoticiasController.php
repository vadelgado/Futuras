<?php

namespace App\Http\Controllers;

use App\Models\ImagenesNoticias;
use App\Models\Noticias;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage; 


class ImagenesNoticiasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request->validate([
            'noticia_id' => 'required|integer|exists:noticias,id',
        ]);

        $noticias_id = $request->input('noticia_id');


        if($noticias_id){
            $galleries = ImagenesNoticias::where('fk_noticia_id', $noticias_id)->get();
            $noticias = Noticias::where('id', $noticias_id)
            ->select('id','titulo')
            ->get();
            return Inertia::render('Gallery/Index', [
                'galleries' => $galleries,
                'noticias' => $noticias
            ]);
        }else{
            return Inertia::render('Dashboard');
        }



    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'largeUrl' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',                
                'width' => 'required|integer',
                'height' => 'required|integer',
                'fk_noticia_id' => 'required|exists:noticias,id'
            ],
            [
                'largeUrl.required' => 'La Imagen es obligatoria.',
                'largeUrl.max' => 'La URL grande no puede exceder los 255 caracteres.',
                'width.required' => 'El ancho es obligatorio.', 
                'width.integer' => 'El ancho debe ser un número entero.', 
                'height.required' => 'La altura es obligatoria.', 
                'height.integer' => 'La altura debe ser un número entero.', 
                'fk_noticia_id.required' => 'La noticia es obligatoria.', 
                'fk_noticia_id.exists' => 'La noticia seleccionada no es válida.' 
            ]
        );

        $data = $request->all(  );

        if($request->hasFile('largeUrl')) {
            $file = $request->file('largeUrl');
            $routeImage = $file->store('largeUrl', ['disk' => 'public']);
            $data['largeUrl'] = $routeImage;
        }

        ImagenesNoticias::create($data);
    }

    public function update(Request $request, $id)
    {
        $request->validate(
            [
                'largeUrl' => 'nullable',               
                'width' => 'required|integer',
                'height' => 'required|integer',
                'fk_noticia_id' => 'required|exists:noticias,id'
            ],
            [
                'width.required' => 'El ancho es obligatorio.',
                'width.integer' => 'El ancho debe ser un número entero.', 
                'height.required' => 'La altura es obligatoria.', 
                'height.integer' => 'La altura debe ser un número entero.', 
                'fk_noticia_id.required' => 'La noticia es obligatoria.', 
                'fk_noticia_id.exists' => 'La noticia seleccionada no es válida.' 
            ] );

            $data = $request->only('width', 'height', 'fk_noticia_id');
            $ImagenesNoticias = ImagenesNoticias::find($id);

            if($request->hasFile('largeUrl')) {
                $file = $request->file('largeUrl');
                $routeImage = $file->store('largeUrl', ['disk' => 'public']);
                $data['largeUrl'] = $routeImage;

                if($ImagenesNoticias->largeUrl) {
                    Storage::disk('public')->delete($ImagenesNoticias->largeUrl);
                }
            } else {
                if ($ImagenesNoticias->largeUrl) {
                    $data['largeUrl'] = $ImagenesNoticias->largeUrl; 
                } else {
                    unset($data['largeUrl']);
                }
            }

            $ImagenesNoticias->update($data); 
    }


    public function destroy($id)
    {
        $ImagenesNoticias = ImagenesNoticias::findOrFail($id);
        if($ImagenesNoticias->largeUrl) {
            Storage::disk('public')->delete($ImagenesNoticias->largeUrl);
        }

        $ImagenesNoticias->delete();
    }
}
