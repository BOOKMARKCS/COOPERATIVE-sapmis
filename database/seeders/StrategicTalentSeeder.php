<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\Project;
use App\Models\ProjectDetail;
use App\Models\StrategicTalentDetails;
use App\Models\StrategicTalents;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StrategicTalentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $strategicTalents = [
            'กิจกรรมเสริมสร้างนิสิตให้มีคุณลักษณะตามอัตลักษณ์ของมหาวิทยาลัย',
            'กิจกรรมพัฒนานิสิตให้มีทักษะการเรียนรู้ในศตวรรษที่ 21',
            'กิจกรรมนิสิตระหว่างประเทศ',
            'กิจกรรมพหุวัฒนธรรม ศิลปวัฒนธรรม และแลกเปลี่ยนวัฒนธรรม',
            'กิจกรรมกีฬา นันทนาการ และสุขภาพ',
            'กิจกรรมจิตอาสาทั้งภายในและชุมชนโดยรอบมหาวิทยาลัยทักษิณ'
        ];
        array_map(fn($strategicTalent) => StrategicTalentDetails::create(['name' => $strategicTalent]), $strategicTalents);
    }
}
