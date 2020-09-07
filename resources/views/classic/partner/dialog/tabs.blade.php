<div data-simplebar="init" class="modal-body">
    <div class="row">
        <div class="col-sm-5 no-pr d-flex">
            <ul class="nav" id="partner_tabs" role="tablist">
                <li class="nav-item fl ip ul active" role="tab">
                    <a id="tab_base{{ $class }}-tab" href="#tab_base{{ $class }}"  data-height="false" aria-controls="tab_base{{ $class }}" aria-selected="true" class="nav-link">
                        Основные
                        <span class="float-right helper_danger d-none">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
                <li class="nav-item ip ul" role="tab">
                    <a id="tab_company{{ $class }}-tab" href="#tab_company{{ $class }}" data-height="false" aria-controls="tab_company{{ $class }}" aria-selected="false" class="nav-link">
                        Реквизиты
                        <span class="float-right helper_danger d-none">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
                <li class="nav-item fl" role="tab">
                    <a id="tab_passport{{ $class }}-tab" href="#tab_passport{{ $class }}"  data-height="false" aria-controls="tab_passport{{ $class }}" aria-selected="false" class="nav-link">
                        Паспорт
                        <span class="float-right helper_danger d-none">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
                <li id="vehicle_tab" class="nav-item fl ip ul" role="tab">
                    <a id="tab_vehicles{{ $class }}-tab" href="#tab_vehicles{{ $class }}"  data-height="false" aria-controls="tab_vehicles{{ $class }}" aria-selected="false" class="nav-link">
                        Транспорт
                        <span class="float-right helper_danger d-none">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
                <li class="nav-item fl ip ul" role="tab">
                    <a id="tab_barcodes{{ $class }}-tab" href="#tab_barcodes{{ $class }}"  data-height="false" aria-controls="tab_barcodes{{ $class }}" aria-selected="false" class="nav-link">
                        Штрих-коды
                        <span class="float-right helper_danger d-none">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
                <li class="nav-item fl ip ul" role="tab">
                    <a id="tab_access{{ $class }}-tab" href="#tab_access{{ $class }}"  data-height="false" aria-controls="tab_access{{ $class }}" aria-selected="false" class="nav-link">
                        Доступ в систему
                        <span class="float-right helper_danger d-none">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="col-sm-7 no-pl">
            <div class="tab-content mb-0 pl-8">
                <div role="tabpanel" class="tab-pane active main_tab animate text-muted" aria-labelledby="tab_base{{ $class }}-tab" id="tab_base{{ $class }}">
                    @include(get_template() . '.partner.dialog.tabs.base')
                </div>
                <div role="tabpanel" class="tab-pane animate text-muted" aria-labelledby="tab_company{{ $class }}-tab" id="tab_company{{ $class }}">
                    @include(get_template() . '.partner.dialog.tabs.company')
                </div>
                <div role="tabpanel" class="tab-pane animate text-muted" aria-labelledby="tab_passport{{ $class }}-tab" id="tab_passport{{ $class }}">
                    @include(get_template() . '.partner.dialog.tabs.passport')
                </div>
                <div role="tabpanel" class="tab-pane animate text-muted" aria-labelledby="tab_vehicles{{ $class }}-tab" id="tab_vehicles{{ $class }}">
                    @include(get_template() . '.partner.dialog.tabs.vehicles')
                </div>
                <div role="tabpanel" class="tab-pane animate text-muted" aria-labelledby="tab_barcodes{{ $class }}-tab" id="tab_barcodes{{ $class }}">
                    @include(get_template() . '.partner.dialog.tabs.bar_codes')
                </div>
                <div role="tabpanel" class="tab-pane animate text-muted" aria-labelledby="tab_access{{ $class }}-tab" id="tab_access{{ $class }}">
                    @include(get_template() . '.partner.dialog.tabs.access')
                </div>
            </div>
        </div>
    </div>
</div>
