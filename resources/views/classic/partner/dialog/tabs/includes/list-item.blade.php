<li id="vehicle_item_{{ $vehicle->id }}" ondblclick="openDialog('vehicleDialog', '&refer={{ $class }}&vehicle_id={{ $vehicle->id }}&partner_id={{ $request->partner_id }}')" class="pointer d-flex mb-15">

    <div style="width: 120px; height: 60px;">
        <img style="max-width: 100%;" src="{{ $vehicle->image }}" />
    </div>

    <div class="list-title mt-10 text-center">
        {{ $vehicle->mark->name }}
        <div>{{ $vehicle->model->name }}</div>
    </div>

    <div class="mt-15">
        <button onclick="{{ $class }}.deleteVehicle({{ $vehicle->id }})" class="input-group-text butt_del_append" type="button" style="height: auto">
            <i class="fa fa-trash"></i>
        </button>
    </div>

    <input type="hidden" name="vehicle_ids[]" value="{{ $vehicle->id }}">
</li>
