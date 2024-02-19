<?php

namespace Database\Seeders;

use App\Models\Organizations;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrganizationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $organizations = ['กิจการนิสิต','สภานิสิต', 'องค์การนิสิต', 'สโมสรนิสิต', 'ชมรม', 'คณะกรรมการกลั่นกรองกิจกรรมนิสิต ภาคสมทบ', 'คณะกรรมการบริหารกิจกรรมนิสิต ภาคสมทบ', 'คณะกรรมการบริหารกิจกรรมนิสิตระดับบัณฑิตศึกษา'];
        Organizations::insert(array_map(fn($organizationName) => ['name' => $organizationName, 'created_at' => now(), 'updated_at' => now()], $organizations));
    }
}
