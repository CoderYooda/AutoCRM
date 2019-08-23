<div class="row no-gutters align-items-stretch">
    <div class="col-md-4 lt">
        <div class="nav-active-border b-success left right box mb-0">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link block active" href="#" data-toggle="tab" data-target="#tab_base_uridical">
                        Основные
                        <span class="float-right helper_danger d-none-f">
                                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                                        </span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link block" href="#" data-toggle="tab" data-target="#tab_company">
                        Организация
                        <span class="float-right helper_danger d-none-f">
                                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                                        </span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link block" href="#" data-toggle="tab" data-target="#tab_contacts_uridical">
                        Контакты
                        <span class="float-right helper_danger d-none-f">
                                            <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div class="col-md-8 light lt">
        <div class="tab-content p-3 mb-3">
            @include('partner.dialog.tabs.base_uridical')
            @include('partner.dialog.tabs.company')
            @include('partner.dialog.tabs.contacts_uridical')
        </div>
    </div>
</div>
