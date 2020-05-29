<div class="modal-body">
{{--    <div id="myTabsWrapper">--}}

{{--        <!-- Nav tabs -->--}}
{{--        <ul id="myTabs" class="nav nav-tabs" role="tablist">--}}
{{--            <li role="presentation" class="active">--}}
{{--                <a id="home-tab" href="#home" data-toggle="tab" data-height="true" aria-controls="home" aria-selected="true" role="tab">Home</a>--}}
{{--            </li>--}}
{{--            <li role="presentation">--}}
{{--                <a id="profile-tab" href="#profile" data-toggle="tab" data-height="true" aria-controls="profile" aria-selected="false" role="tab">Profile</a>--}}
{{--            </li>--}}
{{--            <li role="presentation">--}}
{{--                <a id="messages-tab" href="#messages" data-toggle="tab" data-height="true" aria-controls="messages" aria-selected="false" role="tab">Messages</a>--}}
{{--            </li>--}}
{{--            <li role="presentation">--}}
{{--                <a id="settings-tab" href="#settings" data-toggle="tab" data-height="true" aria-controls="settings" aria-selected="false" role="tab">Settings</a>--}}
{{--            </li>--}}
{{--        </ul>--}}

{{--        <!-- Tab panes -->--}}
{{--        <div class="tab-content">--}}
{{--            <div role="tabpanel" class="tab-pane active" aria-labelledby="home-tab" id="home">...</div>--}}
{{--            <div role="tabpanel" class="tab-pane" aria-labelledby="profile-tab" id="profile">...</div>--}}
{{--            <div role="tabpanel" class="tab-pane" aria-labelledby="messages-tab" id="messages">...</div>--}}
{{--            <div role="tabpanel" class="tab-pane" aria-labelledby="settings-tab" id="settings">...</div>--}}
{{--        </div>--}}

{{--    </div>--}}


    <div class="row">
        <div class="col-sm-5 no-pr d-flex">
            <ul class="nav" id="partner_tabs" role="tablist">

                <li class="nav-item active">
                    <a id="tab_base{{ $class }}-tab" href="#tab_base{{ $class }}" data-toggle="tab" data-height="false" aria-controls="tab_base{{ $class }}" aria-selected="true" role="tab" class="nav-link">
                        Основные
                        <span class="float-right helper_danger d-none-f">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
                <li class="nav-item ul_only @if(isset($partner) && $partner['isfl']) d-none-f @elseif(!isset($partner)) d-none-f @endif">
                    <a id="tab_company{{ $class }}-tab" href="#tab_company{{ $class }}" data-toggle="tab" data-height="false" aria-controls="tab_company{{ $class }}" aria-selected="false" role="tab" class="nav-link">
                        Организация
                        <span class="float-right helper_danger d-none-f">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
                <li class="nav-item">
                    <a id="tab_contacts{{ $class }}-tab" href="#tab_contacts{{ $class }}" data-toggle="tab" data-height="false" aria-controls="tab_contacts{{ $class }}" aria-selected="false" role="tab" class="nav-link">
                        Контакты
                        <span class="float-right helper_danger d-none-f">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
                <li class="nav-item fl_only @if(isset($partner) && !$partner['isfl']) d-none-f @endif">
                    <a id="tab_passport{{ $class }}-tab" href="#tab_passport{{ $class }}" data-toggle="tab" data-height="false" aria-controls="tab_passport{{ $class }}" aria-selected="false" role="tab" class="nav-link">
                        Паспорт
                        <span class="float-right helper_danger d-none-f">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
                <li class="nav-item">
                    <a id="tab_access{{ $class }}-tab" href="#tab_access{{ $class }}" data-toggle="tab" data-height="false" aria-controls="tab_access{{ $class }}" aria-selected="false" role="tab" class="nav-link">
                        Доступ в систему
                        <span class="float-right helper_danger d-none-f">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
                <li class="nav-item">
                    <a id="tab_access{{ $class }}-tab" href="#tab_access{{ $class }}" data-toggle="tab" data-height="false" aria-controls="tab_vehicles{{ $class }}" aria-selected="false" role="tab" class="nav-link">
                        Транспорт
                        <span class="float-right helper_danger d-none-f">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="col-sm-7 no-pl">
            <div class="tab-content mb-0 pl-8">

                <div role="tabpanel" class="tab-pane active main_tab animate text-muted" aria-labelledby="tab_base{{ $class }}-tab"  id="tab_base{{ $class }}">
                    @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.base')
                </div>
                <div role="tabpanel" class="tab-pane animate text-muted" aria-labelledby="tab_contacts{{ $class }}-tab" id="tab_contacts{{ $class }}">
                    @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.contacts')
                </div>
                <div role="tabpanel" class="tab-pane animate text-muted ul_only @if(isset($partner) && $partner['isfl']) d-none-f @endif" aria-labelledby="tab_company{{ $class }}-tab" id="tab_company{{ $class }}">
                    @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.company')
                </div>
                <div role="tabpanel" class="tab-pane animate text-muted fl_only @if(isset($partner) && !$partner['isfl']) d-none-f @endif" aria-labelledby="tab_passport{{ $class }}-tab" id="tab_passport{{ $class }}">
                    @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.passport')
                </div>

{{--                @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.cars')--}}

                <div role="tabpanel" class="tab-pane animate text-muted" aria-labelledby="tab_access{{ $class }}-tab" id="tab_access{{ $class }}">
                    @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.access')
                </div>
                <div role="tabpanel" class="tab-pane animate text-muted" aria-labelledby="tab_access{{ $class }}-tab" id="tab_vehicles{{ $class }}">
                    @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.vehicles')
                </div>
            </div>
        </div>
    </div>
</div>
