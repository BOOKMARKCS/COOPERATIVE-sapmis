<?php

namespace Database\Seeders;

use App\Models\CongruenceIdentityGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CongruenceIdentityGroupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groups = ['รับผิดชอบ','รอบรู้','สู้งาน','มีประสบการณ์เชิงปฏิบัติ'];
        array_map(fn($group) => CongruenceIdentityGroup::create(['name' => $group]), $groups);
    }
}
