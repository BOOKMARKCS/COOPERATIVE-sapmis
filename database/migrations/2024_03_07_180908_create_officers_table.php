<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('officers', function (Blueprint $table) {
            $table->foreignUlid('user_id')->primary()->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->string('name');
            $table->string('phone_number', 15);
            $table->string('signature')->nullable();
            $table->string('profile')->default('/images/profile_default.png');
            $table->integer('academic_year')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('officers');
    }
};
