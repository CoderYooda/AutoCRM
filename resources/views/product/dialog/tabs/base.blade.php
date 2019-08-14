<div class="tab-pane animate fadeIn text-muted active" id="tab_base">
    <div class="form-group">
        <label>Наименование</label>
        <input type="text" name="name" @if(isset($product)) value="{{ $product->name }}" @endif class="form-control" placeholder="Наименование (не более 255 символов)">
    </div>
    <div class="form-group">
        <label for="category_id">В категории</label>
        <div class="input-group mb-3">
            <select name="category_id" disabled name="category_id" class="category_select form-control input-c noarrow fake-disabled" readonly>
                @if(isset($category))
                    <option >{{ $category->name }}</option>
                @elseif(isset($product))
                    <option>{{ $product->category()->first()->name }}</option>
                @else
                    <option>Корневая директория</option>
                @endif
            </select>
            <div class="input-group-append">
                <button onclick="openDialog('selectCategory', @if(isset($product)){{ $product->category_id }}@else 2 @endif);"
                        class="btn white" type="button"><i class="fa fa-bars"></i></button>
            </div>
        </div>
    </div>
    <div class="form-group">
        <label for="supplier_id">Производитель</label>
        <div class="input-group mb-3">
            <select name="supplier_id" disabled class="supplier_select form-control input-c noarrow fake-disabled" readonly>
                @if(isset($product))
                    <option value="{{ $product->supplier()->first()->id }}" hidden>{{ $product->supplier()->first()->name }}</option>
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
        <input type="text" name="article" @if(isset($product))value="{{ $product->article }}"@endif class="form-control" placeholder="Артикул детали (не более 64 символов)">
    </div>
</div>
