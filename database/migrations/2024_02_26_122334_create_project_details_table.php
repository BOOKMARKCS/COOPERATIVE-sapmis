<?php

use App\Models\Budget;
use App\Models\CongruenceIdentity;
use App\Models\Kpi;
use App\Models\ProjectParticipant;
use App\Models\StrategicTalents;
use App\Models\TsuTalents;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    use \App\Traits\TriggerManagementTrait;
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_details', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('project_name');
            $table->string('activity_group_name')->nullable();
            $table->string('background')->nullable();
            $table->json('objectives');
            $table->json('activity_formats');
            $table->string('location')->nullable();
            $table->date('duration_start');
            $table->date('duration_end');
            $table->json('operations');
            $table->json('expected_results');
            $table->json('evaluates');
            $table->foreignUlid('project_id')->constrained('projects')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
        $this->createTrigger('project_details');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_details');
        $this->dropTrigger('project_details');
    }
};
