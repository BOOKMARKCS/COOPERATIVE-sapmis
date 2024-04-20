<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'user_id',
        'name',
        'phone_number',
        'signature',
        'profile',
        'academic_year',
        'faculty_id',
        'club_id',
    ];

    /**
     * Get the user that owns the student.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function faculty()
    {
        return $this->hasOne(Faculty::class,'id','faculty_id');
    }

}
