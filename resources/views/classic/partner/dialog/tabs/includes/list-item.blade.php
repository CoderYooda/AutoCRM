<li id="vehicle_item_{{ $vehicle->id }}" onclick="openDialog('vehicleDialog', '&refer={{ $class }}&vehicle_id={{ $vehicle->id }}')" class="pointer d-flex mb-15">
    <div class="ring-ico">
        <span class="first_letter">{{ mb_substr($vehicle->mark->name, 0, 1) }}</span>
    </div>
    <div class="list-title">
        {{ $vehicle->mark->name }}
        <div class="secondary">{{ $vehicle->model->name }}</div>
    </div>
    @if(isset($vehicle->year))
        <div class="list-body">
            <div class="date">Год: {{ $vehicle->year }}</div>
        </div>
    @endif

    <div>
        <button onclick="{{ $class }}.deleteVehicle({{ $vehicle->id }})" class="btn primary">Удалить</button>
    </div>

    <input type="hidden" name="vehicle_ids[]" value="{{ $vehicle->id }}">
</li>