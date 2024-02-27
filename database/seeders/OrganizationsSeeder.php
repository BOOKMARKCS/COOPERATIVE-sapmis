<?php

namespace Database\Seeders;

use App\Models\Organization;
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
        $organizations = ['กิจการนิสิต' ,'สภานิสิต', 'องค์การนิสิต', 'ชมรม', 'สโมสรนิสิต', 'คณะกรรมการกลั่นกรองกิจกรรมนิสิต ภาคสมทบ', 'คณะกรรมการบริหารกิจกรรมนิสิต ภาคสมทบ', 'คณะกรรมการบริหารกิจกรรมนิสิตระดับบัณฑิตศึกษา'];
        Organization::insert(array_map(fn($organizationName) => ['name' => $organizationName, 'created_at' => now(), 'updated_at' => now()], $organizations));
    }
}
