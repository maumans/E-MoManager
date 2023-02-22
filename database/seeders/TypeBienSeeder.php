<?php

namespace Database\Seeders;

use App\Models\TypeBien;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeBienSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('type_biens')->delete();

        TypeBien::create([
            "libelle" =>'Appartement',
        ]);

        TypeBien::create([
            "libelle" =>'Maison',
        ]);

        TypeBien::create([
            "libelle" =>'Immeuble',
        ]);

        TypeBien::create([
            "libelle" =>'Chambre',
        ]);

        TypeBien::create([
            "libelle" =>'Atelier',
        ]);

        TypeBien::create([
            "libelle" =>'Boutique',
        ]);

        TypeBien::create([
            "libelle" =>'Bureaux',
        ]);

        TypeBien::create([
            "libelle" =>'Garage',
        ]);

        TypeBien::create([
            "libelle" =>'Entrepot',
        ]);

        TypeBien::create([
            "libelle" =>'Hotel',
        ]);

        TypeBien::create([
            "libelle" =>'Local professionel',
        ]);

        TypeBien::create([
            "libelle" =>'Local commercial',
        ]);

        TypeBien::create([
            "libelle" =>'Parking',
        ]);

        TypeBien::create([
            "libelle" =>'Studio',
        ]);

        TypeBien::create([
            "libelle" =>'Terrain',
        ]);

        TypeBien::create([
            "libelle" =>'Autre',
        ]);
    }
}
