<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UsersRole;
use Illuminate\Auth\Events\Registered;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'admin example',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'phone_number' => '0123456789',
            'signature' => null,
            'organization_id' => 1,
            'position_id' => 1,
            'academic_year' => 66,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        UsersRole::create([
            'user_id' => '1',
            'role_id' => '1'
        ]);
    }
}
