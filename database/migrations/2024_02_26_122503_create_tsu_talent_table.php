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
        Schema::create('tsu_talents', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignUlid('project_detail_id')->constrained('project_details')->onUpdate('cascade')->onDelete('cascade');;
            $table->foreignUlid('tsu_talent_detail_id')->constrained('tsu_talent_details')->onUpdate('cascade')->onDelete('cascade');;
            $table->timestamps();
        });
        $this->createTrigger('tsu_talents');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tsu_talent');
        $this->dropTrigger('tsu_talent');
    }
};
