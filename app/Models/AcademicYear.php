<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicYear extends Model
{
    use HasFactory;

    protected $fillable = [
        'year',
        'start_date',
        'end_date'
    ];

    public static function getAcademicYearId()
    {
        $currentDate = now()->addYears(543)->format('Y-m-d');
        $academicYear = AcademicYear::where('start_date', '<=', $currentDate)
            ->where('end_date', '>=', $currentDate)
            ->first();
        return $academicYear ? $academicYear->year : null;
    }

}
