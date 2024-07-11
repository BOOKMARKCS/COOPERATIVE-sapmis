<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @method static where(string[] $array)
 * @method static pluck(string $string)
 */
class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'permission',
        'type',
        'organization_id',
        'position_id',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class);
    }
}
