<?php

namespace Database\Seeders;

use App\Models\Faculty;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FacultiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            ['id' => '021', 'name' => 'วิทยาศาสตร์และนวัตกรรมดิจิทัล'],
            ['id' => '031', 'name' => 'ศึกษาศาสตร์'],
            ['id' => '041', 'name' => 'เทคโนโลยีและการพัฒนาชุมชน'],
            ['id' => '051', 'name' => 'วิทยาการสุขภาพและการกีฬา'],
            ['id' => '081', 'name' => 'นิติศาสตร์'],
            ['id'=>'091','name' => 'วิศวกรรมศาสตร์'],
            ['id'=>'111','name' => 'พยาบาลศาสตร์'],
            ['id'=>'121','name' => 'อุตสาหกรรมเกษตรและชีวภาพ'],
        ])->map(fn($faculty) => Faculty::create(array_merge($faculty)));
    }
}
