<?php

namespace App\Http\Controllers;

use App\Models\Sede;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SedeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sedes = Sede::select(
            'id',
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
        )->get();
        return Inertia::render('Sede/Index', 
        ['sedes' => $sedes]);
        
    }


    public function store(Request $request)
    {
        $request->validate ([
        'nombre' => 'required|string|max:255',
        'imagen' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        'direccion' => 'required|string|max:255',
        'telefono' => ['required', 'regex:/^(3\d{9}|6\d{9})$/'],
        'telefonoDos' => ['nullable', 'regex:/^(3\d{9}|6\d{9})$/'],
        'telefonoTres' => ['nullable', 'regex:/^(3\d{9}|6\d{9})$/'],
        'email' => 'required|email|max:255',
        'encargado' => 'required|string|max:255',
        'coordenadas' => 'required|string',
        'diasSemana' => 'required|string|max:255',
        'horario' => 'required|string|max:255',
        'estado' => 'required|in:activa,inactiva,mantenimiento',
        ],[
            'nombre.required' => 'El campo nombre es requerido.',
            'nombre.string' => 'El campo nombre debe ser una cadena de texto.',
            'nombre.max' => 'El campo nombre no debe exceder los 255 caracteres.',
            'imagen.required' => 'El campo imagen es requerido.',
            'imagen.image' => 'El archivo debe ser una imagen.',
            'imagen.mimes' => 'El archivo debe ser una imagen de tipo: jpeg, png, jpg, gif, svg, webp.',
            'imagen.max' => 'El archivo no debe pesar más de 2MB.',
            'direccion.required' => 'El campo dirección es requerido.',
            'direccion.string' => 'El campo dirección debe ser una cadena de texto.',
            'direccion.max' => 'El campo dirección no debe exceder los 255 caracteres.',
            'telefono.required' => 'El campo teléfono es requerido.',
            'telefono.regex' => 'El campo teléfono debe ser un número de teléfono válido. celular empieza con 3 y fijo con 6 ambos + 9 digitos',
            'telefonoDos.regex' => 'El campo teléfono dos debe ser un número de teléfono válido.',
            'telefonoTres.regex' => 'El campo teléfono tres debe ser un número de teléfono válido.',
            'email.required' => 'El campo email es requerido.',
            'email.email' => 'El campo email debe ser un correo electrónico válido.',
            'email.max' => 'El campo email no debe exceder los 255 caracteres.',
            'encargado.required' => 'El campo encargado es requerido.',
            'encargado.string' => 'El campo encargado debe ser una cadena de texto.',
            'encargado.max' => 'El campo encargado no debe exceder los 255 caracteres.',
            'coordenadas.required' => 'El campo coordenadas es requerido.',
            'coordenadas.string' => 'El campo coordenadas debe ser una cadena de texto.',
            'coordenadas.max' => 'El campo coordenadas no debe exceder los 255 caracteres.',
            'diasSemana.required' => 'El campo días de la semana es requerido.',
            'diasSemana.string' => 'El campo días de la semana debe ser una cadena de texto.',
            'diasSemana.max' => 'El campo días de la semana no debe exceder los 255 caracteres.',
            'horario.required' => 'El campo horario es requerido.',
            'horario.string' => 'El campo horario debe ser una cadena de texto.',
            'horario.max' => 'El campo horario no debe exceder los 255 caracteres.',
            'estado.required' => 'El campo estado es requerido.',
            'estado.in' => 'El campo estado debe ser activa, inactiva o mantenimiento.'
        ]);
        $data = $request->only(
            'nombre',            
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
        );

        if ($request->hasFile('imagen')) {
            $file = $request->file('imagen');
            $routeImage = $file->store('imagen', ['disk' => 'public']);
            $data['imagen'] = $routeImage;
        }

        Sede::create($data);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'imagen' => 'nullable',
            'direccion' => 'required|string|max:255',
            'telefono' => ['required', 'regex:/^(3\d{9}|6\d{9})$/'],
            'telefonoDos' => ['nullable', 'regex:/^(3\d{9}|6\d{9})$/'],
            'telefonoTres' => ['nullable', 'regex:/^(3\d{9}|6\d{9})$/'],
            'email' => 'required|email|max:255',
            'encargado' => 'required|string|max:255',
            'coordenadas' => 'required|string',
            'diasSemana' => 'required|string|max:255',
            'horario' => 'required|string|max:255',
            'estado' => 'required|in:activa,inactiva,mantenimiento',

        ],
            [
                'nombre.required' => 'El campo nombre es requerido.',
                'nombre.string' => 'El campo nombre debe ser una cadena de texto.',
                'nombre.max' => 'El campo nombre no debe exceder los 255 caracteres.',
                'direccion.required' => 'El campo dirección es requerido.',
                'direccion.string' => 'El campo dirección debe ser una cadena de texto.',
                'direccion.max' => 'El campo dirección no debe exceder los 255 caracteres.',
                'telefono.required' => 'El campo teléfono es requerido.',
                'telefono.regex' => 'El campo teléfono debe ser un número de teléfono válido.',
                'telefonoDos.regex' => 'El campo teléfono dos debe ser un número de teléfono válido.',
                'telefonoTres.regex' => 'El campo teléfono tres debe ser un número de teléfono válido.',
                'email.required' => 'El campo email es requerido.',
                'email.email' => 'El campo email debe ser un correo electrónico válido.',
                'email.max' => 'El campo email no debe exceder los 255 caracteres.',
                'encargado.required' => 'El campo encargado es requerido.',
                'encargado.string' => 'El campo encargado debe ser una cadena de texto.',
                'encargado.max' => 'El campo encargado no debe exceder los 255 caracteres.',
                'coordenadas.required' => 'El campo coordenadas es requerido.',
                'coordenadas.string' => 'El campo coordenadas debe ser una cadena de texto.',
                'coordenadas.max' => 'El campo coordenadas no debe exceder los 255 caracteres.',
                'diasSemana.required' => 'El campo días de la semana es requerido.',
                'diasSemana.string' => 'El campo días de la semana debe ser una cadena de texto.',
                'diasSemana.max' => 'El campo días de la semana no debe exceder los 255 caracteres.',
                'horario.required' => 'El campo horario es requerido.',
                'horario.string' => 'El campo horario debe ser una cadena de texto.',
                'horario.max' => 'El campo horario no debe exceder los 255 caracteres.',
                'estado.required' => 'El campo estado es requerido.',
                'estado.in' => 'El campo estado debe ser activa, inactiva o mantenimiento.'            
        ]);

        $data = $request->only(
            'nombre',
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
        );

        $sede = Sede::find($id);

        if ($request->hasFile('imagen')) {
            $file = $request->file('imagen');
            $routeImage = $file->store('imagen', ['disk' => 'public']);
            $data['imagen'] = $routeImage;

            if ($sede->imagen) {
                Storage::disk('public')->delete($sede->imagen);
            }
        } else {
            if ($sede->imagen) {
                $data['imagen'] = $sede->imagen;
            } else {
                unset($data['imagen']);
            }
        }

        $sede->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $sede = Sede::find($id);

        if ($sede->imagen) {
            Storage::disk('public')->delete($sede->imagen);
        }

        $sede->delete();
    }
}
