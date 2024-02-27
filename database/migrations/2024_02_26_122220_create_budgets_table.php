<?php

use App\Models\ProjectDetail;
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
        Schema::create('budgets', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('project_detail_id');
            $table->json('cost_details');
            $table->json('cost_amount');
            $table->json('remuneration_details');
            $table->json('remuneration_amount');
            $table->json('equipment_cost_detail');
            $table->json('equipment_cost_amount');
            $table->json('others');
            $table->timestamps();
        });
        DB::unprepared('
            CREATE TRIGGER set_budgets_id BEFORE INSERT ON budgets
            FOR EACH ROW
            BEGIN
                DECLARE next_id INT;
                SELECT COUNT(*) + 1 INTO next_id FROM budgets;
                SET NEW.id = next_id;
            END
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('budgets');
        DB::unprepared('DROP TRIGGER IF EXISTS set_budgets_id');
    }
};
