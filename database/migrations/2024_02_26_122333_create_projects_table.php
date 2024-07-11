<?php

use App\Traits\TriggerManagementTrait;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    use TriggerManagementTrait;

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->integer('pre_status')->nullable();
            $table->foreignUlid('user_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('status');
            $table->enum('project_type', ['StudentClub', 'Club', 'OrganizationAndCouncil']);
            $table->integer('academic_year');
            $table->timestamps();
        });
        $this->createTrigger('projects');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
        $this->dropTrigger('projects');
    }
};
