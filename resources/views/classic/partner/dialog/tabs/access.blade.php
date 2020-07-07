
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
        <span>Пользователь был заблокирован {{ $partner->user->banned_at }}</span>
    @else
        <span>Пользователь был создан {{ $partner->user->created_at }}</span>
    @endif
@endif

<div class="account_data hide @if($partner && $partner->user) d-none @endif">
    <div class="form-group fl ip ul">
        <label>Привязать к магазину</label>
        <select name="store_id" class="form-control input-c">
            @foreach($stores as $store)
                <option value="{{ $store->id }}" @if(isset($partner) && $partner->store_id == $store->id) selected @elseif(Auth::user()->partner->store_id == $store->id) selected @endif>{{ $store->name }}</option>
            @endforeach
        </select>
    </div>

    @can('Редактировать настройки')

        <div class="form-group fl ip ul @if($partner && $partner->category->name != 'Сотрудники') hide @endif">
            <label>Роль</label>

            <div class="dropdown role_select_cont" onclick="window.helper.openModal(this, event)">
                <input readonly id="role" name="role" type="text" value="Не выбрано" class="form-control role_selector pointer" >
                <input name="role_id" type="hidden" value="{{ $partner->user->roles[0]->id ?? '' }}" />
                <div class="dropdown_container">
                    <div class="arrow"></div>
                    @foreach($roles as $role)
                        <span onclick="{{ $class }}.setRole(this, {{ $role->id }})" class="element">{{ $role->name }}</span>
                    @endforeach
                </div>
            </div>
        </div>

    @endcan

    <div class="form-group fl ip ul">
        <label>Номер телефона</label>
        <input id="phone_login_input" onchange="{{ $class }}.writingPhone(this)" type="text" name="phone" class="form-control" value="{{ $partner->user->phone ?? '' }}" placeholder="Телефон">
        <div class="primary mt-15 p-15">
            Пароль для доступа будет оправлен по SMS
        </div>
    </div>

    <div class="form-group fl ip ul hide">
        <label>SMS код</label>
        <input maxlength="4" type="text" name="code" class="form-control" placeholder="SMS код" disabled>
        <div class="primary mt-15 p-15">
            Данный номер привязан к другой учетной записи, для подтверждения введите код из SMS с указанного номера
        </div>
    </div>
</div>
