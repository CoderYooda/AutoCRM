<div class="tab-pane p-3 active" id="{{$class}}_tab_base">
    <div class="form-group">
        <label>Наименование</label>
        <input type="text" name="name"
               @if(isset($product)) value="{{ $product->name }}" @endif
               @if(isset($request['provided_name'])) value="{{ $request['provided_name'] }}" @endif
               class="form-control" placeholder="Наименование (не более 255 символов)">
    </div>
    <div class="form-group">
        <label for="category_id">В категории</label>
        <div class="input-group mb-3">
            <select name="category_id" disabled class="category_select form-control input-c noarrow fake-disabled" readonly>
                @if(isset($product))
                    <option value="{{ $product->category()->first()->id }}">{{ $product->category()->first()->name }}</option>
                @elseif(isset($category))
                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                @else
                    <option>Корневая директория</option>
                @endif
            </select>
            <div class="input-group-append">
                <button onclick="{{ $class }}.openSelectCategoryDialog()"
                        class="btn white" type="button"><i class="fa fa-bars"></i></button>
            </div>
        </div>
    </div>
    <div class="form-group">
        <label for="supplier_id">Производитель</label>
        <div class="input-group mb-3">
            @if(isset($request) && $request['brand'] != NULL)
            <input type="hidden" name="new_supplier_name" value="{{ $request['brand'] }}">
            @endif
            <select name="supplier_id" disabled class="supplier_select form-control input-c noarrow fake-disabled" readonly>
                @if(isset($product))
                    <option value="{{ $product->supplier()->first()->id }}" hidden>{{ $product->supplier()->first()->name }}</option>
                @elseif(isset($request) && $request['brand'] != NULL)
                    <option hidden>{{ $request['brand'] }}</option>
                @else
                    <option value="0" hidden>Не выбран</option>
                @endif
            </select>
            <div class="input-group-append">
                <button onclick="openDialog('selectSupplier');" class="btn white" type="button"><i class="fa fa-bars"></i></button>
            </div>
        </div>
    </div>
    <div class="form-group">
        <label>Артикул</label>
        <input type="text" name="article"
                @if(isset($product))value="{{ $product->article }}"@endif
                @if(isset($request) && $request['article'] != NULL)value="{{ $request['article'] }}"@endif
                class="form-control" placeholder="Артикул детали (не более 64 символов)">
    </div>
</div>
