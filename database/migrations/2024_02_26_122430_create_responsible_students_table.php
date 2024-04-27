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
        Schema::create('responsible_students', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignUlid('student_id')->constrained('students')->onUpdate('cascade')->onDelete('cascade');
            $table->boolean('status')->default(0);
            $table->foreignUlid('project_detail_id')->constrained('project_details')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignUlid('user_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
            $table->unique(['student_id','project_detail_id']);
        });
        $this->createTrigger('responsible_students');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('responsible_students');
        $this->dropTrigger('responsible_students');
    }
};
