<?php

use App\Traits\TriggerManagementTrait;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    use TriggerManagementTrait;

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->enum('permission', ['Affairs', 'Approver', 'Endorser', 'OrganizationAdvisor', 'ProjectAdvisor', 'Proposer', 'Responsible']);
            $table->foreignUlid('organization_id')->constrained('organizations')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignUlid('position_id')->constrained('positions')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
        $this->createTrigger('roles');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
        $this->dropTrigger('roles');
    }
};
