<?php /** @noinspection ALL */

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;

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
