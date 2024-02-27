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
            'กิจการนิสิต' => ['ภารกิจกิจกรรมนิสิตและพันธกิจสัมพันธ์'],
            'สภานิสิต' => ['ประธาน', 'รองประธาน', 'ผู้เสนอโครงการ'],
            'องค์การนิสิต' => ['นายกองค์การนิสิต', 'รองนายกองค์การนิสิต', 'ประธานฝ่ายกีฬาและนันทนาการ', 'ประธานฝ่ายบำเพ็ญประโยชน์', 'ประธานฝ่ายศิลปวัฒนธรรม', 'ผู้เสนอโครงการ'],
            'ชมรม' => ['ประธาน', 'รองประธาน', 'ผู้เสนอโครงการ'],
            'สโมสรนิสิต' => ['ประธานสโมสรนิสิต', 'รองประธานสโมสรนิสิต', 'ผู้เสนอโครงการ'],
            'คณะกรรมการกลั่นกรองกิจกรรมนิสิต ภาคสมทบ' => ['ประธาน', 'รองประธาน', 'ผู้เสนอโครงการ'],
            'คณะกรรมการบริหารกิจกรรมนิสิต ภาคสมทบ' => ['ประธาน', 'รองประธาน', 'ผู้เสนอโครงการ'],
            'คณะกรรมการบริหารกิจกรรมนิสิตระดับบัณฑิตศึกษา' => ['ประธาน', 'รองประธาน', 'ผู้เสนอโครงการ'],
        ];
        $organization = Organization::pluck('name', 'id');
        foreach ($positions as $organizationName => $positionNames) {
            $organizationId = $organization->search($organizationName);
            if ($organizationId !== false) $positionsData = array_map(function ($positionName) use ($organizationId) { return ['name' => $positionName, 'organization_id' => $organizationId, 'created_at' => now(), 'updated_at' => now()]; }, $positionNames);
            Position::insert($positionsData);
        }
    }
}
