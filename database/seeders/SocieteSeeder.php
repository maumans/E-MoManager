<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Societe;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SocieteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('societes')->delete();

        Societe::create([
            "nom"=>'Archévéché de conakry',
            "description"=>"Service Economat",
            "adresse"=>'Kaloum - BP 2016',
        ]);
    }
}
