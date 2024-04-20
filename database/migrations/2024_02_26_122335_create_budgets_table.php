<?php

use App\Models\ProjectDetail;
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
        Schema::create('budgets', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->json('cost_details');
            $table->json('cost_amount');
            $table->json('remuneration_details');
            $table->json('remuneration_amount');
            $table->json('equipment_cost_detail');
            $table->json('equipment_cost_amount');
            $table->json('others');
            $table->foreignUlid('project_detail_id')->constrained('project_details')->onUpdate('cascade')->onDelete('cascade');;
            $table->timestamps();
        });

        $this->createTrigger('budgets');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('budgets');
        $this->dropTrigger('budgets');
    }
};
