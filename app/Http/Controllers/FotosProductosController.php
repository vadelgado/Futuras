<?php

namespace App\Http\Controllers;

use App\Models\FotosProductos;
use App\Models\productos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FotosProductosController extends Controller
{

    public function index(Request $request)
    {
        $request->validate([
            'producto_id' => 'required|integer|exists:productos,id',
        ]);

        $producto_id = $request->input('producto_id');

        if($producto_id){
            $galleries = FotosProductos::where('fk_producto_id', $producto_id)->get();
            $productos = productos::where('id', $producto_id)
            ->select('id','nombre')
            ->get();
            return Inertia::render('GalleryDos/Index', [
                'galleries' => $galleries,
                'productos' => $productos
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
                'fk_producto_id' => 'required|exists:productos,id'
            ],
            [
                'largeUrl.required' => 'La Imagen es obligatoria.',
                'largeUrl.max' => 'La URL grande no puede exceder los 255 caracteres.',
                'width.required' => 'El ancho es obligatorio.', 
                'width.integer' => 'El ancho debe ser un número entero.', 
                'height.required' => 'La altura es obligatoria.', 
                'height.integer' => 'La altura debe ser un número entero.', 
                'fk_producto_id.required' => 'El producto es obligatorio.', 
                'fk_producto_id.exists' => 'El producto seleccionado no es válido.' 
            ]
        );

        $data = $request->all();

        if($request->hasFile('largeUrl')) {
            $file = $request->file('largeUrl');
            $routeImage = $file->store('largeUrl', ['disk' => 'public']);
            $data['largeUrl'] = $routeImage;
        }

        FotosProductos::create($data);
    }

    public function update(Request $request, $id)
    {
        $request->validate(
            [
               'largeUrl' => 'nullable',                
                'width' => 'required|integer',
                'height' => 'required|integer',
                'fk_producto_id' => 'required|exists:productos,id'
            ],
            [
                'width.required' => 'El ancho es obligatorio.', 
                'width.integer' => 'El ancho debe ser un número entero.', 
                'height.required' => 'La altura es obligatoria.', 
                'height.integer' => 'La altura debe ser un número entero.', 
                'fk_producto_id.required' => 'El producto es obligatorio.', 
                'fk_producto_id.exists' => 'El producto seleccionado no es válido.' 
            ]
        );

        $data = $request->only('width', 'height', 'fk_producto_id');
        $ImagenesProductos = FotosProductos::find($id);

        if($request->hasFile('largeUrl')) {
            $file = $request->file('largeUrl');
            $routeImage = $file->store('largeUrl', ['disk' => 'public']);
            $data['largeUrl'] = $routeImage;

            if($ImagenesProductos->largeUrl) {
                Storage::disk('public')->delete($ImagenesProductos->largeUrl);
            }
        } else {
            if ($ImagenesProductos->largeUrl) {
                $data['largeUrl'] = $ImagenesProductos->largeUrl; 
            } else {
                unset($data['largeUrl']);
            }
        }

        $ImagenesProductos->update($data);
    }
    public function destroy($id)
    {
        $ImagenesProductos = FotosProductos::findOrFail($id);
        if($ImagenesProductos->largeUrl) {
            Storage::disk('public')->delete($ImagenesProductos->largeUrl);
        }
        $ImagenesProductos->delete();
    }
}
