<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Advisor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'phone_number',
        'signature',
        'profile',
        'academic_year',
        'faculty_id',
        'club_id'
    ];

    /**
     * Get the user that owns the advisor.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
