@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.user.index')

@section('tab')

    <div class="box mb-15">
        <div class="container tariff-container p-15">

            <button class="button right">Добавить транспорт</button>

            <div class="row no-gutters">

                @foreach($vehicles as $vehicle)

                <div class="col-sm-4 pr-75 py-3">
                    <div onclick="openDialog('vehicleDialog', '&vehicle_id={{ $vehicle->id }}')" class="box pointer">
                        <div class="box-body text-center r-t mb-10">
                            <h6 class="text-u-c" style="padding-top: 5px;">{{ $vehicle->mark->name }}</h6>
                            <span class="text-2x">{{ $vehicle->model->name }}</span> / <span class="text-xs">{{ $vehicle->modify->name }}</span>

                            <img class="user-vehicle-image" src="http://via.placeholder.com/300x125" alt="{{ $vehicle->full_name }}" />

                        </div>
                    </div>
                </div>

                @endforeach

            </div>
        </div>
    </div>

@endsection
