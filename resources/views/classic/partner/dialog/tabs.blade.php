<div class="modal-body">
    <div class="row">
        <div class="col-sm-5 no-pr d-flex">
            <ul class="nav">
                <li class="nav-item">
                    <a class="nav-link active" href="#tab_base{{ $class }}" data-toggle="tab" data-target="#tab_base{{ $class }}">
                        Основные
                        <span class="float-right helper_danger d-none-f">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
                <li class="nav-item ul_only @if(isset($partner) && $partner['isfl']) d-none-f @elseif(!isset($partner)) d-none-f @endif">
                    <a class="nav-link " href="#tab_company{{ $class }}" data-toggle="tab" data-target="#tab_company{{ $class }}">
                        Организация
                        <span class="float-right helper_danger d-none-f">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#tab_contacts{{ $class }}" data-toggle="tab" data-target="#tab_contacts{{ $class }}">
                        Контакты
                        <span class="float-right helper_danger d-none-f">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
                <li class="nav-item fl_only @if(isset($partner) && !$partner['isfl']) d-none-f @endif">
                    <a class="nav-link block" href="#tab_passport{{ $class }}" data-toggle="tab" data-target="#tab_passport{{ $class }}">
                        Паспорт
                        <span class="float-right helper_danger d-none-f">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="col-sm-7 no-pl">
            <div class="tab-content mb-3 pl-8">
                @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.base')
                @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.contacts')
                @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.company')
                @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.passport')
                @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.cars')
            </div>
        </div>
    </div>
</div>
