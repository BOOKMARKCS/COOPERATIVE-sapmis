<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CongruenceIdentityGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', 'name'
    ];

    public function congruenceIdentityDetail(): HasMany
    {
        return $this->hasMany(CongruenceIdentityDetail::class);
    }
}
