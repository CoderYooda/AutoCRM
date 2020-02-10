<div class="nav-active-border b-info py-0 dark">
    <ul class="nav">
        <li class="nav-item">
            <a class="nav-link active" href="#{{$class}}_tab_base" data-toggle="tab" data-target="#{{$class}}_tab_base">
                Основные
                <span class="float-right helper_danger d-none-f">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#{{$class}}_tab_store" data-toggle="tab" data-target="#{{$class}}_tab_store">
                Склад
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#{{$class}}_tab_barcode" data-toggle="tab" data-target="#{{$class}}_tab_barcode">
                Штрихкоды
            </a>
        </li>
    </ul>
</div>
<div class="row no-gutters align-items-stretch">
    <div class="col-md-12 lt">
        <div class="tab-content mb-3">
            @include('partner.dialog.tabs.base')
            @include('partner.dialog.tabs.contacts')
            @include('partner.dialog.tabs.company')
            @include('partner.dialog.tabs.passport')
            @include('partner.dialog.tabs.cars')
        </div>
    </div>
</div>




<div class="row no-gutters align-items-stretch">
    <div class="col-md-4 lt">
        <div class="nav-active-border b-success left right box mb-0">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link block main_tab active" href="#tab_base{{ $class }}" data-toggle="tab" data-target="#tab_base{{ $class }}">
                        Основные
                        <span class="float-right helper_danger d-none-f">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
                <li class="nav-item ul_only @if(isset($partner) && $partner['isfl']) d-none-f @elseif(!isset($partner)) d-none-f @endif">
                    <a class="nav-link block" href="#tab_company{{ $class }}" data-toggle="tab" data-target="#tab_company{{ $class }}">
                        Организация
                        <span class="float-right helper_danger d-none-f">
                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                        </span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link block" href="#tab_contacts{{ $class }}" data-toggle="tab" data-target="#tab_contacts{{ $class }}">
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
{{--                <li class="nav-item">--}}
{{--                    <a class="nav-link block" href="#tab_cars" data-toggle="tab" data-target="#tab_cars">--}}
{{--                        Автомобили--}}
{{--                        <span class="float-right helper_danger d-none-f">--}}
{{--                                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>--}}
{{--                                        </span>--}}
{{--                    </a>--}}
{{--                </li>--}}
            </ul>
        </div>
    </div>
    <div class="col-md-8 light lt">
        <div class="tab-content p-3 mb-3">
            @include('partner.dialog.tabs.base')
            @include('partner.dialog.tabs.contacts')
            @include('partner.dialog.tabs.company')
            @include('partner.dialog.tabs.passport')
            @include('partner.dialog.tabs.cars')
        </div>
    </div>
</div>
