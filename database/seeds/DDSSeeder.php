<?php

use Illuminate\Database\Seeder;
use App\Models\DdsType;
use App\Models\DdsArticle;

class DDSSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DdsType::create(['id' => 1, 'name' => 'Поступление от продажи продукции и товаров, выполнения работ, оказания услуг',]);
        DdsType::create(['id' => 2, 'name' => 'Прочие поступления по текущим операциям',]);
        DdsType::create(['id' => 3, 'name' => 'Получение кредитов и займов',]);
        DdsType::create(['id' => 4, 'name' => 'Поступления от выпуска акций, увеличение долей участия',]);
        DdsType::create(['id' => 5, 'name' => 'Прочие поступления от финансовых операций',]);
        DdsType::create(['id' => 6, 'name' => 'Прочие поступления по инвестиционным операциям',]);
        DdsType::create(['id' => 7, 'name' => 'Выплата процентов по долговым обязательствам, включаемым в стоимость инвестиционного актива',]);
        DdsType::create(['id' => 8, 'name' => 'Прочие платежи по инвестиционным операциям',]);
        DdsType::create(['id' => 9, 'name' => 'Выпуск облигаций, векселей и других долговых ценных бумаг и др.',]);
        DdsType::create(['id' => 10, 'name' => 'Выплата дивидендов и других платежей в пользу собственников',]);
        DdsType::create(['id' => 11, 'name' => 'Прочие платежи по финансовым операциям',]);
        DdsType::create(['id' => 12, 'name' => 'Прочие платежи по текущим операциям',]);
        DdsType::create(['id' => 13, 'name' => 'Оплата труда',]);
        DdsType::create(['id' => 14, 'name' => 'Оплата товаров, работ, услуг, сырья и иных оборотных активов',]);
        DdsType::create(['id' => 15, 'name' => 'Внутреннее перемещение наличных денежных средств',]);

        DdsArticle::create(['id' => 1, 'category_id' => 8, 'name' => 'Выдача З.П.', 'company_id' => null, 'locked' => true, 'dds_types_id' => 13]);
        DdsArticle::create(['id' => 2, 'category_id' => 9, 'name' => 'Продажа товара', 'company_id' => null, 'locked' => true, 'dds_types_id' => 1]);
        DdsArticle::create(['id' => 3, 'category_id' => 9, 'name' => 'Погашение кредита', 'company_id' => null, 'locked' => true, 'dds_types_id' => 3]);
    }
}

