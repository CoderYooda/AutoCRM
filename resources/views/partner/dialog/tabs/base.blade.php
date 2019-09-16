<div class="tab-pane main_tab animate fadeIn text-muted active" id="tab_base{{ $class }}">

    <div class="form-group">
        <label for="category_id">В категории</label>
        <div class="input-group mb-3">
            <select name="category_id" disabled class="category_select form-control input-c noarrow fake-disabled" readonly>
                @if(isset($partner))
                    <option value="{{ $partner->category()->first()->id }}">{{ $partner->category()->first()->name }}</option>
                @elseif(isset($category))
                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                @else
                    <option>Корневая директория</option>
                @endif
            </select>
            <div class="input-group-append">
                <button onclick="openDialog('selectCategory', @if(isset($partner))'&selected_category_id={{ $partner->category_id }}'@else'&selected_category_id=3'@endif);"
                        class="btn white" type="button"><i class="fa fa-bars"></i></button>
            </div>
        </div>
    </div>

    <div class="form-group fl_only @if(isset($partner) && !$partner['isfl']) d-none-f @endif">
        <label>ФИО</label>
        <input type="text" name="fio"
               @if(isset($partner)) value="{{ $partner->fio }}" @endif
               class="form-control entrance" placeholder="ФИО" @if(isset($partner) && !$partner['isfl']) disabled @endif>
    </div>

    <div class="form-group fl_only @if(isset($partner) && !$partner['isfl']) d-none-f @endif">
        <label>Дата рождения</label>
        <input type="text" name="birthday"
               @if(isset($partner)) value="{{ $partner->birthday }}" @endif
               class="form-control date_picker entrance" placeholder="Выберите дату" @if(isset($partner) && !$partner['isfl']) disabled @endif>
    </div>
    <div class="form-group ul_only @if(isset($partner) && $partner['isfl']) d-none-f @elseif(!isset($partner)) d-none-f @elseif(!isset($partner)) disabled @endif">
        <label>Название компании</label>
        <input type="text" name="companyName"
               @if(isset($partner)) value="{{ $partner->companyName }}" @endif
               class="form-control entrance" placeholder="Название компании" @if(isset($partner) && $partner['isfl']) disabled @endif>
    </div>
    <div class="form-group ul_only @if(isset($partner) && $partner['isfl']) d-none-f @elseif(!isset($partner)) d-none-f @endif">
        <label>Контактное лицо</label>
        <input type="text" name="ur_fio"
               @if(isset($partner)) value="{{ $partner->fio }}" @endif
               class="form-control entrance" placeholder="Контактное лицо" @if(isset($partner) && $partner['isfl']) disabled @elseif(!isset($partner)) disabled @endif>
    </div>
    <div class="form-group">
        <label>Комментарий</label>
        <textarea type="text" name="comment" class="form-control" placeholder="Комментарий">@if(isset($partner)){{ $partner->comment }}@endif</textarea>
    </div>
    <div class="form-group">
        <label>Штрих код (EAN 13)</label>
        <input type="text" name="barcode" class="form-control" value="@if(isset($partner)){{ $partner->barcode }}@endif" placeholder="Штрих код">
    </div>
    @if(isset($partner) && $partner->barcode != null)
    <div class="form-group">
        <img style="max-width: 100%" src="data:image/png;base64,{!! \App\Http\Controllers\BarcodeController::getBarCodePNG($partner->barcode) !!}" alt="barcode"   />
    </div>
    @endif

</div>
