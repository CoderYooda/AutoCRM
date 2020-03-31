<div class="box-lister box">
    <div id="actions-container" class="box-content">
        {{ Auth::user()->getAllPermissions() }}
        @can('создавать категории')
            123
            @else
            false
        @endcan
    </div>
</div>
<div class="content-rightside">
    {{--<button onclick="openDialog('entranceDialog')" class="button primary mb-15 w-100">Оформить поступление</button>--}}
    <div class="box w-290 p-15 filter-panel">
        <div class="box-title">Роли</div>
        <div id="roles_container">
            @foreach($roles as $role)
                <div class="form-group d-flex mb-10">
                    <div class="flex-1">{{ $role->name }}</div>
                    <button type="button" onclick="openDialog('roleDialog', '&role_id={{ $role->id }}')" class="right-remove"><i class="fa fa-pencil"></i></button>
                    <button type="button" onclick="entity.remove('role', {{ $role->id }})" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
            @endforeach
        </div>
        <button type="button" onclick="openDialog('roleDialog')" class="button primary w-100">Создать роль</button>
    </div>
</div>
