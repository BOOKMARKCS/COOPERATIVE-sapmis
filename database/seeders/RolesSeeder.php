<?php /** @noinspection ALL */

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['permission' => 'Affairs', 'organization' => '1', 'position' => ['1'], 'type' => 'officer'],
            ['permission' => 'Endorser', 'organization' => '2', 'position' => ['2', '3'], 'type' => 'student'],
            ['permission' => 'OrganizationAdvisor', 'organization' => '2', 'position' => ['4'], 'type' => 'advisor'],
            ['permission' => 'ProjectAdvisor', 'organization' => '2', 'position' => ['5'], 'type' => 'advisor'],
            ['permission' => 'Responsible', 'organization' => '2', 'position' => ['14'], 'type' => 'student'],
            ['permission' => 'Endorser', 'organization' => '3', 'position' => ['6', '7', '8', '9', '10'], 'type' => 'student'],
            ['permission' => 'Responsible', 'organization' => '3', 'position' => ['14'], 'type' => 'student'],
            ['permission' => 'OrganizationAdvisor', 'organization' => '3', 'position' => ['4'], 'type' => 'advisor'],
            ['permission' => 'ProjectAdvisor', 'organization' => '3', 'position' => ['5'], 'type' => 'advisor'],
            ['permission' => 'OrganizationAdvisor', 'organization' => '3', 'position' => ['4'], 'type' => 'advisor'],
            ['permission' => 'ProjectAdvisor', 'organization' => '3', 'position' => ['5'], 'type' => 'advisor'],
            ['permission' => 'Endorser', 'organization' => '5', 'position' => ['2', '3'], 'type' => 'student'],
            ['permission' => 'Responsible', 'organization' => '5', 'position' => ['14'], 'type' => 'student'],
            ['permission' => 'OrganizationAdvisor', 'organization' => '5', 'position' => ['4'], 'type' => 'advisor'],
            ['permission' => 'ProjectAdvisor', 'organization' => '5', 'position' => ['5'], 'type' => 'advisor'],
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

        foreach ($roles as $role) array_map(fn($position) => Role::create(['permission' => $role['permission'], 'organization_id' => $role['organization'], 'position_id' => $position, 'type' => $role['type']]), $role['position']);
//        foreach ($roles as $role) {
//            foreach ($role['position'] as $position) Role::create(['permission' => $role['permission'], 'organization_id' => $role['organization'], 'position_id' => $position, 'type' => $role['type']]);
//        }
    }
}
