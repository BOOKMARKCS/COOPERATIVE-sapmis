<?php

namespace Database\Seeders;

use App\Models\TsuTalentDetail;
use App\Models\TsuTalentGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TsuTalentDetailsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tsuTalentDetails = [
            'กิจกรรม TSU Glocal Talent' => ['กลุ่มกิจกรรมเกี่ยวกับการคิด วิจารณญาณ และการแก้ปัญหา', 'กลุ่มกิจกรรมเกี่ยวกับการบริหารจัดการตนเอง', 'กลุ่มกิจกรรมเกี่ยวกับการทำงานร่วมกับผู้อื่น', 'กลุ่มกิจกรรมเกี่ยวกับความรู้ ความเข้าใจ และการใช้เทคโนโลยีดิจิทัล', 'กลุ่มกิจกรรม TSU Good ได้แก่ กิจกรรมจิตอาสา บำเพ็ญประโยชน์ และสิ่งแวดล้อม'],
            'กิจกรรม TSU Communication Talent' => ['กิจกรรมเกี่ยวกับการใช้ภาษาเพื่อการสื่อสารในชีวิตประจำวัน'],
            'กิจกรรม TSU Social Innovation/Entrepreneurship Talent' => ['กลุ่มกิจกรรมด้านการสร้างนวัตกรรมสังคม', 'กลุ่มกิจกรรมด้านการเป็นผู้ประกอบการ']
        ];
        foreach (TsuTalentGroup::pluck('name', 'id') as $groupId => $groupName)
            array_map(fn($detail) => TsuTalentDetail::create(['name' => $detail, 'tsu_talent_group_id' => $groupId]), $tsuTalentDetails[$groupName]);
    }
}
