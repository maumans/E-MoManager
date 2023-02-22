<?php

namespace Database\Seeders;

use App\Models\Ville;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VilleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('villes')->delete();

        Ville::create([
            "nom" =>'Conakry'
        ]);

        Ville::create([
            "nom" =>'Coyah'
        ]);

        Ville::create([
            "nom" =>'Mamou'
        ]);

        Ville::create([
            "nom" =>'Kankan'
        ]);

        Ville::create([
            "nom" =>'Kissidougou'
        ]);
    }
}
