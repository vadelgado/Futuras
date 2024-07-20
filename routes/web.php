<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Controllers\HomeController;

Route::get('/', [HomeController::class, 'index']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/noticia/{id}', [HomeController::class, 'noticia'])->name('noticia.show');

Route::get('/sedes', [HomeController::class, 'sedes'])->name('sede.list');
Route::get('/sede/{id}', [HomeController::class, 'sede'])->name('sede.show');
Route::get('/productos', [HomeController::class, 'productos'])->name('producto.list');
Route::get('/producto/{id}', [HomeController::class, 'producto'])->name('producto.show');
Route::get('/InformacionPagos',[HomeController::class, 'pagos'])->name('pagos.index');
Route::get('/PoliticasPrivacidad',[HomeController::class, 'PrivacyPolicy'])->name('politicasPrivacidad.index');
Route::get('/TerminosCondiciones',[HomeController::class, 'TerminosCondiciones'])->name('terminosCondiciones.index');
Route::get('/politica-de-cookies',[HomeController::class, 'PoliticaCokies'])->name('PoliticaCokies.index');
Route::get('/LICENSE',[HomeController::class, 'License'])->name('License.index');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Noticias
    Route::resource('AdministradorNoticias', App\Http\Controllers\NoticiasController::class);
    // Actualizar Noticias
    Route::post('AdministradorNoticias/{noticia}', [App\Http\Controllers\NoticiasController::class, 'update'])->name('AdministradorNoticias.updatepost');
    //Fotos Noticias
    Route::resource('AdministradorFotosNoticias', App\Http\Controllers\ImagenesNoticiasController::class);
    // Actualizar Fotos Noticias
    Route::post('AdministradorFotosNoticias/{imagen}', [App\Http\Controllers\ImagenesNoticiasController::class, 'update'])->name('AdministradorFotosNoticias.updatepost');
    // Productos
    Route::resource('AdministradorProductos', App\Http\Controllers\ProductosController::class);
    // Actualizar Productos
    Route::post('AdministradorProductos/{producto}', [App\Http\Controllers\ProductosController::class, 'update'])->name('AdministradorProductos.updatepost');

    //Fotos Productos
    Route::resource('AdministradorFotosProductos', App\Http\Controllers\FotosProductosController::class);
    // Actualizar Fotos Productos
    Route::post('AdministradorFotosProductos/{foto}', [App\Http\Controllers\FotosProductosController::class, 'update'])->name('AdministradorFotosProductos.updatepost');

    //Sedes
    Route::resource('AdministradorSedes', App\Http\Controllers\SedeController::class);
    // Actualizar Sedes
    Route::post('AdministradorSedes/{sede}', [App\Http\Controllers\SedeController::class, 'update'])->name('AdministradorSedes.updatepost');

    //Fotos Sedes
    Route::resource('AdministradorFotosSedes', App\Http\Controllers\FotosSedesController::class);
    // Actualizar Fotos Sedes
    Route::post('AdministradorFotosSedes/{foto}', [App\Http\Controllers\FotosSedesController::class, 'update'])->name('AdministradorFotosSedes.updatepost');

    //Banners
    Route::resource('AdministradorBanners', App\Http\Controllers\BannerController::class);
    // Actualizar Banners
    Route::post('AdministradorBanners/{banner}', [App\Http\Controllers\BannerController::class, 'update'])->name('AdministradorBanners.updatepost');

});

require __DIR__.'/auth.php';
