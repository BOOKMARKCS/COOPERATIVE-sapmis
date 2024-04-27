<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TsuTalents extends Model
{
    use HasFactory;

    protected $fillable = ['project_detail_id', 'tsu_talent_detail_id'];

    public function projectDetail(): BelongsTo
    {
        return $this->belongsTo(ProjectDetail::class);
    }

    public function talentDetail(): BelongsTo
    {
        return $this->belongsTo(TsuTalentDetail::class);
    }

    public function store($request,$projectDetailId)
    {
        array_map(fn($tsuTalentDetailId) => TsuTalents::create(['project_detail_id' => $projectDetailId, 'tsu_talent_detail_id' => $tsuTalentDetailId]), $request);
    }

}
