<div class="modal-body">
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
                        Реквизиты
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
                <li id="vehicle_tab" class="nav-item" @if(!isset($partner) || $partner->category_id != 7) style="display: none;" @endif>
                    <a id="tab_vehicles{{ $class }}-tab" href="#tab_vehicles{{ $class }}" data-toggle="tab" data-height="false" aria-controls="tab_vehicles{{ $class }}" aria-selected="false" role="tab" class="nav-link">
                        Транспорт
                        <span class="float-right helper_danger d-none-f">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
                <li class="nav-item">
                    <a id="tab_barcodes{{ $class }}-tab" href="#tab_barcodes{{ $class }}" data-toggle="tab" data-height="false" aria-controls="tab_access{{ $class }}" aria-selected="false" role="tab" class="nav-link">
                        Штрих-коды
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
            </ul>
        </div>
        <div class="col-sm-7 no-pl">
            <div class="tab-content mb-0 pl-8">

                <div role="tabpanel" class="tab-pane active main_tab animate text-muted" aria-labelledby="tab_base{{ $class }}-tab"  id="tab_base{{ $class }}">
                    @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.base')
                </div>
                <div role="tabpanel" class="tab-pane animate text-muted ul_only @if(isset($partner) && $partner['isfl']) d-none-f @endif" aria-labelledby="tab_company{{ $class }}-tab" id="tab_company{{ $class }}">
                    @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.company')
                </div>
                <div role="tabpanel" class="tab-pane animate text-muted fl_only @if(isset($partner) && !$partner['isfl']) d-none-f @endif" aria-labelledby="tab_passport{{ $class }}-tab" id="tab_passport{{ $class }}">
                    @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.passport')
                </div>
                <div role="tabpanel" class="tab-pane animate text-muted" aria-labelledby="tab_vehicles{{ $class }}-tab" id="tab_vehicles{{ $class }}">
                    @include(get_template() . '.partner.dialog.tabs.vehicles')
                </div>
                <div role="tabpanel" class="tab-pane animate text-muted" aria-labelledby="tab_barcodes{{ $class }}-tab" id="tab_barcodes{{ $class }}">
                    @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.bar_codes')
                </div>
                <div role="tabpanel" class="tab-pane animate text-muted" aria-labelledby="tab_access{{ $class }}-tab" id="tab_access{{ $class }}">
                    @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs.access')
                </div>
            </div>
        </div>
    </div>
</div>
