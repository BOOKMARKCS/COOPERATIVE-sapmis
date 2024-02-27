<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AcademicYearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('academic_years')->insert(['year' => '66', 'start_date' => '2566-06-26', 'end_date' => '2567-03-23', 'created_at' => now() , 'updated_at' => now()]);
    }
}
