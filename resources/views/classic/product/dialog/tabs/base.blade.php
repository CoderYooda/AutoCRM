<div class="tab-pane p-3 active" id="{{$class}}_tab_base">

    <div id="provider_search_container" class="provider_search_container fade" data-simplebar style="max-height: 400px;">
        <div class="cont"></div>
    </div>
    <div class="form-group">
        <label>Артикул <i id="trin_preload" class="fa fa-spinner fa-spin hide"></i></label>
        <input  type="text" name="article" id="product_dialog_focused"
               @if(isset($product))value="{{ $product->article }}"@endif
               @if(isset($request) && $request['article'] != NULL)value="{{ $request['article'] }}"@endif
               class="form-control" placeholder="Артикул детали (не более 64 символов)">
    </div>
    <div class="form-group">
        <label>Наименование</label>
        <input type="text" name="name"
               @if(isset($product)) value="{{ $product->name }}" @endif
               @if(isset($request['provided_name'])) value="{{ $request['provided_name'] }}" @endif
               class="form-control" placeholder="Наименование (не более 255 символов)" autofocus>
    </div>
    <div class="form-group">
        <label for="category_id">В категории</label>
        <div class="input-group mb-3">
            <button onclick="{{ $class }}.openSelectCategoryDialog()" type="button" name="category_id" class="category_select form-control text-left button_select">
                @if(isset($product))
                    {{ $product->category()->first()->name }}
                @elseif(isset($category))
                    {{ $category->name }}
                @else
                    Корневая директория
                @endif
            </button>
        </div>
    </div>
    <div class="form-group">
        <label for="supplier_id">Производитель</label>
        <div class="input-group mb-3">
            @if(isset($request) && $request['brand'] != NULL)
                <input type="hidden" name="new_supplier_name" value="{{ $request['brand'] }}">
            @else
                <input type="hidden" name="new_supplier_name" value="">
            @endif
            <button onclick="{{ $class }}.openSelectSupplierDialog()" type="button" name="supplier_id" class="supplier_select form-control text-left button_select">
                @if(isset($product))
                    {{ $product->supplier()->first()->name }}
                @elseif(isset($request) && $request['brand'] != NULL)
                    {{ $request['brand'] }}
                @else
                    Не выбран
                @endif
            </button>
        </div>
    </div>
</div>
