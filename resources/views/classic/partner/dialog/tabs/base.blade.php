
@if($partner || $category->id == 3)
    <div class="form-group">
        <label for="category_id">В категорию</label>
        <div class="input-group mb-3">
            <button onclick="{{ $class }}.openSelectCategoryDialog({{ $category->id }})"
                type="button" name="category_id" class="category_select form-control text-left button_select">
                @if($category->id == 3)
                    Корневая директория
                @elseif(isset($category))
                    {{ $category->name }}
                @endif
            </button>
        </div>
    </div>
@endif

<div class="form-group fl_only @if(isset($partner) && !$partner['isfl']) d-none-f @endif">
    <label>ФИО</label>
    <input type="text" name="fio" id="fl_dialog_focused"
           @if(isset($partner)) value="{{ $partner->fio }}" @endif
           class="form-control entrance" placeholder="ФИО" @if(isset($partner) && !$partner['isfl']) disabled @endif>
</div>

<div class="form-group fl_only @if(isset($partner) && !$partner['isfl']) d-none-f @endif">
    <label>Дата рождения</label>
    <input onclick="this.select();" type="text" name="birthday"
           @if(isset($partner)) value="{{ $partner->getBirthday() == 'Не указано' ? '' : $partner->getBirthday() }}" @endif
           class="form-control date_picker entrance" placeholder="Выберите дату" @if(isset($partner) && !$partner['isfl']) disabled @endif>
</div>

<div class="form-group ul_only @if(isset($partner) && $partner['isfl']) d-none-f @elseif(!isset($partner)) d-none-f @elseif(!isset($partner)) disabled @endif">
    <label>Название компании</label>
    <input type="text" name="companyName" id="ul_dialog_focused"
           @if(isset($partner)) value="{{ $partner->companyName }}" @endif
           class="form-control entrance" placeholder="Название компании" @if(isset($partner) && $partner['isfl']) disabled @endif>
</div>

<div class="form-group ul_only @if(isset($partner) && $partner['isfl']) d-none-f @elseif(!isset($partner)) d-none-f @endif">
    <label>Контактное лицо</label>
    <input type="text" name="ur_fio"
           @if(isset($partner)) value="{{ $partner->fio }}" @endif
           class="form-control entrance" placeholder="Контактное лицо" @if(isset($partner) && $partner['isfl']) disabled @elseif(!isset($partner)) disabled @endif>
</div>

@include(get_template() . '.partner.dialog.tabs.contacts')

<div class="form-group mb-0">
    <label>Комментарий</label>
    <textarea type="text" name="comment" class="form-control w-100" placeholder="Комментарий">@if(isset($partner)){{ $partner->comment }}@endif</textarea>
</div>