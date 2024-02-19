<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        $users = [
            [
                'name_surname' => 'admin example',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('password'),
                'phone_number' => '0123456789',
                'signature' => null,
                'organization_id' => 1, // เปลี่ยนเลข ID ขององค์กรตามต้องการ
                'position_id' => 1, // เปลี่ยนเลข ID ของตำแหน่งตามต้องการ
                'academic_year_id' => 66, // เปลี่ยนเลข ID ของปีการศึกษาตามต้องการ
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('users')->insert($users);
    }
}
