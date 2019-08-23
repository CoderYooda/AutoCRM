<div class="tab-pane animate fadeIn text-muted active" id="tab_base_uridical">

    <div class="form-group">
        <label for="category_id">В категории</label>
        <div class="input-group mb-3">
            <select name="category_id" disabled name="category_id" class="category_select form-control input-c noarrow fake-disabled" readonly>
                @if(isset($category))
                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                @elseif(isset($product))
                    <option value="{{ $product->category()->first()->id }}">{{ $product->category()->first()->name }}</option>
                @else
                    <option>Корневая директория</option>
                @endif
            </select>
            <div class="input-group-append">
                <button onclick="openDialog('selectCategory', @if(isset($product))'&selected_category_id={{ $product->category_id }}'@else'&selected_category_id=3'@endif);"
                        class="btn white" type="button"><i class="fa fa-bars"></i></button>
            </div>
        </div>
    </div>
    <div class="form-group">
        <label>Название компании</label>
        <input type="text" name="companyName"
               @if(isset($partner)) value="{{ $partner->companyName }}" @endif
               class="form-control" placeholder="Название компании">
    </div>
    <div class="form-group">
        <label>Контактное лицо</label>
        <input type="text" name="ur_fio"
               @if(isset($partner)) value="{{ $partner->fio }}" @endif
               class="form-control" placeholder="Контактное лицо">
    </div>
    <div class="form-group">
        <label>Комментарий</label>
        <textarea type="text" name="ur_comment" class="form-control" placeholder="Комментарий">@if(isset($partner)){{ $partner->email }}@endif</textarea>
    </div>
</div>
