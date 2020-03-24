<div class="box-lister box">
    <div id="actions-container" class="box-content">
        123
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
                    <button type="button" onclick="window.actions.resetDate()" class="right-remove"><i class="fa fa-pencil"></i></button>
                    <button type="button" onclick="window.actions.resetDate()" class="right-remove"><i class="fa fa-remove"></i></button>
                </div>
            @endforeach
        </div>
        <button type="button" onclick="window.actions.resetDate()" class="button primary w-100">Создать роль</button>
    </div>
</div>
