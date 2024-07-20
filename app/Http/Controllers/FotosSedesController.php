<?php

namespace App\Http\Controllers;

use App\Models\FotosSedes;
use App\Models\Sede;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FotosSedesController extends Controller
{ 

    public function index(Request $request)
    {

        $request->validate([
            'sede_id' => 'required|integer|exists:sedes,id',
        ]);

        $sede_id = $request->input('sede_id');

        if($sede_id){
            $galleries = FotosSedes::where('fk_sede_id', $sede_id)->get();
            $sedes = Sede::where('id', $sede_id)
            ->select('id','nombre')
            ->get();
            return Inertia::render('FotosSedes/Index', [
                'galleries' => $galleries,
                'sedes' => $sedes
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
                'fk_sede_id' => 'required|exists:sedes,id'
            ],
            [
                'largeUrl.required' => 'La Imagen es obligatoria.',
                'largeUrl.max' => 'La URL grande no puede exceder los 255 caracteres.',
                'width.required' => 'El ancho es obligatorio.', 
                'width.integer' => 'El ancho debe ser un número entero.', 
                'height.required' => 'La altura es obligatoria.', 
                'height.integer' => 'La altura debe ser un número entero.', 
                'fk_sede_id.required' => 'La sede es obligatoria.', 
                'fk_sede_id.exists' => 'La sede seleccionada no es válida.' 
            ]
        );

        $data = $request->all();

        if($request->hasFile('largeUrl')) {
            $file = $request->file('largeUrl');
            $routeImage = $file->store('largeUrl', ['disk' => 'public']);
            $data['largeUrl'] = $routeImage;
        }
        FotosSedes::create($data);
    }

    public function update(Request $request, $id)
    {
        $request->validate(
            [
                'largeUrl' => 'nullable',               
                'width' => 'required|integer',
                'height' => 'required|integer',
                'fk_sede_id' => 'required|exists:sedes,id'
            ],
            [
                'width.required' => 'El ancho es obligatorio.',
                'width.integer' => 'El ancho debe ser un número entero.', 
                'height.required' => 'La altura es obligatoria.', 
                'height.integer' => 'La altura debe ser un número entero.', 
                'fk_sede_id.required' => 'La sede es obligatoria.', 
                'fk_sede_id.exists' => 'La sede seleccionada no es válida.' 
            ] );


            $data = $request->only('width', 'height', 'fk_sede_id');
            $ImagenesNoticias = FotosSedes::find($id);

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
        $ImagenesProductos = FotosSedes::findOrFail($id);
        if($ImagenesProductos->largeUrl) {
            Storage::disk('public')->delete($ImagenesProductos->largeUrl);
        }
        $ImagenesProductos->delete();
    }
}
