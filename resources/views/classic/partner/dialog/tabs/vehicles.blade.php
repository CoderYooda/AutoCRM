<div data-simplebar style="max-height: 370px;">
    <ul id="vehicle-list" class="select-list-modal" style="background-color: transparent; padding: 0">
        @foreach($vehicles as $vehicle)
            @include('classic.partner.dialog.tabs.includes.list-item', $vehicle)
        @endforeach
        <li id="vehicle_item_create">
            <div class="box pointer">
                <i onclick="openDialog('vehicleDialog', '&refer={{ $class }}')" class="fa fa-plus-square add-icon"></i>
            </div>
        </li>
    </ul>
</div>
