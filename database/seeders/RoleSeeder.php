<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Societe;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->delete();

        Role::create([
            "libelle"=>'Gestionnaire',
            "societe_id"=>Societe::first()->id
        ]);

        Role::create([
            "libelle"=>'Comptable',
            "societe_id"=>Societe::first()->id
        ]);
    }
}
