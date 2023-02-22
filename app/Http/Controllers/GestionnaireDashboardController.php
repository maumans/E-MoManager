<?php

namespace App\Http\Controllers;

use App\Models\Immeuble;
use App\Models\Locataire;
use App\Models\Location;
use App\Models\Bien;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GestionnaireDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $nbreImmeubles=Immeuble::count();
        $nbreBiens=Bien::count();
        $nbreLocataires=Locataire::count();
        $nbreLocations=Location::count();

        return Inertia::render('Gestion/GestionnaireDashboard',["nbreImmeubles"=>$nbreImmeubles,"nbreBiens"=>$nbreBiens,"nbreLocataires"=>$nbreLocataires, "nbreLocations"=>$nbreLocations]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
