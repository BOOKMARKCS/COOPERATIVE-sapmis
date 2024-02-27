<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait TriggerManagementTrait
{
    public function createTrigger($triggerName, $tableName): void
    {
        DB::unprepared("
            CREATE TRIGGER $triggerName BEFORE INSERT ON $tableName
            FOR EACH ROW
            BEGIN
                IF NEW.id IS NULL OR NEW.id = '' THEN
                    SET @max_id = (SELECT MAX(CAST(id AS UNSIGNED)) FROM faculties);
                    SET @next_id = IFNULL(@max_id, 0) + 1;
                    SET NEW.id = LPAD(@next_id, 3, '0');
                ELSE
                    SET NEW.id = NEW.id;
                END IF;
            END
        ");
    }

    public function dropTrigger($triggerName): void
    {
        DB::unprepared("DROP TRIGGER IF EXISTS $triggerName");
    }
}
