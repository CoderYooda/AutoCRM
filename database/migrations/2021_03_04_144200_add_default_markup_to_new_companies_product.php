<?php

use App\Models\Markup;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDefaultMarkupToNewCompaniesProduct extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $companies = \App\Models\Company::all();
        foreach ($companies as $company) {
            $price = Markup::where('company_id', $company->id)->first();

            if (!is_null($price) && is_object($company)) {
                \App\Http\Controllers\SettingsController::createCompanyDefaultPriceToProduct($company,$price);
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $companies = \App\Models\Company::all();
        foreach ($companies as $company) {
            \App\Models\Setting::where('name','Источник формирования цены для новых товаров')
                ->where('company_id',$company->id)
                ->where('model','DefaultMarkup')
                ->delete();
        }

    }
}
