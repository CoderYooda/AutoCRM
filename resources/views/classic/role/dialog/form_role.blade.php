<div
    @if(isset($role) && $role->id != NULL)
        id="roleDialog{{$role->id}}"
        @php $class = 'roleDialog' . $role->id @endphp
    @else
        id="roleDialog"
        @php $class = 'roleDialog' @endphp
    @endif
    class="dialog" style="width:600px;">
    @if(isset($role) && $role->id != NULL)
        <div class="titlebar">Редактирование роли "{{ $role->name }}"</div>
    @else
        <div class="titlebar">Новая роль</div>
    @endif

    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>

    <form action="{{ route('StoreRole') }}" method="POST">
        @csrf


        <div class="modal-body">
            <div class="box-body">
                <div class="row">
                    <div class="col-sm-12 mb-10">
                        <div class="form-group mb-0">
                            <label for="category_id">Название роли</label>
                            <input type="text"
                                   @if(isset($role))
                                   value="{{ $role->name }}"
                                   @endif
                                   name="name" class="form-control" placeholder="Название роли, например (Администраор)" autofocus>
                        </div>
                    </div>
                    <div class="col-sm-6 no-pr">
                        <div class="form-group d-flex mb-10">
                            <label class="no-wrap" for="users">Пользователи</label>
                            <input readonly="" onclick="{{ $class }}.openSelectUsersModal('users')" id="users" type="text" name="provider" value="" class="form-control users input_as_link" placeholder="выбрать">
                            <button type="button" onclick="{{ $class }}.clearList('users', 'users_stack')" class="right-remove"><i class="fa fa-remove"></i></button>
                        </div>
                        <div id="users_stack" class="box w-100 p-10">
                            <div class="no-items-text">Для этой роли пользователи не назначены</div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-10">
                            <b>Разрешения</b>
                        </div>
                        <div class="box w-100">123</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-footer">
            <button type="submit" onclick="window.{{ $class }}.finitaLaComedia()" class="button white">Закрыть</button>
            <button type="submit" onclick="window.{{ $class }}.save(this)" class="button primary pull-right">Сохранить</button>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
