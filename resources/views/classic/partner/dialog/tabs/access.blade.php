
<div class="form-group fl ip ul">
    <label>Доступ в систему</label>
    {{--onchange="{{ $class }}.toggleAccess(this)"--}}
    <select custom_select id="toggle_access"  name="access" class="form-control input-c">
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
        <select  custom_select name="store_id" class="form-control input-c">
            @foreach($stores as $store)
                <option value="{{ $store->id }}" @if(isset($partner) && $partner->store_id == $store->id) selected @elseif(Auth::user()->partner->store_id == $store->id) selected @endif>{{ $store->name }}</option>
            @endforeach
        </select>
    </div>

    @can('Редактировать настройки')

        <div class="form-group fl ip ul @if(!$partner || $partner && $partner->category->name != 'Сотрудники') hide @endif">
            <label>Роль</label>

            <div class="dropdown role_select_cont" onclick="window.helper.openModal(this, event)">
                <input id="role" name="role" type="hidden" value="{{ $partner->user->roles[0]->id ?? 'Не выбрано' }}" class="form-control role_selector pointer" @if(!$partner || $partner && $partner->category->name != 'Сотрудники') disabled @endif>
                <button id="button_role" type="button" class="category_select form-control text-left button_select">{{ $partner->user->roles[0]->id ?? 'Не выбрано' }}</button>
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
        <input onkeydown="{{ $class }}.phone_checked = true;" maxlength="4" type="text" name="code" class="form-control" placeholder="SMS код" disabled>
        <div class="primary mt-15 p-15">
            Данный номер привязан к другой учетной записи, для подтверждения введите код из SMS с указанного номера
        </div>
    </div>
</div>
