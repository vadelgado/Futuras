<?php

namespace App\Http\Controllers;

use App\Models\productos;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductosController extends Controller
{

    public function index()
    {
        $productos = productos::select(        
        'id',
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'imagen',
        'categoria',
        'tipoEspecificaciones',
        'valorEspecificaciones')
        ->get();
        return Inertia::render('Productos/Index', 
        ['productos' => $productos]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'required|string',
            'precio' => 'required|integer|min:50', // Suponiendo que el valor más pequeño es 50 pesos
            'stock' => 'required|integer|min:0',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'categoria' => 'required|string|max:50',
            'tipoEspecificaciones' => 'required|string|max:50',
            'valorEspecificaciones' => 'required|string|max:255'
        ], [
            'nombre.required' => 'El campo nombre es requerido.',
            'nombre.string' => 'El campo nombre debe ser una cadena de texto.',
            'nombre.max' => 'El campo nombre no debe exceder los 100 caracteres.',
            'descripcion.required' => 'El campo descripción es requerido.',
            'descripcion.string' => 'El campo descripción debe ser una cadena de texto.',
            'precio.required' => 'El campo precio es requerido.',
            'precio.integer' => 'El campo precio debe ser un número entero.',
            'precio.min' => 'El campo precio debe ser al menos 50 pesos.',
            'stock.required' => 'El campo stock es requerido.',
            'stock.integer' => 'El campo stock debe ser un número entero.',
            'stock.min' => 'El campo stock no puede ser negativo.',
            'imagen.image' => 'El archivo debe ser una imagen.',
            'imagen.mimes' => 'El archivo debe ser una imagen de tipo: jpeg, png, jpg, gif, svg, webp.',
            'imagen.max' => 'El archivo no debe pesar más de 2MB.',
            'categoria.required' => 'El campo categoría es requerido.',
            'categoria.string' => 'El campo categoría debe ser una cadena de texto.',
            'categoria.max' => 'El campo categoría no debe exceder los 50 caracteres.',
            'tipoEspecificaciones.required' => 'El campo tipo de especificaciones es requerido.',
            'tipoEspecificaciones.string' => 'El campo tipo de especificaciones debe ser una cadena de texto.',
            'tipoEspecificaciones.max' => 'El campo tipo de especificaciones no debe exceder los 50 caracteres.',
            'valorEspecificaciones.required' => 'El campo valor de especificaciones es requerido.',
            'valorEspecificaciones.string' => 'El campo valor de especificaciones debe ser una cadena de texto.',
            'valorEspecificaciones.max' => 'El campo valor de especificaciones no debe exceder los 255 caracteres.'
        ]);

        $data = $request->only(
            'nombre',
            'descripcion',
            'precio',
            'stock',            
            'categoria',
            'tipoEspecificaciones',
            'valorEspecificaciones'
        );

        if ($request->hasFile('imagen')) {
            $file = $request->file('imagen');
            $routeImage = $file->store('imagen', ['disk' => 'public']);
            $data['imagen'] = $routeImage;
        }

        productos::create($data);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'required|string',
            'precio' => 'required|integer|min:50', // Suponiendo que el valor más pequeño es 50 pesos
            'stock' => 'required|integer|min:0',
            'imagen' => 'nullable',
            'categoria' => 'required|string|max:50',
            'tipoEspecificaciones' => 'required|string|max:50',
            'valorEspecificaciones' => 'required|string|max:255'
        ], [
            'nombre.required' => 'El campo nombre es requerido.',
            'nombre.string' => 'El campo nombre debe ser una cadena de texto.',
            'nombre.max' => 'El campo nombre no debe exceder los 100 caracteres.',
            'descripcion.required' => 'El campo descripción es requerido.',
            'descripcion.string' => 'El campo descripción debe ser una cadena de texto.',
            'precio.required' => 'El campo precio es requerido.',
            'precio.integer' => 'El campo precio debe ser un número entero.',
            'precio.min' => 'El campo precio debe ser al menos 50 pesos.',
            'stock.required' => 'El campo stock es requerido.',
            'stock.integer' => 'El campo stock debe ser un número entero.',
            'stock.min' => 'El campo stock no puede ser negativo.',
            'categoria.required' => 'El campo categoría es requerido.',
            'categoria.string' => 'El campo categoría debe ser una cadena de texto.',
            'categoria.max' => 'El campo categoría no debe exceder los 50 caracteres.',
            'tipoEspecificaciones.required' => 'El campo tipo de especificaciones es requerido.',
            'tipoEspecificaciones.string' => 'El campo tipo de especificaciones debe ser una cadena de texto.',
            'tipoEspecificaciones.max' => 'El campo tipo de especificaciones no debe exceder los 50 caracteres.',
            'valorEspecificaciones.required' => 'El campo valor de especificaciones es requerido.',
            'valorEspecificaciones.string' => 'El campo valor de especificaciones debe ser una cadena de texto.',
            'valorEspecificaciones.max' => 'El campo valor de especificaciones no debe exceder los 255 caracteres.'
        ]);

        $data = $request->only(
            'nombre',
            'descripcion',
            'precio',
            'stock',            
            'categoria',
            'tipoEspecificaciones',
            'valorEspecificaciones'
        );

        $producto = productos::find($id);

        if ($request->hasFile('imagen')) {
            $file = $request->file('imagen');
            $routeImage = $file->store('imagen', ['disk' => 'public']);
            $data['imagen'] = $routeImage;

            if ($producto->imagen) {
                Storage::disk('public')->delete($producto->imagen);
            }
        } else {
            if ($producto->imagen) {
                $data['imagen'] = $producto->imagen;
            } else {
                unset($data['imagen']);
            }
        }

        $producto->update($data);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $producto = productos::find($id);

        if ($producto->imagen) {
            Storage::disk('public')->delete($producto->imagen);
        }

        $producto->delete();
    }
}
