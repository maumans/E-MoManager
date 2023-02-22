<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\RoleUser;
use App\Models\Societe;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();

        $user=User::create([
            'prenom' =>"Maurice",
            'nom' =>"Mansaré",
            'login' =>"MauGestionnaire",
            'email' =>"mansaremaurice100@gmail.com",
            'password' =>Hash::make("12345678"),
        ]);

        RoleUser::create([
            "user_id"=>$user->id,
            "role_id"=>Role::where("libelle", "Gestionnaire")->first()->id,
            "societe_id"=>Societe::get()->first()->id
        ]);


        $user=User::create([
            'prenom' =>"Pierre",
            'nom' =>"Mansaré",
            'login' =>"PierreComptable",
            'email' =>"piman75@gmail.com",
            'password' =>Hash::make("12345678"),
        ]);

        RoleUser::create([
            "user_id"=>$user->id,
            "role_id"=>Role::where("libelle", "Comptable")->first()->id,
            "societe_id"=>Societe::get()->first()->id
        ]);
    }
}
