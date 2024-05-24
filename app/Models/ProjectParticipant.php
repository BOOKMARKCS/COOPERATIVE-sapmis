<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectParticipant extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'project_detail_id',
        'advisor',
        'student',
        'teacher',
        'other'
    ];

    protected $casts = [
        'advisor' => 'array',
        'student' => 'array',
        'teacher' => 'array',
        'other' => 'array',
    ];
}
