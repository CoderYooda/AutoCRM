<div
    @if(isset($role) && $role->id != NULL)
        id="roleDialog{{$role->id}}"
        @php $class = 'roleDialog' . $role->id @endphp
    @else
        id="roleDialog"
        @php $class = 'roleDialog' @endphp
    @endif
    class="dialog" style="width:780px;">
    @if(isset($role) && $role->id != NULL)
        <div class="titlebar">Редактирование роли "{{ $role->name }}"</div>
    @else
        <div class="titlebar">Новая роль</div>
    @endif

    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>

    <form action="{{ route('StoreRole') }}" method="POST">
        @csrf
        @if(isset($role) && $role->id != NULL)
            <input type="hidden" name="id" value="{{ $role->id }}">
        @endif
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
                    <div class="col-sm-12">
                        <label>Разрешения</label>
                        <span class="pull-right"><a class="pl-8" onclick="window.{{ $class }}.selectAll()">выделить всё</a><a class="pl-8" onclick="window.{{ $class }}.unselectAll()" >cнять выделение</a></span>
                        <div class="box w-100 checkbox-list">
                            <div class="d-flex title-head">
                                <div class="flex-1-5">Сущность</div>
                                <div class="flex-1 text-center">Чтение</div>
                                <div class="flex-1 text-center">Создание</div>
                                <div class="flex-1 text-center">Удаление</div>
                                <div class="flex-1 text-center">Редактирование</div>
                            </div>
                            <div class="p-10" data-simplebar style="max-height: 400px;">
                                @foreach($permissions as $permission)
                                    <div class="d-flex item">
                                        <div class="flex-1-5">{{ $permission['name'] }}</div>
                                        <div class="flex-1 text-center">
                                            @if(isset($permission['types']['read']))
                                                <input type="checkbox" class="perm" name="perms[{{ $permission['types']['read']['id']}}]" @if($permission['types']['read']['checked'] == true) checked @endif>
                                            @endif
                                        </div>
                                        <div class="flex-1 text-center">
                                            @if(isset($permission['types']['create']))
                                                <input type="checkbox" class="perm" name="perms[{{ $permission['types']['create']['id'] }}]" @if($permission['types']['create']['checked'] == true) checked @endif>
                                            @endif</div>
                                        <div class="flex-1 text-center">
                                            @if(isset($permission['types']['delete']))
                                                <input type="checkbox" class="perm" name="perms[{{ $permission['types']['delete']['id'] }}]" @if($permission['types']['delete']['checked'] == true) checked @endif>
                                            @endif
                                        </div>
                                        <div class="flex-1 text-center">
                                            @if(isset($permission['types']['edit']))
                                                <input type="checkbox" class="perm" name="perms[{{ $permission['types']['edit']['id'] }}]" @if($permission['types']['edit']['checked'] == true) checked @endif>
                                            @endif
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
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
