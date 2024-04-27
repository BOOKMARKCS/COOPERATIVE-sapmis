<?php

use App\Traits\TriggerManagementTrait;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    use TriggerManagementTrait;
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('congruence_identity_details', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->foreignUlid('congruence_identity_group_id')->constrained('congruence_identity_groups','id')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
        $this->createTrigger('congruence_identity_details');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('congruence_identity_details');
        $this->dropTrigger('congruence_identity_details');
    }
};
