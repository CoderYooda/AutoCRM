<div class="row row-sm">
    <div id="search_partner_categories" class="col-sm-3 no-pr">
        @include(get_template() . '.category.modal_categories')
    </div>
    <div class="col-sm-9 no-pl">
        @if($products->count())
            <div data-simplebar style="max-height: 400px;">
                <div class="box-body">
                    <ul  class="nav select-list-modal ">
                        @foreach($products as $product)
                            <li id="product_item_{{ $product->id }}" data-article_id="{{ $product->id }}" onclick="{{$request['refer']}}.addProduct(this, 'selectProductDialog');" class="list-item pointer d-flex " >
                                <div class="ring-ico">
                                    <i class="fa fa-cogs" style="font-size: 22px;"></i>
                                </div>
                                <div class="list-title">
                                    {{ $product->name }}
                                    <div class="secondary">ID {{ $product->id }}</div>
                                </div>
                                <div class="list-body">
                                    <div class="date">Артикул: {{ $product->article }}</div>
                                    <div class="secondary">Производитель: {{ $product->supplier->name }}</div>
                                    <div class="secondary">Количество на складе: {{ $product->getEntrancesCount() }}</div>
                                </div>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        @elseif($request && $request['string'] != null)
            <div class="padding text-center">
                <div>
                    <div class="out_of_search"></div>
                    <div class="mb-15">
                        Товаров по запросу <b>{{ $request['string'] }}</b> не найдено
                    </div>

                </div>
                <button onclick="openDialog('productDialog', '&category_select={{ $categories['parent']->id }}' )" class="button success mb-15">Новый товар</button>
            </div>
        @else
            <div class="padding text-center">
                <div>
                    <div class="out_of_search"></div>
                    <div class="mb-15">
                        Товаров в этой категории нет
                    </div>
                </div>
                <button onclick="openDialog('productDialog', '&category_select={{ $categories['parent']->id }}' )" class="button success mb-15">Новый товар</button>
            </div>
        @endif
    </div>
</div>


