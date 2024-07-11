<?php /** @noinspection ALL */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StrategicTalents extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_detail_id',
        'strategic_talent_detail_id'
    ];

    public function store($request, $projectDetailId): void
    {
        array_map(fn($strategicTalentDetailId) => StrategicTalents::create(['project_detail_id' => $projectDetailId, 'strategic_talent_detail_id' => $strategicTalentDetailId]), $request);
    }
}
