<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ปิดใช้งานโมเดลเหตุการณ์ก่อนเรียกใช้งานซีดเดอร์
//        Role::setEventDispatcher(app('events'));

        $organizations = [
//            ['id' => '1', 'name' => 'กิจการนิสิต'],
//            ['id' => '2', 'name' => 'สภานิสิต'],
//            ['id' => '3', 'name' => 'องค์การนิสิต'],
//            ['id' => '4', 'name' => 'ชมรม'],
//            ['id' => '5', 'name' => 'สโมสรนิสิต'],
//            ['id' => '6', 'name' => 'คณะกรรมการกลั่นกรองกิจกรรมนิสิต ภาคสมทบ'],
//            ['id' => '7', 'name' => 'คณะกรรมการบริหารกิจกรรมนิสิต ภาคสมทบ'],
//            ['id' => '8', 'name' => 'คณะกรรมการบริหารกิจกรรมนิสิตระดับบัณฑิตศึกษา']
        ];
        $positions = [
//            ['id' => '1', 'name' => 'ภารกิจกิจกรรมนิสิตและพันธกิจสัมพันธ์'],
//            ['id' => '2', 'name' => 'ประธาน'],
//            ['id' => '3', 'name' => 'รองประธาน'],
//            ['id' => '4', 'name' => 'ที่ปรึกษาองค์กร'],
//            ['id' => '5', 'name' => 'นายกองค์การนิสิต'],
//            ['id' => '6', 'name' => 'รองนายกองค์การนิสิต'],
//            ['id' => '7', 'name' => 'ประธานฝ่ายกีฬาและนันทนาการ'],
//            ['id' => '8', 'name' => 'ประธานฝ่ายบำเพ็ญประโยชน์'],
//            ['id' => '9', 'name' => 'ประธานฝ่ายศิลปวัฒนธรรม'],
//            ['id' => '10', 'name' => 'ประธานสโมสรนิสิต'],
//            ['id' => '11', 'name' => 'รองประธานสโมสรนิสิต'],
//            ['id' => '12', 'name' => 'ที่ปรึกษาสโมสรนิสิต'],
//            ['id' => '13', 'name' => 'ผู้เสนอโครงการ'],
//            ['id' => '14', 'name' => 'ผู้ช่วยคณบดี'],
//            ['id' => '15', 'name' => 'รองคณะบดี'],
//            ['id' => '16', 'name' => 'คณะบดี'],
//            ['id' => '17', 'name' => 'ที่ปรึกษาโครงการ'],
//            ['id' => '18', 'name' => 'ผู้รับผิดชอบโครงการ']
        ];

        $roles = [
            ['permission' => 'Affairs', 'organization' => '1', 'position' => ['1']],
            ['permission' => 'Endorser', 'organization' => '2', 'position' => ['2','3']],
            ['permission' => 'OrganizationAdvisor', 'organization' => '2', 'position' => ['4']],
            ['permission' => 'ProjectAdvisor', 'organization' => '2', 'position' => ['5']],
            ['permission' => 'Responsible', 'organization' => '2', 'position' => ['14']],
            ['permission' => 'Endorser', 'organization' => '3', 'position' => ['6','7','8','9','10']],
            ['permission' => 'Responsible', 'organization' => '3', 'position' => ['14']],
            ['permission' => 'OrganizationAdvisor', 'organization' => '3', 'position' => ['4']],
            ['permission' => 'ProjectAdvisor', 'organization' => '3', 'position' => ['5']],
            ['permission' => 'OrganizationAdvisor', 'organization' => '3', 'position' => ['4']],
            ['permission' => 'ProjectAdvisor', 'organization' => '3', 'position' => ['5']],
            ['permission' => 'Endorser', 'organization' => '5', 'position' => ['2','3']],
            ['permission' => 'Responsible', 'organization' => '5', 'position' => ['14']],
            ['permission' => 'OrganizationAdvisor', 'organization' => '5', 'position' => ['4']],
            ['permission' => 'ProjectAdvisor', 'organization' => '5', 'position' => ['5']],
//            ['permission' => 'Endorser', 'organization' => '2', 'position' => ['2', '3', '4']],
//            ['permission' => 'Endorser', 'organization' => '3', 'position' => ['5', '6', '7', '8', '9']],
//            ['permission' => 'Endorser', 'organization' => '5', 'position' => ['10', '11', '14', '15']],
//            ['permission' => 'Advisor', 'organization' => '1', 'position' => ['4']],
//            ['permission' => 'Advisor', 'organization' => '2', 'position' => ['4']],
//            ['permission' => 'Advisor', 'organization' => '3', 'position' => ['4']],
//            ['permission' => 'Advisor', 'organization' => '4', 'position' => ['4']],
//            ['permission' => 'Advisor', 'organization' => '5', 'position' => ['4']],
//            ['permission' => 'Proposer', 'organization' => '4', 'position' => ['13']],
//            ['permission' => 'Proposer', 'organization' => '5', 'position' => ['13']],
//            ['permission' => 'Responsible', 'organization' => '5', 'position' => ['18']],
        ];

        foreach ($roles as $role) array_map(fn($position) => Role::create(['permission' => $role['permission'], 'organization_id' => $role['organization'], 'position_id' => $position]), $role['position']);
    }
}
