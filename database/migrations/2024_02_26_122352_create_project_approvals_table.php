<?php

use App\Models\ProjectDetail;
use App\Models\User;
use App\Traits\TriggerManagementTrait;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    use TriggerManagementTrait;
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_approvals', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignUlid('project_detail_id')->constrained('project_details')->onUpdate('cascade')->onDelete('cascade');;
            $table->foreignUlid('user_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');;
            $table->string('comment');
            $table->boolean('status');
            $table->timestamps();
        });
        $this->createTrigger('project_approvals');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_approvals');
        $this->dropTrigger('project_approvals');
    }
};
