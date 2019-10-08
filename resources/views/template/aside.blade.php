<ul class="nav">
    <li>
        <a href="{{ route('CalendarIndex', ['target' => 'ajax-content']) }}" class="ajax-nav update_url">
            <span class="nav-icon">
                <i class="fa fa-calendar"></i>
            </span>
            <span class="nav-text">Календарь</span>
        </a>
    </li>
    <li class="">
        <a onclick="openDialog('warrantDialog', '&isIncoming=1')">
            <span class="nav-icon">
                <i class="fa fa-sign-in"></i>
			</span>
            <span  class="nav-text">Приход</span>
        </a>
    </li>
    <li class="">
        <a onclick="openDialog('warrantDialog', '&isIncoming=0')">
            <span class="nav-icon">
                <i class="fa fa-sign-out"></i>
			</span>
            <span class="nav-text">Расход</span>
        </a>
    </li>
    <li class="">
        <a onclick="openDialog('shipmentDialog')" >
            <span class="nav-icon">
                <i class="fa fa-money"></i>
			</span>
            <span class="nav-text">Продажа</span>
        </a>
    </li>
    <li class="">
        <a href="{{ route('StoreIndex', ['active_tab' => 'client_orders', 'target' => 'ajax-content']) }}" class="ajax-nav update_url">
            <span class="nav-icon">
                <i class="fa fa-clipboard"></i>
			</span>
            <span class="nav-text">Заказы</span>
        </a>
    </li>
    <li class="">
        <a href="#">
            <span class="nav-icon">
                <i class="fa fa-phone-square"></i>
			</span>
            <span class="nav-text">Звонки</span>
        </a>
    </li>
</ul>
