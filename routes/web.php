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

Route::get('/', function () {
    return redirect()->route('login');
});

///Profil
///
Route::middleware('auth')->group(function () {
    Route::get("/profilSociete",[\App\Http\Controllers\ProfilController::class,"index"])->name("profilSociete");
    Route::get("/profilSociete/{roleUser}connect",[\App\Http\Controllers\ProfilController::class,"connect"])->name("profilSociete.connect");
});

Route::get('/dashboard', function () {
    return redirect()->action([\App\Http\Controllers\GestionnaireDashboardController::class,'index']);
})->middleware(['auth', 'verified'])->name('dashboard');


/*Route::middleware('auth')->group(function () {
    Route::get("/profil",[\App\Http\Controllers\ProfileController::class,"index"])->name("profil")->middleware("auth");
    Route::get("/profil/{roleUser}connect",[\App\Http\Controllers\ProfileController::class,"connect"])->name("profil.connect")->middleware("auth");
});*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware('auth')->group(function () {
    Route::resource("gestionnaireDashboard",\App\Http\Controllers\GestionnaireDashboardController::class);
    Route::resource("gestion.user",\App\Http\Controllers\Gestion\UserController::class);
    Route::resource("gestion.role",\App\Http\Controllers\Gestion\RoleController::class);
    Route::resource("gestion.immeuble",\App\Http\Controllers\Gestion\ImmeubleController::class);
    Route::resource("gestion.lot",\App\Http\Controllers\Gestion\LotController::class);
    Route::resource("gestion.bien",\App\Http\Controllers\Gestion\BienController::class);
    Route::resource("gestion.locataire",\App\Http\Controllers\Gestion\LocataireController::class);
    Route::get('/AllLocataire', [App\Http\Controllers\Gestion\LocationController::class, 'allLocataire'])->name('allLocataire');
    Route::get('/AllBien', [App\Http\Controllers\Gestion\LocationController::class, 'allBien'])->name('allBien');

    //Route::resource("gestion.locataire.location",\App\Http\Controllers\Gestion\Locataire\LocationController::class);
    Route::get('gestion/{user}/location/{location?}/locataire/{locataire?}/bien/{bien?}', [App\Http\Controllers\Gestion\LocationController::class, 'create'])->name('gestion.location.locataire.bien.create');


    Route::resource("gestion.location",\App\Http\Controllers\Gestion\LocationController::class);
    Route::resource("gestion.location.revenu",\App\Http\Controllers\Gestion\Location\RevenuController::class);
    Route::resource("gestion.location.depense",\App\Http\Controllers\Gestion\Location\DepenseController::class);


    Route::resource("gestion.revenu",\App\Http\Controllers\Gestion\RevenuController::class);
    Route::resource("gestion.depense",\App\Http\Controllers\Gestion\DepenseController::class);
});

require __DIR__.'/auth.php';
