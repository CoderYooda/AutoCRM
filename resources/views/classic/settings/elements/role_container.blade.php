<div class="box-lister box">
    <div id="actions-container" class="box-content">
        {{--{{ Auth::user()->getAllPermissions() }}--}}
        <div class="user-list">
            @foreach($users as $user)
                <div class="item_elem">
                    <div class="flex-1">
                        {{ $user->partner()->first()->outputName() }}
                    </div>
                    <div class="flex-1">
                        <div class="pull-right">
                            <div class="dropdown role_select_cont" onclick="window.helper.openModal(this, event)">
                                <input readonly="" name="role" id="role" type="text" value="@if($user->roles()->first()){{ $user->roles()->first()->name }}@else Не выбрано @endif" class="form-control role_selector" >
                                <div class="dropdown_container">
                                    <div class="arrow"></div>
                                    @foreach($roles as $role)
                                        <span onclick="window.settings.setRoleToUser({{ $user->id }},{{ $role->id }})" class="element">{{ $role->name }}</span>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
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
