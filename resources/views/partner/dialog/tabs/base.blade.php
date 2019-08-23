<div class="tab-pane animate fadeIn text-muted active" id="tab_base">

    <div class="form-group">
        <label for="category_id">В категории</label>
        <div class="input-group mb-3">
            <select name="category_id" disabled class="category_select form-control input-c noarrow fake-disabled" readonly>
                @if(isset($category))
                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                @elseif(isset($partner))
                    <option value="{{ $partner->category()->first()->id }}">{{ $partner->category()->first()->name }}</option>
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
    <div class="form-group">
        <label>ФИО</label>
        <input type="text" name="fio"
               @if(isset($partner)) value="{{ $partner->fio }}" @endif
               class="form-control" placeholder="ФИО">
    </div>
    <div class="form-group">
        <label>Дата рождения</label>
        <input type="text" name="birthday"
               @if(isset($partner)) value="{{ $partner->birthday }}" @endif
               class="form-control date_picker" placeholder="Выберите дату">
    </div>
    <div class="form-group">
        <label>Комментарий</label>
        <textarea type="text" name="comment" class="form-control" placeholder="Комментарий">@if(isset($partner)){{ $partner->comment }}@endif</textarea>
    </div>
</div>
