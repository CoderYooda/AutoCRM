
<div class="form-group">
    <label>Доступ в систему</label>
    <select onchange="{{ $class }}.toggleAccess(this)" name="access" class="form-control input-c">
        @if(isset($partner) && $partner->user()->first() != null)
            <option value="1" @if(isset($partner) && $partner->user()->first()->banned_at == null) selected @endif>Разрешен</option>
            <option value="0" @if(isset($partner) && $partner->user()->first()->banned_at != null) selected @endif>Запрещен</option>
        @else
            <option value="1">Разрешен</option>
            <option value="0" selected>Запрещен</option>
        @endif
    </select>
</div>

@if(isset($partner) && $partner->user()->first() != null)
    @if($partner->user()->first()->banned_at != null)
        <span> Пользователь был заблокирован {{ $partner->user()->first()->banned_at }}</span>
    @else
        <span> Пользователь был создан {{ $partner->user()->first()->created_at }}</span>
    @endif
@endif
<div @if(isset($partner) && $partner->user()->first() != null ) style="display: none" @endif>
    <div class="form-group account_data hide ">
        <label>Привязать к магазину</label>
        <select name="store_id" class="form-control input-c">
            @foreach($stores as $store)
                <option value="{{ $store->id }}" @if(isset($partner) && $partner->store_id == $store->id) selected @elseif(Auth::user()->partner()->first()->store_id == $store->id) selected @endif>{{ $store->name }}</option>
            @endforeach
        </select>
    </div>
    <div class="form-group account_data hide">
        <label>Номер телефона</label>
        <select id="country" class="form-control input-c" name="country" onchange="window.{{$class}}.changeCountry(this)" required>
            <option value="7">Россия</option>
            <option value="375">Беларусь</option>
            <option value="380">Украина</option>
            <option value="7">Казахстан</option>
        </select>
        <input id="phone_login_input" type="text" name="phone" class="form-control mt-15" value="@if(isset($partner)){{ $partner->phone }}@endif" placeholder="Телефон">
        <div class="primary mt-15 p-15">
            <b>Внимание!</b> Данному пользователю предоставится доступ к системе. Пароль сгенерируется автоматически и отправится по указаному номеру.
        </div>
    </div>
</div>

