<div class="tab-pane animate fadeIn text-muted" id="tab_cars">
    @if(isset($partner) && $partner->car()->first())
        <input type="hidden" name="passport_id" value="{{$partner->car()->first()->id}}">
    @endif
    <div class="form-group row">
        <label class="col-sm-4 col-form-label">Модель</label>
        <div class="col-sm-8">
            <div class="input-group">
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
    </div>

    <div class="form-group row">
        <label class="col-sm-4 col-form-label">Год</label>
        <div class="col-sm-8">
        <input type="text" name="year"
               @if(isset($partner)) value="{{ $partner->fio }}" @endif
               class="form-control" placeholder="Год выпуска">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-4 col-form-label">VIN</label>
        <div class="col-sm-8">
        <input type="text" name="vin"
               @if(isset($partner)) value="{{ $partner->fio }}" @endif
               class="form-control" placeholder="VIN">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-4 col-form-label">Гос. номер</label>
        <div class="col-sm-8">
        <input type="text" name="gosNumber"
               @if(isset($partner)) value="{{ $partner->fio }}" @endif
               class="form-control" placeholder="Гос. номер">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-4 col-form-label">Объем двc</label>
        <div class="col-sm-8">
        <input type="text" name="engineSize"
               @if(isset($partner)) value="{{ $partner->fio }}" @endif
               class="form-control" placeholder="Объем двигателя">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-4 col-form-label">Номер шасси</label>
        <div class="col-sm-8">
        <input type="text" name="axleNumber"
               @if(isset($partner)) value="{{ $partner->fio }}" @endif
               class="form-control" placeholder="Номер шасси">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-4 col-form-label">ПТС</label>
        <div class="col-sm-8">
        <input type="text" name="pts"
               @if(isset($partner)) value="{{ $partner->fio }}" @endif
               class="form-control" placeholder="ПТС">
        </div>
    </div>
</div>
