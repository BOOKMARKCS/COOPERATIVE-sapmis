<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    use App\Traits\TriggerManagementTrait;
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string('id',26)->primary();
            $table->string('email',100);
            $table->string('password', 100)->default('$2y$12$.P.mbHduUMrSXMpa2QJTSOFtDexaHaFLB5wE/UhpHVypQPZmA4ALO');
            $table->enum('type', ['student', 'officer', 'advisor']);
            $table->foreignUlid('role_id')->constrained('roles')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
        $this->createTrigger('users');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        $this->dropTrigger('users');
    }
};
