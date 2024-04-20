<?php

namespace App\Enums;

use Illuminate\Validation\Rules\Enum;

final class UserType extends Enum
{
    const Student = 'student';
    const Officer = 'officer';
    const Advisor = 'advisor';
}
