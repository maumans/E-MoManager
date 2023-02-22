<?php

namespace Database\Seeders;

use App\Models\TypeLogement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeLogementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('type_logements')->delete();

        TypeLogement::create([
            "libelle" =>'Appartement',
        ]);

        TypeLogement::create([
            "libelle" =>'Maison',
        ]);

        TypeLogement::create([
            "libelle" =>'Chambre',
        ]);

        TypeLogement::create([
            "libelle" =>'Atelier',
        ]);

        TypeLogement::create([
            "libelle" =>'Boutique',
        ]);

        TypeLogement::create([
            "libelle" =>'Bureaux',
        ]);

        TypeLogement::create([
            "libelle" =>'Garage',
        ]);

        TypeLogement::create([
            "libelle" =>'Entrepot',
        ]);

        TypeLogement::create([
            "libelle" =>'Hotel',
        ]);

        TypeLogement::create([
            "libelle" =>'Local professionel',
        ]);

        TypeLogement::create([
            "libelle" =>'Local commercial',
        ]);

        TypeLogement::create([
            "libelle" =>'Parking',
        ]);

        TypeLogement::create([
            "libelle" =>'Studio',
        ]);

        TypeLogement::create([
            "libelle" =>'Terrain',
        ]);

        TypeLogement::create([
            "libelle" =>'Autre',
        ]);


    }
}
