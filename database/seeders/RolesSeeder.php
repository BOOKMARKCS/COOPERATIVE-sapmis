<?php

namespace Database\Seeders;

use App\Models\Roles;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['affairs', 'endorse', 'approver', 'proposer', 'responsible', 'advisor', 'general'];
        Roles::insert(array_map(fn($roleName) => ['name' => $roleName, 'created_at' => now(), 'updated_at' => now()], $roles));
    }
}
