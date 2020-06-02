<div data-simplebar style="max-height: 200px;">
    <ul class="nav select-list-modal" style="background-color: transparent;">
        @foreach($vehicles as $vehicle)
            <li id="vehicle_item_{{ $vehicle->id }}" onclick="openDialog('vehicleDialog', '&vehicle_id={{ $vehicle->id }}')" class="pointer d-flex mb-15">
                <div class="ring-ico">
                    <span class="first_letter">{{ substr($vehicle->mark->name, 0, 1) }}</span>
                </div>
                <div class="list-title">
                    {{ $vehicle->mark->name }}
                    <div class="secondary">{{ $vehicle->model->name }}</div>
                </div>
                <div class="list-body">
                    <div class="date">Год:</div>
                    <div class="secondary">{{ $vehicle->year }}</div>
                </div>
            </li>
        @endforeach
        <li>
            <div class="box pointer">
                <i onclick="openDialog('vehicleDialog')" class="fa fa-plus-square add-icon"></i>
            </div>
        </li>
    </ul>
</div>
