<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UniqueSupplierName extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        $suppliers = \App\Models\Supplier::all();

        foreach ($suppliers as $supplier) {
            $duplicates = \App\Models\Supplier::where(['company_id' => $supplier->company_id, 'name' => $supplier->name])->get();

            if(count($duplicates) > 1) {

                $ids = $duplicates->pluck('id')->toArray();

                $key = array_search($supplier->id, $ids);

                unset($ids[$key]);

                \App\Models\Supplier::whereIn('id', $ids)->delete();

                \App\Models\Article::whereIn('supplier_id', $ids)->delete();
            }
        }

        Schema::table('suppliers', function (Blueprint $table) {
            $table->unique(['company_id', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('suppliers', function (Blueprint $table) {
            $table->dropUnique('suppliers_company_id_name_unique');
        });
    }
}
