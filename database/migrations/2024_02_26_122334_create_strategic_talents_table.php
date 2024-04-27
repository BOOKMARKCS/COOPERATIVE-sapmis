<?php

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
        Schema::create('strategic_talents', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignUlid('project_detail_id')->constrained('project_details')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignUlid('strategic_talent_detail_id')->constrained('strategic_talent_details')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
        $this->createTrigger('strategic_talents');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('strategic_talents');
        $this->dropTrigger('strategic_talents');
    }
};
