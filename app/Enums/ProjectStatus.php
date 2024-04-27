<?php

namespace App\Enums;

use Illuminate\Validation\Rules\Enum;

final class ProjectStatus extends Enum {
    const StudentClub_Proposer = 1000;
    const StudentClub_Responsible = 1001;
    const StudentClub_Advisor = 1002;
    const studentClub_StudentClub = 1003;
    const studentClub_StudentClubAdvisor = 1004;
    const studentClub_StudentOrganization = 1005;
    const studentClub_StudentCouncil = 1006;
    const studentClub_StudentAffairs = 1007;
    const studentClub_FacultyOffice = 1008;
    const studentClub_DeputyDean = 1009;
    const studentClub_AssistantDean = 1009;
    const studentClub_Dean = 1009;

    const Club = 2001;
    const Club2 = 2002;
    const Club3 = 2003;

    const OrganizationAndCouncil = 3001;
}
