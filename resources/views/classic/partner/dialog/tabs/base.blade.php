
@if($partner || $category->id == 3)
    <div class="form-group">
        <label for="category_id">В категорию</label>
        <div class="input-group mb-3">
            <button onclick="{{ $class }}.openSelectCategoryDialog({{ $category->id }})" type="button" name="category_id" class="category_select form-control text-left button_select">{{ $category->name }}</button>
        </div>
    </div>
@endif

<div class="form-group fl_only @done($partner && !$partner['isfl'])">
    <label>ФИО</label>
    <input type="text" name="fio" id="fl_dialog_focused" value="{{ $partner->fio ?? '' }}" class="form-control entrance" placeholder="ФИО" @disabled($partner && !$partner['isfl'])>
</div>

<div class="form-group addable" id="phones_addable">
    <label>Номер телефона <span onclick="window.{{ $class }}.addPhone(this)" class="input_as_link pointer">добавить</span></label>
    <div class="phones">
        @if(isset($partner))
            @foreach($partner->phones()->get() as $phone)
                <div class="input-group mb-10 phone" data-id="{{$phone->id}}">
                    <input type="hidden" name="phones[{{$phone->id}}][id]" value="{{$phone->id}}">
                    <input type="text" name="phones[{{$phone->id}}][number]" value="{{$phone->number}}" class="form-control phone_input" placeholder="Номер телефона">
                    <span class="input-group-append checkbox_append" title="Активный номер">
                        <div class="input-group-text border-left-0">
                            <label class="ui-check" style="margin-bottom: 0;margin-top: 1px;">
                                <input type="radio" name="phones_main" value="{{$phone->id}}" @if($phone->main) checked @endif>
                                <i class="dark-white"></i>
                            </label>
                        </div>
                    </span>
                    <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Удалить номер">
                        <button onclick="{{ $class }}.deletePhone(this)" class="input-group-text butt_del_append" type="button" style="height: auto">
                            <i class="fa fa-trash"></i>
                        </button>
                    </span>
                </div>
            @endforeach
        @endif
        @if(!isset($partner) || $partner->phones()->count() < 1)
            <div class="input-group mb-10 phone">
                <input type="text" name="phones[num1][number]" class="form-control phone_input" placeholder="Номер телефона">
                <span class="input-group-append checkbox_append" title="Активный номер">
                    <div class="input-group-text border-left-0">
                        <label class="ui-check" style="margin-bottom: 0;margin-top: 1px;">
                            <input type="radio" name="phones_main" checked value="num1">
                            <i class="dark-white"></i>
                        </label>
                    </div>
                </span>
                <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Удалить номер">
                    <button onclick="{{ $class }}.deletePhone(this)" class="input-group-text butt_del_append" type="button" style="height: auto">
                        <i class="fa fa-trash"></i>
                    </button>
                </span>
            </div>
        @endif
    </div>
</div>

<div class="form-group fl_only @done($partner && !$partner['isfl'])" @if(!$partner || !$partner->email) style="margin-bottom: 0;" @endif>
    <label>Дата рождения @if(!$partner || !$partner->email) <span onclick="{{ $class }}.showField(this, 'birthday')" class="input_as_link pointer">добавить</span> @endif</label>
    <input onclick="this.select();" type="text" name="birthday"
           @if($partner) value="{{ $partner->getBirthday() == 'Не указано' ? '' : $partner->getBirthday() }}" @endif
           class="form-control date_picker entrance" placeholder="Выберите дату" @hide(!$partner || $partner->getBirthday() == 'Не указано') @disabled($partner && !$partner['isfl'])>
</div>

<div class="form-group fl_only @done(isset($partner) && !$partner['isfl'])" @if(!$partner || !$partner->address) style="margin-bottom: 0;" @endif>
    <label>Адрес проживания <span onclick="{{ $class }}.showField(this, 'address')" class="input_as_link pointer" @hide($partner && $partner->address)>добавить</span></label>
    <input type="text" name="address" value="{{ $partner->address ?? '' }}" class="form-control entrance" placeholder="Адрес проживания" @disabled(isset($partner) && !$partner['isfl']) @hide(!$partner || !$partner->address)>
</div>

<div class="form-group ul_only @done($partner && $partner['isfl'] || !$partner)">
    <label>Название компании</label>
    <input type="text" name="companyName" id="ul_dialog_focused" value="{{ $partner->companyName ?? '' }}" class="form-control entrance" placeholder="Название компании" @disabled($partner && $partner['isfl'])>
</div>

<div class="form-group ul_only @done($partner && $partner['isfl'] || !$partner)">
    <label>Контактное лицо</label>
    <input type="text" name="ur_fio" value="{{ $partner->fio ?? '' }}" class="form-control entrance" placeholder="Контактное лицо" @disabled($partner && $partner['isfl'] || !$partner)>
</div>

<div class="form-group" @if(!$partner || !$partner->email) style="margin-bottom: 0;" @endif>
    <label>Email @if(!$partner || !$partner->email) <span onclick="{{ $class }}.showField(this, 'email')" class="input_as_link pointer">добавить</span> @endif </label>
    <input type="email" name="email" value="{{ $partner->email ?? '' }}" @hide(!$partner || !$partner->email) class="form-control" placeholder="Электронная почта">
</div>

<div class="form-group mb-0">
    <label>Комментарий <span onclick="{{ $class }}.showField(this, 'comment')" class="input_as_link pointer" @hide($partner && $partner->comment)>добавить</span></label>
    <textarea type="text" name="comment" class="form-control w-100" placeholder="Комментарий" @hide(!$partner || !$partner->comment)>@isset($partner){{ $partner->comment }}@endisset</textarea>
</div>