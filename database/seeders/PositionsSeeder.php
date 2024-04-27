<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\Position;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use function Termwind\terminal;

class PositionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [
            'ภารกิจกิจกรรมนิสิตและพันธกิจสัมพันธ์', 'ประธาน', 'รองประธาน', 'ที่ปรึกษาองค์กร', 'ที่ปรึกษาโครงการ', 'นายกองค์การนิสิต', 'รองนายกองค์การนิสิต',
            'ประธานฝ่ายกีฬาและนันทนาการ', 'ประธานฝ่ายบำเพ็ญประโยชน์', 'ประธานฝ่ายศิลปวัฒนธรรม', 'ผู้ช่วยคณบดี', 'รองคณบดี', 'คณบดี', 'ผู้รับผิดชอบโครงการ'
        ];
        array_map(fn($positionName) => Position::create(['name' => $positionName]), $positions);
    }
}
