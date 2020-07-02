
<div class="form-group fl ip ul">
    <label>Доступ в систему</label>
    <select onchange="{{ $class }}.toggleAccess(this)" name="access" class="form-control input-c">
        @if(isset($partner) && $partner->user != null)
            <option value="1" @if(isset($partner) && $partner->user()->first()->banned_at == null) selected @endif>Разрешен</option>
            <option value="0" @if(isset($partner) && $partner->user()->first()->banned_at != null) selected @endif>Запрещен</option>
        @else
            <option value="1">Разрешен</option>
            <option value="0" selected>Запрещен</option>
        @endif
    </select>
</div>

@if(isset($partner) && $partner->user != null)
    @if($partner->user->banned_at != null)
        <span> Пользователь был заблокирован {{ $partner->user->banned_at }}</span>
    @else
        <span> Пользователь был создан {{ $partner->user->created_at }}</span>
    @endif
@endif
<div class="account_data hide">
    <div class="form-group">
        <label>Привязать к магазину</label>
        <select name="store_id" class="form-control input-c">
            @foreach($stores as $store)
                <option value="{{ $store->id }}" @if(isset($partner) && $partner->store_id == $store->id) selected @elseif(Auth::user()->partner->store_id == $store->id) selected @endif>{{ $store->name }}</option>
            @endforeach
        </select>
    </div>
    <div class="form-group">
        <label>Номер телефона</label>
        <input id="phone_login_input" type="text" name="phone" class="form-control" value="{{ $partner->user->phone ?? '' }}" placeholder="Телефон">
        <div class="primary mt-15 p-15">
            Пароль для доступа будет оправлен по SMS
        </div>
    </div>
</div>

