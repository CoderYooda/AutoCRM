@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.user.index')

@section('tab')

    <div class="box mb-15">
        <div class="container tariff-container p-15">

            <button onclick="openDialog('vehicleDialog')" class="button right">Добавить транспорт</button>

            <div class="row no-gutters">

                @foreach($vehicles as $vehicle)

                <div class="col-sm-4 pr-75 py-3">
                    <div onclick="openDialog('vehicleDialog', '&vehicle_id={{ $vehicle->id }}')" class="box pointer">
                        <div class="box-body r-t mb-10 d-flex">
                            <div class="vehicle-info">
                                Марка {{ $vehicle->mark->name }}
                                Модель {{ $vehicle->model->name }}
                                Модификация {{ $vehicle->modify->name }}
                            </div>

                            <div class="vehicle-image">
                                <img src="http://via.placeholder.com/160" alt="{{ $vehicle->full_name }}" />
                            </div>
                        </div>
                    </div>
                </div>

                @endforeach

            </div>
        </div>
    </div>

@endsection
