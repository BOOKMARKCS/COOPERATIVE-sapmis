<?php

namespace App\Models;

use App\Helpers\CaseConverter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(array $convertToSnakeCase)
 */
class Project extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'user_id',
        'academic_year',
        'status',
        'project_type'
    ];

    public function store($request)
    {
        return Project::create($request)->latest()->first();
    }


    public function projectDetails()
    {
        return $this->hasMany(ProjectDetail::class, 'project_id', 'id');
    }

}
