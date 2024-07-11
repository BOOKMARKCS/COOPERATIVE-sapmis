<?php /** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUnused */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    public function store($request,$projectDetailId): void
    {
        array_map(fn($tsuTalentDetailId) => TsuTalents::create(['project_detail_id' => $projectDetailId, 'tsu_talent_detail_id' => $tsuTalentDetailId]), $request);
    }

}
