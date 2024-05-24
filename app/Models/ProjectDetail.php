<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProjectDetail extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'project_id', 'project_name', 'activity_group_name', 'background', 'objectives', 'activity_formats', 'tsu_talent_id', 'strategic_talent_id', 'congruence_identity_id',  'project_participant_id', 'location', 'duration', 'operations', 'budget_id', 'expected_results', 'kpi_id', 'evaluates'];

    protected $casts = [
        'objectives' => 'array',
        'activity_formats' => 'array',
        'operations' => 'array',
        'expected_results' => 'array',
        'duration' => 'array'
    ];


    public static function store($request, $projectId)
    {
        $request['duration_start'] = date('Y-m-d', strtotime($request['duration_start']));
        $request['duration_end'] = date('Y-m-d', strtotime($request['duration_end']));
        $request['project_id'] = $projectId;
        $request['activity_group_name'] = auth()->user()->getUser()['role']['organization']['name'] . 'คณะ' . auth()->user()->getUser()[auth()->user()->type]['faculty']['name'];
        return ProjectDetail::where('project_id', ProjectDetail::create(array_map(fn($v) => is_array($v) ? json_encode($v, JSON_UNESCAPED_UNICODE) : $v, (array)$request))->project_id)->latest()->first();
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function projectApprovals(): HasMany
    {
        return $this->hasMany(ProjectApproval::class);
    }

    public function projectAdvisors(): HasMany
    {
        return $this->hasMany(ProjectAdvisor::class, 'project_detail_id', 'id');
    }

    public function responsibleStudents(): HasMany
    {
        return $this->hasMany(ResponsibleStudent::class, 'project_detail_id', 'id');
    }


    public function tsuTalent(): HasMany
    {
        return $this->hasMany(TsuTalents::class);
    }

    public function strategicTalent(): HasMany
    {
        return $this->hasMany(StrategicTalents::class);
    }

    public function congruenceIdentity(): HasMany
    {
        return $this->hasMany(CongruenceIdentity::class);
    }

    public function projectParticipant(): HasMany
    {
        return $this->hasMany(ProjectParticipant::class);
    }

    public function budget(): HasMany
    {
        return $this->hasMany(Budget::class);
    }

    public function kpi(): HasMany
    {
        return $this->hasMany(Kpi::class);
    }
}
