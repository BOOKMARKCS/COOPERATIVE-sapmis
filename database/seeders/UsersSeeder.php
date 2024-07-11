<?php

namespace Database\Seeders;

use App\Models\officer;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'type' => 'officer',
            'created_at' => now(),
            'updated_at' => now(),
            'role_id' => Role::where(['organization_id' => '1', 'position_id' => '1'])->pluck('id')->first()
        ]);
        $newUser = User::where('email', 'admin@gmail.com')->first();
        Officer::create([
            'user_id' => $newUser->id,
            'name' => 'admin example',
            'phone_number' => '0986383618',
        ]);
    }
}
