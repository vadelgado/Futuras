<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $datos = [
            [
            'name' => 'Oscar Armando Bolaños Castro',
            'email' => 'alianzafe24@gmail.com.com',
            'password' => Hash::make('admin1234'),
            ]
        ];
        DB::table('users')->insert($datos);
    }
}
