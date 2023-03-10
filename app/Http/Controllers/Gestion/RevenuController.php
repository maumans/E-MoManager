<?php

namespace App\Http\Controllers\Gestion;

use App\Http\Controllers\Controller;
use App\Models\Revenu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;

class RevenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $revenus=Revenu::where("societe_id", session('societe')['id'])->where("status",true)->get();

        $revenuTotal=Revenu::where("societe_id", session('societe')['id'])->where("status",true)->sum('montantGNF');

        $revenuMensuel=Revenu::where("societe_id", session('societe')['id'])->where("status",true)->whereRelation('loyer',function ($query){
            $query->where('mois',Date::now()->month)->where('annee',Date::now()->year);
        })->sum('montantGNF');

        return Inertia::render('Gestion/Revenu/Index',['revenus'=>$revenus,'revenuTotal'=>$revenuTotal,'revenuMensuel'=>$revenuMensuel]);

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
