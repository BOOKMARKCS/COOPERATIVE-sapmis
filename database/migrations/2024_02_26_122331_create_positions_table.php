<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('positions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->foreignUlid('organization_id')->constrained('organizations');
            $table->timestamps();
        });
        DB::unprepared('
            CREATE TRIGGER set_positions_id BEFORE INSERT ON positions
            FOR EACH ROW
            BEGIN
                DECLARE next_id INT;
                SELECT COUNT(*) + 1 INTO next_id FROM positions;
                SET NEW.id = next_id;
            END
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('positions');
        DB::unprepared('DROP TRIGGER IF EXISTS set_positions_id');
    }
};
