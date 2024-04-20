<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TsuTalentGroup extends Model
{
    use HasFactory;
    protected $fillable = ['id','name'];

    public function talentDetails(): HasMany
    {
        return $this->hasMany(TsuTalentDetail::class);
    }
}
