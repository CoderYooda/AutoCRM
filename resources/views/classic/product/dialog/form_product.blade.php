<div
    @if(isset($product) && $product->id != NULL)
        id="productDialog{{$product->id}}"
        @php $class = 'productDialog' . $product->id @endphp
    @else
        id="productDialog"
        @php $class = 'productDialog' @endphp
    @endif
    class="dialog" style="width:600px;">
    @if(isset($product) && $product->id != NULL)
        <div class="titlebar">Редактирование '{{ $product->name }}'</div>
    @else
        <div class="titlebar">Добавление продукта</div>
    @endif

    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>

    <div class="modal-header dark" style="justify-content: normal;">
        <div class="modal-alt-header">
            <span class="item-title _500">Всего на сумму</span>
            <div class="item-except font-weight-bolder h-1x">
                <span id="total_price">
                   {{ $product->getMidPriceByStoreId(session('store_id')) }}
                </span> р
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
    </div>


    <form action="{{ route('StoreProduct') }}" method="POST">
        @csrf
        <input class="category_select" type="hidden" name="category_id" value="
        @if(isset($product)){{ $product->category()->first()->id }}
        @elseif(isset($category)){{ $category->id }}
        @else 2 @endif
            ">
        <input class="supplier_select" type="hidden" name="supplier_id" value="@if(isset($product)){{ $product->supplier()->first()->id }}@elseif(isset($product)){{ $product->category()->first()->id }}@endif">
        @if(isset($product) && $product->id != NULL)
            <input type="hidden" name="id" value="{{ $product->id }}">
        @endif

        <div class="modal-body">
            <div class="row">
                <div class="col-sm-5 no-pr d-flex">
                    <ul class="nav" id="product_tabs">
                        <li class="nav-item active">
                            <a class="nav-link" href="#{{$class}}_tab_base" data-toggle="tab" data-target="#{{$class}}_tab_base">
                                Основные
                                <span class="float-right helper_danger d-none-f">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#{{$class}}_tab_store" data-toggle="tab" data-target="#{{$class}}_tab_store">
                                Склад
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#{{$class}}_tab_barcode" data-toggle="tab" data-target="#{{$class}}_tab_barcode">
                                Штрихкоды
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col-sm-7 no-pl">
                    <div class="tab-content mb-3 pl-8">
                        @include(env('DEFAULT_THEME', 'classic') . '.product.dialog.tabs.base')
                        @include(env('DEFAULT_THEME', 'classic') . '.product.dialog.tabs.store')
                        @include(env('DEFAULT_THEME', 'classic') . '.product.dialog.tabs.barcode')
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-footer">
            <button type="submit" onclick="window.{{ $class }}.finitaLaComedia()" class="button white">Закрыть</button>
            <button type="submit" onclick="window.{{ $class }}.save(this)" class="button primary pull-right">Сохранить</button>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
