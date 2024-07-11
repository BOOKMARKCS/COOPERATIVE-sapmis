<?php /** @noinspection PhpUnused */

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @method static create(array $convertToSnakeCase)
 * @method static join(string $string, string $string1, string $string2)
 */
class Project extends Model
{
    use HasFactory, HasEvents;

    protected $fillable = ['id', 'user_id', 'academic_year', 'pre_status', 'status', 'project_type'];
    protected $keyType = 'string';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $hidden = ['created_at', 'updated_at'];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($project) {
            $project->user_id = auth()->id();
            $project->academic_year = auth()->user()->getUser()[auth()->user()->{'type'}]['academicYear'];
            $organizationTypes = ['3' => 'OrganizationAndCouncil', '2' => 'OrganizationAndCouncil', '4' => 'Club', '5' => 'StudentClub'];
            $project->project_type = $organizationTypes[auth()->user()->getUser()['role']['organizationId']] ?? null;
        });
    }

    public function store($request)
    {
        return Project::create($request)->latest()->first();
    }

//    public function projectDetail(): HasMany
//    {
//        return $this->hasMany(ProjectDetail::class, 'project_id', 'id')->with(['projectAdvisors','tsuTalent','strategicTalent','congruenceIdentity','projectParticipant','budget','kpi'])->orderByDesc('created_at')->take(1);
//    }
    public function projectDetail(): HasOne
    {
        return $this->hasOne(ProjectDetail::class, 'project_id', 'id')->with(['projectAdvisors', 'tsuTalent', 'strategicTalent', 'congruenceIdentity', 'projectParticipant', 'budget', 'kpi'])->orderByDesc('created_at');
    }
}
