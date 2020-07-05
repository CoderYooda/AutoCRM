<li id="vehicle_item_{{ $vehicle->id }}" ondblclick="openDialog('vehicleDialog', '&refer={{ $class }}&vehicle_id={{ $vehicle->id }}&partner_id={{ $request->partner_id }}')" class="pointer mb-15" style="max-height: 94px;">

    <i class="fa fa-times focus-blue float-right" style="color:#C6C6C6; font-size: 15px;" aria-hidden="true"></i>

    <div class="d-flex">
        <div style="width: 120px; height: 60px;">
            <img style="max-width: 100%;" src="{{ $vehicle->image }}" />
        </div>

        <div class="d-flex align-items-center ml-15">
            <div>
                <div>{{ $vehicle->mark->name ?? '' }}</div>
                <div>{{ $vehicle->model->name ?? '' }}</div>
                @if($vehicle->vin_code)
                    <div>{{ $vehicle->vin_code }}
                        <i class="fa fa-clipboard focus-blue" data-clipboard-text="{{ $vehicle->vin_code }}" style="font-size: 12px; color:#C6C6C6;" aria-hidden="true"></i>
                    </div>
                @endif
            </div>
        </div>

        <input type="hidden" name="vehicle_ids[]" value="{{ $vehicle->id }}">
    </div>
</li>
