<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            OrganizationsSeeder::class,
            PositionsSeeder::class,
            RolesSeeder::class,
            UsersSeeder::class,
            FacultiesSeeder::class,
            StrategicTalentSeeder::class,
            TsuTalentGroupsSeeder::class,
            TsuTalentDetailsSeeder::class,
            CongruenceIdentityGroupsSeeder::class,
            CongruenceIdentityDetailsSeeder::class,
        ]);

    }
}
