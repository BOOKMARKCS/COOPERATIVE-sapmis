<?php

namespace Database\Seeders;

use App\Models\TsuTalentGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TsuTalentGroupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tsuTalents = ['กิจกรรม TSU Glocal Talent', 'กิจกรรม TSU Communication Talent', 'กิจกรรม TSU Social Innovation/Entrepreneurship Talent'];
        array_map(fn($tsuTalent) => TsuTalentGroup::create(['name' => $tsuTalent]), $tsuTalents);
    }
}
