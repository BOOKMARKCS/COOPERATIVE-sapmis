<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CongruenceIdentityDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', 'name', 'congruence_identity_group_id'
    ];

    public function congruenceIdentityGroup(): BelongsTo
    {
        return $this->belongsTo(CongruenceIdentityGroup::class ,'congruence_identity_group_id');
    }

    public function CongruenceIdentityDetail(): HasMany
    {
        return $this->hasMany(CongruenceIdentity::class);
    }

}
