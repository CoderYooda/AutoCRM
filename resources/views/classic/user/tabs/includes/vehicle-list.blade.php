@foreach($vehicles as $vehicle)

    <div id="vehicle_{{ $vehicle->id }}" class="pl-10 pr-10 mb-15 vehicle-element">
        <div class="box">
            <div class="vehicle-image">
                <img style="width: 160px;" src="{{ $vehicle->image }}" alt="{{ $vehicle->full_name }}" />
            </div>

            <div class="user-page-vehicle-properties p-15">
                <div class="user-page-vehicle-title">Марка</div>
                <div class="user-page-vehicle-desc">{{ $vehicle->mark->name }}</div>

                <div class="user-page-vehicle-title">Модель</div>
                <div class="user-page-vehicle-desc">{{ $vehicle->model->name }}</div>

                <div class="user-page-vehicle-title">Модификация</div>
                <div class="user-page-vehicle-desc">{{ $vehicle->modify->name }}</div>
            </div>

            <div class="vehicle-buttons d-flex">
                <div onclick="openDialog('vehicleDialog', '&refer=userPage&vehicle_id={{ $vehicle->id }}&partner_id={{ auth()->user()->partner->id }}')">Изменить</div>
                <div onclick="user.removeVehicle({{ $vehicle->id }})">Удалить</div>
            </div>
        </div>
    </div>

@endforeach
