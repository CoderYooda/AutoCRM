
@if($partner || $category->id == 3)
    <div class="form-group fl ip ul">
        <label for="category_id">В категорию</label>
        <div class="input-group mb-3">
            <button onclick="{{ $class }}.openSelectCategoryDialog({{ $category->id }})" type="button" name="category_id" class="category_select form-control text-left button_select">{{ $category->name }}</button>
        </div>
    </div>
@endif

<div class="form-group fl ip">
    <label>ФИО</label>
    <input type="text" name="fio" id="fl_dialog_focused" value="{{ $partner->fio ?? '' }}" class="form-control entrance" placeholder="ФИО" @disabled($partner && $partner->type != 0)>
</div>

<div class="form-group addable fl ip ul" id="phones_addable">
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

<div class="form-group fl @if(!$partner || !$partner->address) mb-0 @endif">
    <label>Дата рождения @if(!$partner || !$partner->email) <span onclick="{{ $class }}.showField(this, 'birthday')" class="input_as_link pointer">добавить</span> @endif</label>
    <input onclick="this.select();" type="text" name="birthday"
           @if($partner) value="{{ $partner->getBirthday() == 'Не указано' ? '' : $partner->getBirthday() }}" @endif
           class="form-control date_picker entrance @if(!$partner || !$partner->email) d-none @endif" placeholder="Выберите дату">
</div>

<div class="form-group fl @if(!$partner || !$partner->address) mb-0 @endif">
    <label>Адрес проживания <span onclick="{{ $class }}.showField(this, 'address')" class="input_as_link pointer" @hide($partner && $partner->address)>добавить</span></label>
    <input type="text" name="address" value="{{ $partner->address ?? '' }}" class="form-control entrance @if(!$partner || !$partner->email) d-none @endif" placeholder="Адрес проживания">
</div>

<div class="form-group ul">
    <label>Название компани</label>
    <div class="d-flex">
        <input type="text" name="opf" style="flex: 0 0 14%;" maxlength="3" value="{{ $partner->opf ?? '' }}" class="form-control entrance mr-5" placeholder="ЗАО">
        <input type="text" name="companyName" id="ul_dialog_focused" value="{{ $partner->companyName ?? '' }}" class="form-control entrance" placeholder="Название компании">
    </div>
</div>

<div class="form-group ul">
    <label>Контактное лицо</label>
    <input type="text" name="ur_fio" value="{{ $partner->fio ?? '' }}" class="form-control entrance" placeholder="Контактное лицо">
</div>

<div class="form-group fl ip ul @if(!$partner || !$partner->address) mb-0 @endif">
    <label>Email @if(!$partner || !$partner->email) <span onclick="{{ $class }}.showField(this, 'email')" class="input_as_link pointer">добавить</span> @endif </label>
    <input type="email" name="email" value="{{ $partner->email ?? '' }}" class="form-control @if(!$partner || !$partner->email) d-none @endif" placeholder="Электронная почта">
</div>
<div class="form-group fl ip ul @if(!$partner || !$partner->comment) mb-0 @endif">
    <label>Комментарий @if(!$partner || !$partner->comment) <span onclick="{{ $class }}.showField(this, 'comment')" class="input_as_link pointer">добавить</span> @endif</label>
    <textarea type="text" name="comment" class="form-control w-100 @if(!$partner || !$partner->comment) d-none @endif" placeholder="Комментарий">@isset($partner){{ $partner->comment }}@endisset</textarea>
</div>
