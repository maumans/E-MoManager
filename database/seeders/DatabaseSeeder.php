<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call(SocieteSeeder::class);
        $this->call(DeviseSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(VilleSeeder::class);
        $this->call(TypeBienSeeder::class);
        $this->call(UserSeeder::class);
    }
}
