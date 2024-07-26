<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\DB;
use App\Models\productos;
use App\Models\Sede;
use App\Http\Controllers\ProfileController;
use App\Models\Noticias;
use Illuminate\Foundation\Application;



use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $noticias =  DB::table('noticias as n' )
        ->select(
            'n.id',
            'n.titulo',
            'n.contenido',
            'n.imagenPortada',
            )
        ->orderBy('n.created_at', 'desc')
        ->get();
        
        $banners = DB::table('banners as b')
        ->select(
            'b.title',
            'b.subtitle',
            'b.imagenPortada',
            'b.linkUrl',
            'b.isActive'
        )
        
        ->where('b.isActive', 1)
        ->get();

        //dd($banners);

        //dd($noticias);
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),            
            'noticias' => $noticias,
            'banners' => $banners
        ]);
    }

    public function noticia($id)
    {
        // Validar que el ID sea un entero y que exista en la base de datos
        $noticia = Noticias::find($id);
    
        if (!$noticia) {
            return redirect()->back()->with('error', 'Noticia no encontrada');
        }
    
        $galeriaNoticias = DB::table('imagenes_noticias as im')
            ->where('im.fk_noticia_id', $id)
            ->select(
                'im.largeUrl',
                'im.width',
                'im.height'
            )
            ->get();
        //dd($galeriaNoticias, $noticia);
        return Inertia::render('NoticiasTodos/Index', [
            'noticias' => $noticia,
            'galeriaNoticias' => $galeriaNoticias
        ]);
    }

    public function productos ()
    {
        $productos = DB::table('productos as p')
        ->select(
            'p.id',
            'p.nombre',
            'p.descripcion',
            'p.precio',
            'p.stock',
            'p.imagen',
            'p.categoria',
            'p.tipoEspecificaciones',
            'p.valorEspecificaciones',
        )
        ->orderBy('p.nombre', 'asc')
        ->orderBy('p.updated_at', 'asc')
        ->orderBy('p.created_at', 'asc')
        ->get();
        //dd($productos);
        return Inertia::render('ProductosTodos/Index', [
            'productos' => $productos
        ]);
    }

    public function producto ($id)
    {
        // Validar que el ID sea un entero y que exista en la base de datos
        $producto = productos::find($id);
        //dd($producto);

        if (!$producto) {
            return redirect()->back()->with('error', 'Producto no encontrado');
        }

        $galeriaProductos = DB::table('fotos_productos as fp')
            ->where('fp.fk_producto_id', $id)
            ->select(
                'fp.largeUrl',
                'fp.width',
                'fp.height'
            )
            ->get();

        return Inertia::render('ProductosTodos/Show', [
            'producto' => $producto,
            'galeriaProductos' => $galeriaProductos
        ]);
      
    }

    public function sedes ()
    {
        $sedes = DB::table('sedes as s')
        
        ->select(
            's.id',
            's.nombre',
            's.imagen',
            's.direccion',
            's.telefono',
            's.telefonoDos',
            's.telefonoTres',
            's.email',
            's.encargado',
            's.coordenadas',
            's.diasSemana',
            's.horario',
        )
        ->orderBy('s.nombre', 'asc')
        ->get();
        //dd($sedes);
        return Inertia::render('SedesTodos/Index', [
            'sedes' => $sedes
        ]);
    }

    public function sede ($id)
    {
        $sede = Sede::select(
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
            'horario'
        )->find($id);

        if(!$sede)
        {
            return redirect()->back()->with('error', 'Sede no encontrada');
        }

        $galeriaSedes = DB::table('fotos_sedes as fs')
        ->where('fs.fk_sede_id', $id)
        ->select(
            'fs.largeUrl',
            'fs.width',
            'fs.height'
        )->get();

        return Inertia::render('SedesTodos/Show', [
            'sede' => $sede,
            'galeriaSedes' => $galeriaSedes
        ]);
    }

    public function pagos ()
    {
        return Inertia::render('PaymentInfo');
    }

    public function PrivacyPolicy ()
    {
        return Inertia::render('PrivacyPolicy');
    }

    public function TerminosCondiciones ()
    {
        return Inertia::render('TermsAndConditions');
    }

    public function PoliticaCokies ()
    {
        return Inertia::render('PoliticaDeCookies');
    }

    public function License ()
    {
        return Inertia::render('LicensePage');
    }
    
}
