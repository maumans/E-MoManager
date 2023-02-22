<?php

namespace Database\Seeders;

use App\Models\Devise;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DeviseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('devises')->delete();

        Devise::create([
            "code"=>'GNF',
            "libelle"=>'Franc Guinéen',
            "symbole"=>'GNF',
            "taux"=>1
        ]);

        Devise::create([
            "code"=>'USD',
            "libelle"=>'Dollar',
            "symbole"=>'$',
            "taux"=>7.831
        ]);

        Devise::create([
            "code"=>'EUR',
            "libelle"=>'Euro',
            "symbole"=>'€',
            "taux"=>8.531
        ]);
    }
}
