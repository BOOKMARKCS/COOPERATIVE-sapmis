<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Officer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'phone_number',
        'signature',
        'profile',
        'role_id'
    ];

    /**
     * Get the user that owns the officer.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


}
