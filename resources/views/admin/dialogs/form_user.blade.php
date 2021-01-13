<div id="{{ $class }}" class="dialog form_user_dialog" style="width:450px;">
    <div class="titlebar">Информация о пользователе</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>
    <form action="{{ route('AdminUpdateUser', $user->id) }}" method="POST">

        @csrf

        <div id="user_tabs" class="d-flex tab_links mt-10 ml-15">
            <a href="#" class="button primary active" data-target="tab_desc">Описание</a>
            <a href="#" class="button primary ml-10" data-target="tab_message">Сообщение</a>
        </div>

        <div data-simplebar class="m-15 pt-10" style="border-top: 1px solid #dee2e6; height: 320px;">

            <div id="tab_desc" class="tab active">

                <div class="form-group">
                    <label>Телефон</label>
                    <div class="input-group mb-3">
                        <input type="text" onclick="this.select();" name="phone" value="{{ $user->phone }}" class="form-control" placeholder="Телефон" disabled />
                    </div>
                </div>

                <div class="form-group">
                    <label>Компания (ID {{ $user->company->id }})</label>
                    <div class="input-group mb-3">
                        <input type="text" onclick="this.select();" name="company" value="{{ $user->company->name }}" class="form-control" placeholder="Компания" disabled />
                    </div>
                </div>

                <div class="form-group">
                    <label>Роль</label>
                    <div class="input-group mb-3">
                        <input type="text" onclick="this.select();" name="phone" value="{{ $user->roles->first()->name ?? 'Без роли' }}" class="form-control" placeholder="Роль" disabled />
                    </div>
                </div>

                <div class="form-group">
                    <label>Дата регистрации</label>
                    <div class="input-group mb-3">
                        <input type="text" onclick="this.select();" name="created_at" value="{{ $user->created_at }}" class="form-control" placeholder="Дата регистрации" disabled />
                    </div>
                </div>

                <div class="form-group">
                    <span style="font-weight: 500;">Статус блокировки</span>
                    <input type="checkbox" class="float-right" style="margin-top: 3px;" name="banned_at" value="1" @if($user->banned_at) checked @endif />
                </div>

                <div class="form-group">
                    <label>Изменить пароль</label>
                    <div class="input-group mb-3">
                        <input type="text" onclick="this.select();" name="password" class="form-control" placeholder="Пароль" />
                    </div>
                </div>

            </div>

            <div id="tab_message" class="tab">

                <div class="form-group">
                    <label>Системное сообщение</label>
                    <div class="input-group mb-3 d-flex">
                        <textarea type="text" onclick="this.select();" style="resize: none; height: 60px;" cols="4" name="message" class="form-control"></textarea>
                        <button type="button" onclick="{{ $class }}.sendMessage(this);" class="ml-10 button primary">Отправить</button>
                    </div>
                </div>

            </div>

        </div>

        <div class="modal-footer">
            <button type="button" class="button white" onclick="window.{{ $class }}.finitaLaComedia()">Закрыть</button>
            <button type="button" class="button primary float-right" onclick="{{ $class }}.save(this);">Сохранить</button>
        </div>

        <div class="system_message">
        </div>

    </form>
</div>
