<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{

    public function index()
    {
        $banners = Banner::all();
        return Inertia::render('Banners/Index', [
            'banners' => $banners
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'subtitle' => 'required',
            'imagenPortada' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'linkUrl' => 'required',
            'isActive' => 'required'
        ], [
            'title.required' => 'El campo título es requerido',
            'subtitle.required' => 'El campo subtítulo es requerido',
            'imagenPortada.required' => 'El campo imagen es requerido',
            'imagenPortada.image' => 'El archivo debe ser una imagen',
            'imagenPortada.mimes' => 'El archivo debe ser una imagen de tipo: jpeg, png, jpg, gif, svg, webp',
            'imagenPortada.max' => 'El archivo no debe pesar más de 2MB',
            'linkUrl.required' => 'El campo link es requerido',
            'isActive.required' => 'El campo activo es requerido'
        ]);

        $data = $request->only('title', 'subtitle', 'linkUrl', 'isActive');

        if ($request->hasFile('imagenPortada')) {
            $file = $request->file('imagenPortada');
            $routeImage = $file->store('imagenPortada', ['disk' => 'public']);
            $data['imagenPortada'] = $routeImage;
        }

        Banner::create($data);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'subtitle' => 'required',
            'imagenPortada' => 'nullable',
            'linkUrl' => 'required',
            'isActive' => 'required'
        ], [
            'title.required' => 'El campo título es requerido',
            'subtitle.required' => 'El campo subtítulo es requerido',
            'linkUrl.required' => 'El campo link es requerido',
            'isActive.required' => 'El campo activo es obligatorio'
        ]);

        $data = $request->only('title', 'subtitle', 'linkUrl', 'isActive');
        $banner = Banner::find($id);

        if($request->hasFile('imagenPortada')) {
            $file = $request->file('imagenPortada');
            $routeImage = $file->store('imagenPortada', ['disk' => 'public']);
            $data['imagenPortada'] = $routeImage;

            if($banner->imagenPortada) {
                Storage::disk('public')->delete($banner->imagenPortada);
            }
        } else {
            
            if ($banner->imagenPortada) {
                $data['imagenPortada'] = $banner->imagenPortada; 
            } else {
                unset($data['imagenPortada']);
            }
        }

        $banner->update($data);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $banner = Banner::find($id);
        if($banner->imagenPortada) {
            Storage::disk('public')->delete($banner->imagenPortada);
        }
        $banner->delete();
    }
}
