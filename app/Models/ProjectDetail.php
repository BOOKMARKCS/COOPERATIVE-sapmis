<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProjectDetail extends Model
{
    use HasFactory;

    protected $fillable = [ 'id', 'project_id', 'project_name', 'activity_group_name', 'tsu_talent_id', 'strategic_talent_id', 'congruence_identity_id', 'background', 'objectives', 'activity_formats', 'project_participant_id', 'location', 'duration_start', 'duration_end', 'operations', 'budget_id', 'expected_results', 'kpi_id', 'evaluates' ];

    public function store($request,$projectId)
    {
        $request['duration_start'] = date('Y-m-d H:i:s', strtotime($request['duration_start']));
        $request['duration_end'] = date('Y-m-d H:i:s', strtotime($request['duration_end']));
        $request->merge(['projectDetail' => array_merge($request->projectDetail, ['projectId' => $projectId])]);
        return ProjectDetail::where('project_id', ProjectDetail::create(array_map(fn ($v) => is_array($v) ? json_encode($v, JSON_UNESCAPED_UNICODE) : $v, $request))->project_id)->latest()->first();
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function projectApprovals(): HasMany
    {
        return $this->hasMany(ProjectApproval::class);
    }

    public function tsuTalents(): HasMany
    {
        return $this->hasMany(TsuTalents::class);
    }
}
