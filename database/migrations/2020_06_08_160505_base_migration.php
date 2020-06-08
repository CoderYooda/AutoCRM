<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class BaseMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('company_id')->unsigned()->nullable()->comment('Привязка к компании');
            $table->string('name');
            $table->string('phone')->unique();
            $table->string('email')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->dateTime('banned_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
        Schema::create('password_resets', function (Blueprint $table) {
            $table->string('email')->index();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });
        Schema::create('companies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('name')->nullable();
            $table->boolean('blocked')->default(0);
            $table->unsignedInteger('balance')->default(0);
            $table->unsignedInteger('payed_days')->default(0);
            $table->timestamps();
        });
        Schema::create('categories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('category_id')->unsigned();
            $table->bigInteger('company_id')->unsigned()->nullable()->comment('Привязка к компании');
            $table->bigInteger('creator_id')->unsigned()->comment('Привязка к пользователю');
            $table->boolean('locked')->comment('Замок');
            $table->char('type')->nullable()->comment('Тип');
            $table->char('name', 200)->default('Без названия')->comment('Название категории');
            $table->timestamps();
        });
        Schema::create('settings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->char('name')->comment('Описание настройки');
            $table->char('model')->nullable()->comment('Коллекция если select');
            $table->char('type')->comment('Тип поля');
            $table->char('key')->comment('Ключ');
            $table->char('value')->comment('Значение');
            $table->timestamps();
        });
        Schema::create('articles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('company_id')->unsigned()->nullable()->comment('Привязка к компании');
            $table->bigInteger('category_id')->unsigned()->nullable()->comment('Привязка к категории');
            $table->bigInteger('creator_id')->unsigned()->nullable()->comment('Привязка к пользователю');
            $table->bigInteger('supplier_id')->unsigned()->default(1)->comment('Привязка к производителю');
            $table->char('supplier')->comment('Производитель');
            $table->bigInteger('measurement_id')->unsigned()->nullable()->comment('Привязка к типу измерений');
            $table->char('foundstring', 255)->default(0)->comment('Артикул детали для поиска');
            $table->char('article', 64)->default(0)->comment('Артикул детали');
            $table->char('oem')->nullable()->comment('OEM детали');
            $table->char('storeCode')->nullable()->comment('Внутренний номер склада');
            $table->char('barcode')->nullable()->comment('Штрих код');
            $table->char('barcode_local')->nullable()->comment('Штрих код склада');
            $table->char('name')->comment('Наименование');
            $table->integer('blockedCount')->default(0)->nullable()->comment('Зарезервировано в заказе');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('stores', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->char('name')->comment('Наименование склада');
            $table->char('type')->default('casual')->comment('тип склада');
            $table->boolean('locked')->default(false)->comment('Закрыт от удаления');
            $table->timestamps();
        });
        Schema::create('suppliers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('company_id')->unsigned()->nullable()->comment('Привязка к компании');
            $table->char('name')->comment('Наименование производителя');
            $table->timestamps();
        });
        Schema::create('partner_types', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('name')->comment('Наименование типа контрагента');
            $table->integer('partner_type_id')->comment('Рекурсия к себе');
            $table->char('type')->comment('Тип контрагента');
            $table->boolean('locked')->comment('Заблокировано от удаления');
            $table->timestamps();
        });
        Schema::create('phones', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->char('number')->comment('Номер телефона');
            $table->boolean('main')->comment('тип телефона');
            $table->timestamps();
        });
        Schema::create('passports', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned();
            $table->bigInteger('number')->nullable()->unsigned()->comment('Номер паспорта');
            $table->char('issued_by')->nullable()->comment('Выдан');
            $table->date('issued_date')->nullable()->comment('Дата выдачи');
            $table->char('issued_place')->nullable()->comment('Место выдачи');
            $table->timestamps();
        });
        Schema::create('price_types', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('name')->comment('наименование');
            $table->timestamps();
        });
        Schema::create('measurements', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('name')->comment('Наименование');
            $table->timestamps();
        });
        Schema::create('salaries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к контрагенту');
            $table->integer('percent')->unsigned()->comment('Процент с продаж');
            $table->timestamps();
        });
        Schema::create('cashboxes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('manager_id')->unsigned()->comment('Менеджер');
            $table->char('name')->comment('Название кассового аппарата');
            $table->integer('balance')->comment('текущий баланс');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('dds_articles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('category_id')->unsigned()->nullable()->comment('Привязка к категории');
            $table->bigInteger('company_id')->unsigned()->nullable()->comment('Привязка к компании');
            $table->bigInteger('dds_types_id')->unsigned()->nullable()->comment('Привязка к виду ддс');
            $table->boolean('locked')->default(false)->comment('Замок');
            $table->char('name')->comment('Наименование');
            $table->timestamps();
        });
        Schema::create('dds_types', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('name')->comment('Наименование типа');
            $table->timestamps();
        });
        Schema::create('partners', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('user_id')->unsigned()->nullable()->comment('Привязка к пользователю');
            $table->bigInteger('category_id')->unsigned()->comment('Привязка к категории');
            $table->bigInteger('store_id')->unsigned()->nullable()->comment('Привязка к складу');
            $table->bigInteger('avatar_id')->unsigned()->nullable();
            $table->bigInteger('pic_id')->unsigned()->nullable();
            $table->char('foundstring', 128)->nullable();
            $table->boolean('isfl')->comment('физическое лицо?');
            $table->double('balance')->default(0)->comment('Баланс');
            $table->char('basePhone', 15)->nullable()->comment('Основной телефон');
            $table->char('fio')->nullable()->comment('ФИО');
            $table->date('birthday')->nullable()->comment('Дата рождения');
            $table->char('address')->nullable()->comment('Адрес');
            $table->char('email')->nullable()->comment('Почтовый адрес');
            $table->char('comment')->nullable()->comment('Комментарий');
            $table->char('barcode')->nullable()->comment('штрих-код');
            $table->char('companyName')->nullable()->comment('Наименование организации');
            $table->char('ur_address')->nullable()->comment('Юридический адрес');
            $table->char('fact_address')->nullable()->comment('Фактический адрес');
            $table->char('inn')->nullable()->comment('ИНН');
            $table->char('ogrn')->nullable()->comment('ОГРН');
            $table->char('bank')->nullable()->comment('Банк');
            $table->char('bik')->nullable()->comment('БИК');
            $table->char('kpp')->nullable()->comment('КПП');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('warrants', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->dateTime('do_date')->comment('Дата исполнения');
            $table->bigInteger('cashbox_id')->unsigned()->comment('Привязка к кассовому аппарату');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к контрагенту');
            $table->bigInteger('manager_id')->unsigned()->comment('Привязка к менеджеру');
            $table->bigInteger('ddsarticle_id')->unsigned()->comment('Привязка к кассовому аппарату');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            //$table->char('move_to')->nullable()->comment('Куда выводить');
            $table->double('summ', 12, 2)->comment('Сумма операции с двойной точностью');
            $table->char('reason')->nullable()->comment('Причина');
            $table->char('comment')->nullable()->comment('Комментарий');
            $table->boolean('isIncoming')->comment('Входящая или исходящая операция');
            $table->double('balance', 12, 2)->comment('Остаток в кассе после выполнения операции');
            $table->char('payable_type')->nullable()->comment('Привязанная сущность');
            $table->bigInteger('payable_id')->unsigned()->nullable()->comment('ID привязанной сущности');
            $table->timestamps();
        });
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к партнеру');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->decimal('totalPrice', 10, 2)->comment('Общая цена');
            $table->integer('discount')->comment('Скидка');
            $table->boolean('inpercents')->comment('В процентах?');
            $table->timestamps();
        });
        Schema::create('shipments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к партнеру');
            $table->bigInteger('manager_id')->unsigned()->comment('Привязка к менеджеру');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('store_id')->unsigned()->comment('Привязка к складу');
            $table->bigInteger('clientorder_id')->unsigned()->nullable()->comment('Привязка к заказу');
            $table->char('foundstring', 255)->default(0)->comment('Строка поиска');
            $table->dateTime('do_date')->comment('Дата исполнения');
            $table->decimal('summ', 12, 2)->comment('Общая цена');
            $table->decimal('itogo', 12, 2)->comment('Итоговая цена');
            $table->integer('discount')->comment('Скидка');
            $table->boolean('inpercents')->comment('В процентах?');
            $table->char('comment')->nullable()->comment('Комментарий');
            $table->double('balance', 12, 2)->comment('Остаток в кассе после выполнения операции');
            $table->double('wsumm')->default(0.00)->comment('Оплаченная сумма');
            $table->timestamps();
        });
        Schema::create('entrances', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('providerorder_id')->nullable()->unsigned()->comment('Привязка к Заявкам');
            $table->bigInteger('shipment_id')->nullable()->unsigned()->comment('Привязка к Продажам');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к Сотруднику');
            $table->bigInteger('manager_id')->unsigned()->comment('Принимающий');
            $table->boolean('locked')->default(0)->comment('Заблокировано');
            $table->text('comment')->nullable()->comment('Комментарий');
            $table->timestamps();
        });
        Schema::create('article_order', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
        });
        Schema::create('article_store', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('article_id')->unsigned()->nullable()->comment('Привязка к товару');
            $table->bigInteger('store_id')->unsigned()->nullable()->comment('Привязка к товару');
            $table->char('location')->nullable()->comment('Описание места на складе');
            $table->integer('count')->nullable()->default(0)->comment('Колличество');
            $table->integer('reserved')->unsigned()->nullable()->default(0)->comment('Зарезервировано');
            $table->boolean('isset')->unsigned()->nullable()->default(0)->comment('Включен в склад?');
            $table->decimal('midprice')->unsigned()->nullable()->comment('Усредненная цена по складу');
            $table->timestamps();
        });
        Schema::create('partner_phone', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned()->nullable()->comment('Привязка к партнеру');
            $table->bigInteger('phone_id')->unsigned()->nullable()->comment('Привязка к телефону');
            $table->timestamps();
        });
        Schema::create('order_warrant', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
        });
        Schema::create('article_shipment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('article_id')->unsigned()->comment('Привязка к товару');
            $table->bigInteger('shipment_id')->unsigned()->comment('Привязка к поступлению');
            $table->integer('count')->unsigned()->comment('Кол - во');
            $table->integer('refunded_count')->unsigned()->comment('Возвращено');
            $table->double('midprice')->unsigned()->nullable()->comment('Цена закупочная');
            $table->char('status')->default('to_ensure')->comment('статус');
            $table->double('price')->unsigned()->comment('Цена');
            $table->double('total')->unsigned()->comment('Цена общая');
        });
        Schema::create('article_entrance', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('article_id')->unsigned()->comment('Привязка к товару');
            $table->bigInteger('entrance_id')->unsigned()->comment('Привязка к поступлению');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('store_id')->unsigned()->comment('Привязка к складу');
            $table->integer('count')->unsigned()->comment('Кол - во');
            $table->double('price')->unsigned()->comment('Цена');
            $table->timestamps();
        });
        Schema::create('contract', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('contract_type_id')->unsigned()->comment('Привязка к типу');
            $table->char('name')->comment('Наименование');
            $table->boolean('default')->default(0)->comment('По умолчанию');
            $table->char('comment')->nullable()->comment('Комментарий');
            $table->timestamps();
        });
        Schema::create('contract_types', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('name')->comment('Наименование типа');
            $table->timestamps();
        });
        Schema::create('money_move', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->dateTime('do_date')->comment('Дата исполнения');
            $table->bigInteger('out_cashbox_id')->unsigned()->comment('Привязка к кассовому аппарату1');
            $table->bigInteger('in_cashbox_id')->unsigned()->comment('Привязка к кассовому аппарату2');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('manager_id')->unsigned()->comment('Привязка к менеджеру');
            $table->double('summ', 12, 2)->comment('Сумма операции с двойной точностью');
            $table->char('comment')->nullable()->comment('Комментарий');
            $table->double('in_balance', 12, 2)->comment('Остаток в кассе 1 после выполнения операции');
            $table->double('out_balance', 12, 2)->comment('Остаток в кассе 2 после выполнения операции');
            $table->timestamps();
        });
        Schema::create('client_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к партнеру');
            $table->bigInteger('manager_id')->unsigned()->comment('Привязка к партнеру');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('store_id')->unsigned()->comment('Привязка к складу');
            $table->dateTime('do_date')->comment('Дата исполнения');
            $table->decimal('summ', 10, 2)->comment('Общая цена');
            $table->decimal('itogo', 12, 2)->comment('Итоговая цена');
            $table->integer('discount')->comment('Скидка');
            $table->string('phone')->nullable();
            $table->boolean('inpercents')->comment('В процентах?');
            $table->char('comment')->nullable()->comment('Комментарий');
            $table->double('balance', 12, 2)->comment('Остаток в кассе после выполнения операции');
            $table->char('status')->default('active')->comment('Статус заказа');
            $table->char('color')->nullable()->comment('Маркировка');
            $table->double('wsumm')->default(0.00)->comment('Оплаченная сумма');
            $table->timestamps();
        });
        Schema::create('article_client_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('article_id')->unsigned()->comment('Привязка к товару');
            $table->bigInteger('client_order_id')->unsigned()->comment('Привязка к поступлению');
            $table->bigInteger('store_id')->nullable()->unsigned()->comment('Привязка к складу');
            $table->integer('count')->unsigned()->comment('Кол - во');
            $table->integer('shipped_count')->unsigned()->comment('Отгружено Кол - во');
            $table->double('price')->unsigned()->comment('Цена');
            $table->double('total')->unsigned()->comment('Цена общая');
        });
        Schema::create('provider_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к партнеру');
            $table->bigInteger('manager_id')->unsigned()->comment('Менеджер');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('store_id')->unsigned()->comment('Привязка к складу');
            $table->dateTime('do_date')->comment('Дата исполнения');
            $table->decimal('summ', 10, 2)->comment('Общая цена');
            $table->decimal('itogo', 12, 2)->comment('Итоговая цена');
            $table->integer('discount')->default(0)->comment('Скидка');
            $table->boolean('nds')->comment('ндс');
            $table->boolean('nds_included')->comment('ндс в стоимости?');
            $table->boolean('inpercents')->default(false)->comment('В процентах?');
            $table->char('comment')->nullable()->comment('Комментарий');
            $table->double('balance', 12, 2)->comment('Остаток в кассе после выполнения операции');
            $table->unsignedInteger('pays')->default(0)->comment('Индикатор оплаты');
            $table->unsignedInteger('incomes')->default(0)->comment('Индикатор поступлений');
            $table->unsignedInteger('entred_count')->default(0)->comment('Кол-во поступлений');
            $table->unsignedInteger('order_count')->default(0)->comment('Кол-во в заказе');
            $table->double('wsumm')->default(0.00)->comment('Оплаченная сумма');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('article_provider_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('article_id')->unsigned()->comment('Привязка к товару');
            $table->bigInteger('provider_order_id')->unsigned()->comment('Привязка к поступлению');
            $table->integer('count')->unsigned()->comment('Кол - во');
            $table->double('price')->unsigned()->comment('Цена');
            $table->double('total')->unsigned()->comment('Цена общая');
            $table->double('nds_percent')->unsigned()->comment('% ндс');
            $table->double('nds')->unsigned()->comment('ндс');
            $table->boolean('nds_included')->unsigned()->comment('ндс в стоимости?');
        });
        Schema::create('salary_schemas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->boolean('isPositive')->default(0)->comment('Положительная операция?');
            $table->char('template')->comment('Шаблон');
            $table->timestamps();
        });
        Schema::create('salary_schemas_partner', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('salary_schema_id')->unsigned()->comment('Привязка к схеме выплаты');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к схеме выплаты');
            $table->dateTime('start_period')->nullable()->comment('Начало периода');
            $table->dateTime('end_period')->nullable()->comment('Конец периода');
            $table->bigInteger('value')->unsigned()->comment('Привязка к сотруднику');
            $table->timestamps();
        });
        Schema::create('adjustments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к партнеру');
            $table->bigInteger('manager_id')->unsigned()->comment('Привязка к партнеру');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('store_id')->unsigned()->comment('Привязка к складу');
            $table->dateTime('do_date')->comment('Дата исполнения');
            $table->char('comment')->nullable()->nullable()->comment('Комментарий');
            $table->timestamps();
        });
        Schema::create('article_adjustment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('article_id')->unsigned()->comment('Привязка к товару');
            $table->bigInteger('adjustment_id')->unsigned()->comment('Привязка к корректировке');
            $table->bigInteger('store_id')->nullable()->unsigned()->comment('Привязка к складу');
            $table->integer('count')->nullable()->unsigned()->comment('Кол - во');
            $table->integer('prev_count')->nullable()->comment('Кол - во');
            $table->integer('deviation_count')->nullable()->comment('Отклонение кол-ва');
            $table->double('price')->nullable()->unsigned()->comment('Цена');
            $table->double('prev_price')->nullable()->unsigned()->comment('Цена');
            $table->integer('deviation_price')->nullable()->comment('Отклонение цены');
            $table->double('total')->nullable()->unsigned()->comment('Цена общая');
        });
        Schema::create('system_message', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->default(1)->unsigned()->comment('Отправитель');
            $table->bigInteger('reciever_id')->unsigned()->comment('Получатель');
            $table->char('type')->comment('Тип оповещения');
            $table->char('kind')->nullable()->comment('Сущность');
            $table->bigInteger('kind_id')->nullable()->comment('ID Сущность');
            $table->char('link')->nullable()->comment('ссылка');
            $table->char('hash')->comment('Уникальный хэш');
            $table->boolean('viewed')->default(0)->comment('Прочитано?');
            $table->char('message')->comment('Системное сообщение');
            $table->char('channel')->nullable()->comment('Канал вещания');
            $table->timestamps();
        });
        Schema::create('jobs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('queue')->index();
            $table->longText('payload');
            $table->unsignedTinyInteger('attempts');
            $table->unsignedInteger('reserved_at')->nullable();
            $table->unsignedInteger('available_at');
            $table->unsignedInteger('created_at');
        });
        Schema::create('sms_confirmation', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('phone')->comment('Номер телефона');
            $table->char('status')->nullable()->comment('Статус текст');
            $table->integer('code')->nullable()->comment('Код смс');
            $table->integer('status_code')->nullable()->comment('Код статуса');
            $table->char('sms_id')->nullable()->comment('Идентификатор');
            $table->double('cost')->nullable()->comment('Стоимость СМС');
            $table->ipAddress('ip')->nullable()->comment('Адресс отправителя');
            $table->integer('attempts')->default(0)->comment('Адресс отправителя');
            $table->boolean('isblocked')->default(0)->comment('Заблокирован');
            $table->boolean('confirmed')->default(0)->comment('Заблокирован');
            $table->timestamps();
        });
        Schema::create('client_orders_warrant', function (Blueprint $table) {
            $table->bigInteger('warrant_id')->unsigned()->comment('Привязка к операции');
            $table->bigInteger('client_order_id')->unsigned()->comment('Привязка к заказу клиента');
        });
        Schema::create('provider_order_warrant', function (Blueprint $table) {
            $table->bigInteger('warrant_id')->unsigned()->comment('Привязка к операции');
            $table->bigInteger('providerorder_id')->unsigned()->comment('Привязка к заказу поставщика');
        });
        Schema::create('s_m_s_messages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к партнеру');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->string('phone')->nullable();
            $table->integer('code')->nullable()->comment('Код смс');
            $table->integer('status_code')->nullable()->comment('Код статуса');
            $table->char('sms_id')->nullable()->comment('Идентификатор');
            $table->double('cost')->nullable()->comment('Стоимость СМС');
            $table->ipAddress('ip')->nullable()->comment('Адресс отправителя');
            $table->text('message')->nullable();
            $table->timestamps();
        });
        Schema::create('s_m_s_message_client_order', function (Blueprint $table) {
            $table->bigInteger('client_order_id')->unsigned()->comment('Привязка к заказу клиента');
            $table->bigInteger('s_m_s_message_id')->unsigned()->comment('Привязка к сообщению');
        });
        Schema::create('article_stock', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('store_id')->unsigned()->comment('Привязка к складу');
            $table->bigInteger('article_id')->unsigned()->comment('Привязка к товару');
            $table->integer('cost')->unsigned()->default(0)->comment('Цена поступления');
            $table->boolean('realized')->default(false)->comment('Реализован?');
            $table->boolean('realized_data')->nullable()->comment('Дата реализации');
            $table->timestamps();
        });
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->unique();
            $table->unsignedInteger('user_id')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->text('payload');
            $table->integer('last_activity');
        });
        Schema::create('user_actions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->default(1)->unsigned()->comment('Инициатор');
            $table->bigInteger('company_id')->unsigned()->comment('Компания');
            $table->char('model')->comment('Модель');
            $table->char('type')->comment('Тип');
            $table->bigInteger('model_id')->comment('Модель ID');
            $table->char('message')->comment('Cообщение');
            $table->timestamps();
        });
        Schema::create('day_off_type', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('type')->comment('Наименование Типа');
            $table->timestamps();
        });
        Schema::create('schedule', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('company_id')->nullable();
            $table->bigInteger('partner_id')->nullable();
            $table->string('dayType')->nullable();
            $table->integer('dayTypeId')->nullable();
            $table->string('dayTypeText')->nullable();
            $table->date('date')->nullable();
            $table->time('start')->nullable();
            $table->time('end')->nullable();
            $table->timestamps();
        });

        $tableNames = config('permission.table_names');
        $columnNames = config('permission.column_names');
        Schema::create($tableNames['permissions'], function (Blueprint $table) {
            $table->bigIncrements('id');
            //$table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->string('name');
            $table->string('guard_name');
            $table->string('model');
            $table->string('type');
            $table->timestamps();
        });
        Schema::create($tableNames['roles'], function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->string('name');
            $table->string('guard_name');
            $table->timestamps();
        });
        Schema::create($tableNames['model_has_permissions'], function (Blueprint $table) use ($tableNames, $columnNames) {
            $table->unsignedBigInteger('permission_id');

            $table->string('model_type');
            $table->unsignedBigInteger($columnNames['model_morph_key']);
            $table->index([$columnNames['model_morph_key'], 'model_type'], 'model_has_permissions_model_id_model_type_index');

            $table->foreign('permission_id')
                ->references('id')
                ->on($tableNames['permissions'])
                ->onDelete('cascade');

            $table->primary(['permission_id', $columnNames['model_morph_key'], 'model_type'],
                'model_has_permissions_permission_model_type_primary');
        });
        Schema::create($tableNames['model_has_roles'], function (Blueprint $table) use ($tableNames, $columnNames) {
            $table->unsignedBigInteger('role_id');

            $table->string('model_type');
            $table->unsignedBigInteger($columnNames['model_morph_key']);
            $table->index([$columnNames['model_morph_key'], 'model_type'], 'model_has_roles_model_id_model_type_index');

            $table->foreign('role_id')
                ->references('id')
                ->on($tableNames['roles'])
                ->onDelete('cascade');

            $table->primary(['role_id', $columnNames['model_morph_key'], 'model_type'],
                'model_has_roles_role_model_type_primary');
        });
        Schema::create($tableNames['role_has_permissions'], function (Blueprint $table) use ($tableNames) {
            $table->unsignedBigInteger('permission_id');
            $table->unsignedBigInteger('role_id');

            $table->foreign('permission_id')
                ->references('id')
                ->on($tableNames['permissions'])
                ->onDelete('cascade');

            $table->foreign('role_id')
                ->references('id')
                ->on($tableNames['roles'])
                ->onDelete('cascade');

            $table->primary(['permission_id', 'role_id'], 'role_has_permissions_permission_id_role_id_primary');
        });
        app('cache')
            ->store(config('permission.cache.store') != 'default' ? config('permission.cache.store') : null)
            ->forget(config('permission.cache.key'));
        Schema::create('refund', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('manager_id')->unsigned()->comment('Привязка к менеджеру');
            $table->bigInteger('partner_id')->unsigned()->comment('Привязка к покупателю');
            $table->bigInteger('company_id')->unsigned()->comment('Привязка к компании');
            $table->bigInteger('store_id')->unsigned()->comment('Привязка к складу');
            $table->bigInteger('shipment_id')->unsigned()->nullable()->comment('Привязка к заказу');
            $table->decimal('summ', 12, 2)->comment('Общая цена');
            $table->char('comment')->nullable()->comment('Комментарий');
            $table->double('wsumm')->default(0.00)->comment('Оплаченная сумма');
            $table->timestamps();
        });
        Schema::create('article_refund', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('article_id')->unsigned()->comment('Привязка к товару');
            $table->bigInteger('refund_id')->unsigned()->comment('Привязка к возврату');
            $table->bigInteger('store_id')->nullable()->unsigned()->comment('Привязка к складу');
            $table->integer('count')->nullable()->unsigned()->comment('Кол - во');
            $table->double('price')->nullable()->unsigned()->comment('Цена');
            $table->double('total')->nullable()->unsigned()->comment('Цена общая');
            $table->timestamps();
        });
        Schema::create('refund_warrant', function (Blueprint $table) {
            $table->bigInteger('warrant_id')->unsigned()->comment('Привязка к операции');
            $table->bigInteger('refund_id')->unsigned()->comment('Привязка к возврату');
        });
        Schema::create('statistics', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('company_id');
            $table->decimal('expenses');
            $table->dateTime('created_at');
        });
        Schema::create('payment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('OrderId')->nullable();
            $table->unsignedBigInteger('company_id')->comment('Привязка к компании');
            $table->unsignedInteger('add_days')->comment('Прибавлено дней');
            $table->unsignedInteger('add_balance')->comment('Прибавлено денег');
            $table->unsignedBigInteger('partner_id')->comment('Привязка к Плательщику');
            $table->bigInteger('paymentId')->nullable()->comment('ID оплаты');
            $table->bigInteger('amount')->nullable()->comment('Сумма в копейках');
            $table->char('paymentUrl')->nullable()->comment('Ссылка для оплаты');
            $table->text('response')->nullable()->comment('Ответ банка');
            $table->char('status')->nullable()->comment('Статус');
            $table->text('token')->nullable()->comment('Токен');
            $table->char('error')->nullable()->comment('Ошибка');
            $table->timestamps();
        });
        Schema::create('images', function (Blueprint $table) {
            $table->increments('id');
            $table->string('mime')->nullable()->comment('МИМ тип');
            $table->string('size')->nullable()->comment('Размер');
            $table->string('filename')->nullable()->comment('Имя файла с расширением');
            $table->integer('rank')->unsigned()->nullable()->comment('Позиция');
            $table->string('url')->comment('URL строка');
            $table->string('thumb_url')->nullable()->comment('Путь до thumb');
            $table->string('hash')->nullable();
            $table->integer('uploader_id')->unsigned()->comment('Кем загружено');
            $table->timestamps();
        });
        Schema::create('vehicles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('partner_id')->nullable();
            $table->foreign('partner_id')->on('partners')->references('id')->onDelete('cascade');
            $table->unsignedBigInteger('mark_id');
            $table->unsignedBigInteger('model_id');
            $table->unsignedBigInteger('modify_id');
            $table->string('color')->nullable();
            $table->string('type')->nullable();
            $table->string('vin_code')->nullable();
            $table->integer('year')->nullable();
            $table->string('numberplate')->nullable();
            $table->timestamps();
        });
        Schema::create('vehicle_marks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
        });
        Schema::create('vehicle_models', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('mark_id');
            $table->string('name');
        });
        Schema::create('vehicle_modifies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('model_id');
            $table->string('name');
        });
        Schema::table('partner_phone', function (Blueprint $table) {
            $table->foreign('phone_id')->references('id')->on('phones')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_resets');
        Schema::dropIfExists('companies');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('settings');
        Schema::dropIfExists('articles');
        Schema::dropIfExists('stores');
        Schema::dropIfExists('suppliers');
        Schema::dropIfExists('partner_types');
        Schema::dropIfExists('phones');
        Schema::dropIfExists('passports');
        Schema::dropIfExists('price_types');
        Schema::dropIfExists('measurements');
        Schema::dropIfExists('salaries');
        Schema::dropIfExists('cashboxes');
        Schema::dropIfExists('dds_articles');
        Schema::dropIfExists('dds_types');
        Schema::dropIfExists('partners');
        Schema::dropIfExists('warrants');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('shipments');
        Schema::dropIfExists('entrances');
        Schema::dropIfExists('article_order');
        Schema::dropIfExists('article_store');
        Schema::dropIfExists('partner_phone');
        Schema::dropIfExists('order_warrant');
        Schema::dropIfExists('article_shipment');
        Schema::dropIfExists('article_entrance');
        Schema::dropIfExists('contract');
        Schema::dropIfExists('contrac_types');
        Schema::dropIfExists('money_move');
        Schema::dropIfExists('client_orders');
        Schema::dropIfExists('article_client_orders');
        Schema::dropIfExists('provider_orders');
        Schema::dropIfExists('article_provider_orders');
        Schema::dropIfExists('salary_schemas');
        Schema::dropIfExists('salary_schemas_partner');
        Schema::dropIfExists('adjustments');
        Schema::dropIfExists('article_adjustment');
        Schema::dropIfExists('system_message');
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('sms_confirmation');
        Schema::dropIfExists('client_orders_warrant');
        Schema::dropIfExists('provider_order_warrant');
        Schema::dropIfExists('s_m_s_messages');
        Schema::dropIfExists('s_m_s_message_client_order');
        Schema::dropIfExists('article_stock');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('user_actions');
        Schema::dropIfExists('day_off_type');
        Schema::dropIfExists('schedule');

        $tableNames = config('permission.table_names');
        Schema::dropIfExists($tableNames['role_has_permissions']);
        Schema::dropIfExists($tableNames['model_has_roles']);
        Schema::dropIfExists($tableNames['model_has_permissions']);
        Schema::dropIfExists($tableNames['roles']);
        Schema::dropIfExists($tableNames['permissions']);
        Schema::dropIfExists('refund');
        Schema::dropIfExists('article_refund');
        Schema::dropIfExists('refund_warrant');
        Schema::dropIfExists('statistics');
        Schema::dropIfExists('payment');
        Schema::dropIfExists('images');
        Schema::dropIfExists('vehicles');
        Schema::dropIfExists('vehicle_marks');
        Schema::dropIfExists('vehicle_models');
        Schema::dropIfExists('vehicle_modifies');
    }
}
