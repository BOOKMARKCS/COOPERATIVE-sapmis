<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name_surname');
            $table->string('email');
            $table->string('password');
            $table->string('phone_number');
            $table->string('signature')->nullable();
            $table->foreignId('organization_id')->constrained('organizations');
            $table->foreignId('position_id')->constrained('positions');
            $table->foreignId('academic_year_id')->constrained('academic_years');
            $table->timestamps();
            $table->unique(['email', 'academic_year_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
