<?php

namespace App\Enums;

use Illuminate\Validation\Rules\Enum;

final class ProjectStatus extends Enum {
    const StudentClub_Draft = 1000;
    const StudentClub_Responsible = 1001;
    const StudentClub_AdvisorEndorse = 1002;
    const studentClub_StudentClubEndorse = 1003;
    const studentClub_StudentClubAdvisorEndorse = 1004;
    const studentClub_StudentOrganizationEndorse = 1005;
    const studentClub_StudentCouncilEndorse = 1006;
    const studentClub_StudentAffairsEndorse = 1007;
    const studentClub_FacultyOfficeEndorse = 1008;
    const studentClub_DeputyDeanEndorse = 1009;
    const studentClub_AssistantDeanEndorse = 1009;
    const studentClub_DeanApprove = 1009;

    const Club = 2001;
    const Club2 = 2002;
    const Club3 = 2003;

    const OrganizationAndCouncil = 3001;
}
