<?php

namespace Database\Seeders;

use App\Models\Organization;
use Illuminate\Database\Seeder;

class OrganizationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $organizations = ['กิจการนิสิต' ,'สภานิสิต', 'องค์การนิสิต', 'ชมรม', 'สโมสรนิสิต', 'คณะกรรมการกลั่นกรองกิจกรรมนิสิต ภาคสมทบ', 'คณะกรรมการบริหารกิจกรรมนิสิต ภาคสมทบ', 'คณะกรรมการบริหารกิจกรรมนิสิตระดับบัณฑิตศึกษา'];
        array_map(fn($organization) => Organization::create(['name' => $organization]), $organizations);
    }
}
