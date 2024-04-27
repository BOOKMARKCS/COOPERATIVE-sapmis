<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Student extends Model
{
    use HasFactory;
    protected $fillable = [ 'id', 'user_id', 'name', 'phone_number', 'signature', 'profile', 'academic_year', 'faculty_id', 'club_id', ];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }

    public function faculty(): HasOne { return $this->hasOne(Faculty::class,'id','faculty_id'); }

}
