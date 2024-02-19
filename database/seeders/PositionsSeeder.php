<?php

namespace Database\Seeders;

use App\Models\Positions;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PositionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        {
            $positions = ['นายกองค์การนิสิต', 'รองนายกองค์การนิสิต', 'ประธานฝ่ายกีฬาและนันทนาการ', 'ประธานฝ่ายบำเพ็ญประโยชน์', 'ประธานฝ่ายศิลปวัฒนธรรม', 'ประธาน', 'รองประธาน', 'ประธานสโมสรนิสิต', 'รองประธานสโมสรนิสิต', 'ที่ปรึกษา','ผู้เสนอโครงการ'];
            Positions::insert(array_map(fn($positionName) => ['name' => $positionName, 'created_at' => now(), 'updated_at' => now()], $positions));
        }
    }
}
