<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CongruenceIdentity extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'project_detail_id',
        'congruence_identity_detail_id',
    ];

    public function congruenceIdentityDetail(): BelongsTo
    {
        return $this->belongsTo(CongruenceIdentityDetail::class);
    }

    public function store($request, $projectDetailId): void
    {
        array_map(fn($congruenceIdentityDetailId) => CongruenceIdentity::create(['project_detail_id' => $projectDetailId, 'congruence_identity_detail_id' => $congruenceIdentityDetailId]), $request);
    }
}
