<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('advisors', function (Blueprint $table) {
            $table->foreignUlid('user_id')->primary()->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->string('name');
            $table->string('phone_number',15);
            $table->string('signature')->nullable();
            $table->string('profile')->default('/images/profile_default.png');
            $table->integer('academic_year');
            $table->foreignUlid('faculty_id')->nullable()->constrained('faculties')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignUlid('club_id')->nullable()->constrained('clubs')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('advisors');
    }
};
