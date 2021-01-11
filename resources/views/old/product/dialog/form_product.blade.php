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
    <button class="btn_close" onclick="window.alerts.hideDialog({{ $class }})">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>

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
            awd
        </div>

        <div class="nav-active-border b-info py-0 dark">
            <ul class="nav">
                <li class="nav-item">
                    <a class="nav-link active" href="#{{$class}}_tab_base" data-toggle="tab" data-target="#{{$class}}_tab_base">
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
        <div class="row no-gutters align-items-stretch">
            <div class="col-md-12 lt">
                <div class="tab-content mb-3">
                    @include('product.dialog.tabs.base')
                    @include('product.dialog.tabs.store')
                    @include('product.dialog.tabs.barcode')
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="submit" onclick="window.{{ $class }}.save(this)" class="btn success pull-right">Сохранить</button>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
