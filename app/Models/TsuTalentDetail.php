<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TsuTalentDetail extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'tsu_talent_group_id'];

    public function talentGroup(): BelongsTo
    {
        return $this->belongsTo(TsuTalentGroup::class);
    }

    public function talents(): HasMany
    {
        return $this->hasMany(TsuTalents::class);
    }
}
