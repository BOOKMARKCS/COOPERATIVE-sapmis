<?php /** @noinspection ALL */

namespace App\Models;

use Illuminate\Contracts\Database\Query\Expression;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @method static select(Expression $raw)
 */
class ResponsibleStudent extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'project_detail_id',
        'user_id',
        'status'
    ];
    public static function store($requests, $projectDetailId): void
    {
        array_map(fn($req) => ResponsibleStudent::create([ 'student_id' => $req['user']['student']['id'], 'project_detail_id' => $projectDetailId, 'user_id' => $req['user']['id'] ]), $requests);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


}
