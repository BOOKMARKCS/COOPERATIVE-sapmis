<?php

namespace Database\Seeders;

use App\Models\CongruenceIdentityDetail;
use App\Models\CongruenceIdentityGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CongruenceIdentityDetailsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $CongruenceIdentityDetails = [
            'รับผิดชอบ' => ['การรับผิดชอบต่อหน้าที่', 'การบริหารจัดการตนเอง', 'การมีจิตสำนึกและตระหนักในการเป็นพลเมืองไทยและพลเมือง '],
            'รอบรู้' => ['การมีรู้ ทักษะ ความสามารถตามบริบทของอาชีพ', 'มีความรู้ ความเข้าใจ และทักษะการใช้เทคโนโลยีดิจิทัลและเครื่องมือสื่อสารอย่างเหมาะสม', 'ความสามารถใช้ภาษาไทยและภาษาต่างประเทศเพื่อการสื่อสาร', 'มีทักษะการเรียนรู้ การไม่ยึดติดกับสิ่งที่เคยเรียนรู้มา และการเรียนรู้สิ่งที่เคยรู้ด้วยมุมมองใหม่ตลอดชีวิต'],
            'สู้งาน' => ['การมีความมุ่งมั่น อดทนเพื่อทำงานที่ท้าทายโดยไม่ล้มเลิก', 'มีความสามารถในการปรับตัวและยืดหยุ่น', 'ทำงานเป็นทีม ความร่วมมือ การเป็นผู้นำการเปลี่ยนแปลง', 'การล้มแล้วลุกเร็ว'],
            'มีประสบการณ์เชิงปฏิบัติ' => ['ความเชี่ยวชาญที่เกิดจากการฝึกฝนและประสบการณ์จริง', 'การแก้ปัญหาอย่างเป็นระบบ', 'การสร้างนวัตกรรมสังคมเพื่อการพัฒนาและแก้ปัญหาในชุมชน']
        ];
        foreach (CongruenceIdentityGroup::pluck('name', 'id') as $groupId => $groupName) array_map(fn($detail) => CongruenceIdentityDetail::create(['name' => $detail, 'congruence_identity_group_id' => $groupId]), $CongruenceIdentityDetails[$groupName]);
    }
}
