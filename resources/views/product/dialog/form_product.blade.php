<div
    @if(isset($product) && $product->id != NULL)
        id="productDialog{{$product->id}}"
        @php $class = 'productDialog' @endphp
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

    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>
    <form action="{{ route('StoreProduct') }}" method="POST">
        @csrf
        <input class="category_select" type="hidden" name="category_id" value="@if(isset($category)){{ $category->id }}@elseif(isset($product)){{ $product->category()->first()->id }}@else 2 @endif">
        <input class="supplier_select" type="hidden" name="supplier_id" value="@if(isset($product)){{ $product->supplier()->first()->id }}@elseif(isset($product)){{ $product->category()->first()->id }}@endif">
        @if(isset($product) && $product->id != NULL)
            <input type="hidden" name="id" value="{{ $product->id }}">
        @endif
        <div class="row no-gutters align-items-stretch">
            <div class="col-md-4 light lt">
                <div class="nav-active-border b-success left right box mb-0">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link block active" href="#tab_base" data-toggle="tab" data-target="#tab_base">
                                Основные
                                <span class="float-right helper_danger d-none-f">
                                    <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                                </span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link block" href="#tab_store" data-toggle="tab" data-target="#tab_store">
                                Склад
                                <span class="float-right helper_danger d-none-f">
                                    <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                                </span>
                            </a>
                        </li>
{{--                        <li class="nav-item">--}}
{{--                            <a class="nav-link block" href="#" data-toggle="tab" data-target="#tab3">--}}
{{--                                Настройка цен--}}
{{--                                <span class="float-right helper_danger d-none-f">--}}
{{--                                    <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>--}}
{{--                                </span>--}}
{{--                            </a>--}}
{{--                        </li>--}}
{{--                        <li class="nav-item">--}}
{{--                            <a class="nav-link block" href="#" data-toggle="tab" data-target="#tab4">--}}
{{--                                Описание--}}
{{--                                <span class="float-right helper_danger d-none-f">--}}
{{--                                    <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>--}}
{{--                                </span>--}}
{{--                            </a>--}}
{{--                        </li>--}}
                    </ul>
                </div>
            </div>
            <div class="col-md-8 light lt">
                <div class="tab-content p-3 mb-3">
                    @include('product.dialog.tabs.base')
                    @include('product.dialog.tabs.store')
                </div>
            </div>
            <div class="col-md-12 p-3">
                <button type="submit" onclick="window.{{ $class }}.save(this)" class="btn success pull-right">Сохранить</button>
            </div>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
