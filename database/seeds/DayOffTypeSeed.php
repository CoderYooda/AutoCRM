<?php

use Illuminate\Database\Seeder;
use App\Models\DayOffType;

class DayOffTypeSeed extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        DayOffType::create(['id' => 1, 'type' => 'Больничный',]);
        DayOffType::create(['id' => 2, 'type' => 'Отпуск',]);
        DayOffType::create(['id' => 3, 'type' => 'Выходной за свой счет',]);
        DayOffType::create(['id' => 4, 'type' => 'Прогул',]);
        DayOffType::create(['id' => 5, 'type' => 'Оплачиваемый выходной',]);
    }
}
