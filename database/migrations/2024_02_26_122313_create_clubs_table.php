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
        Schema::create('clubs', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->enum('campus',['พัทลุง','สงขลา']);
            $table->timestamps();
        });
        $this->createTrigger('clubs');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clubs');
        $this->dropTrigger('clubs');
    }
};
