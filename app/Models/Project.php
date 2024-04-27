<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

/**
 * @method static create(array $convertToSnakeCase)
 */
class Project extends Model
{
    use HasFactory, HasEvents;

    protected $fillable = ['id', 'user_id', 'academic_year', 'status', 'project_type'];
    protected $keyType = 'string';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected static function boot()
    {
        parent::boot();

//        static::saving(function ($model) {
//            $rules = ['academic_year' => 'required|integer|min:1900|max:' . ((integer)date('Y') + 1),];
//            $messages = [
//                'academic_year.required' => 'กรุณาระบุปีการศึกษา',
//                'academic_year.integer' => 'ปีการศึกษาต้องเป็นตัวเลขเท่านั้น',
//                'academic_year.min' => 'ปีการศึกษาต้องไม่ต่ำกว่า 1900',
//                'academic_year.max' => 'ปีการศึกษาต้องไม่มากกว่า ' . ((integer)date('Y') + 1),
//            ];
//            $validator = Validator::make($model->toArray(), $rules, $messages);
//            if ($validator->fails()) throw new ValidationException($validator);
//        });

        static::creating(function ($project) {
            $project->user_id = auth()->id();
            $project->academic_year = auth()->user()->getUser()[auth()->user()->type]['academicYear'];
            $organizationTypes = ['3' => 'OrganizationAndCouncil', '2' => 'OrganizationAndCouncil', '4' => 'Club', '5' => 'StudentClub'];
            $project->project_type = $organizationTypes[auth()->user()->getUser()['role']['organizationId']] ?? null;
        });
    }

    public function store($request)
    {
        return Project::create($request)->latest()->first();
    }

    public function projectDetails(): HasMany
    {
        return $this->hasMany(ProjectDetail::class, 'project_id', 'id')->orderByDesc('created_at');
    }
}
