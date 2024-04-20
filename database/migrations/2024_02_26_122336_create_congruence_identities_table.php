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
        Schema::create('congruence_identities', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignUlid('project_detail_id')->constrained('project_details')->onUpdate('cascade')->onDelete('cascade');;
            $table->foreignUlid('congruence_identity_detail_id')->constrained('congruence_identity_details')->onUpdate('cascade')->onDelete('cascade');;
            $table->timestamps();
        });
        $this->createTrigger('congruence_identities');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('congruence_identities');
        $this->dropTrigger('congruence_identities');
    }
};
