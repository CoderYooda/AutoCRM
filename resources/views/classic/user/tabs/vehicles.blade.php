@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.user.index')

@section('tab')

{{--    <div class="box mb-15">--}}
{{--        <div class="container tariff-container p-15">--}}

{{--            <button onclick="openDialog('vehicleDialog', '&partner_id={{ auth()->user()->partner->id }}')" class="button right">Добавить транспорт</button>--}}

{{--            <div id="vehicle-list" class="row no-gutters">--}}

{{--                @foreach($vehicles as $vehicle)--}}

{{--                    <div id="vehicle_{{ $vehicle->id }}" class="col-sm-4 pr-75 py-3">--}}
{{--                        <div onclick="openDialog('vehicleDialog', '&vehicle_id={{ $vehicle->id }}&partner_id={{ auth()->user()->partner->id }}')" class="box pointer">--}}
{{--                            <div class="box-body r-t mb-10 d-flex">--}}
{{--                                <div class="vehicle-info">--}}
{{--                                    Марка {{ $vehicle->mark->name }}--}}
{{--                                    Модель {{ $vehicle->model->name }}--}}
{{--                                    Модификация {{ $vehicle->modify->name }}--}}
{{--                                </div>--}}

{{--                                <div class="vehicle-image">--}}
{{--                                    <img src="http://via.placeholder.com/160" alt="{{ $vehicle->full_name }}" />--}}
{{--                                </div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </div>--}}

{{--                @endforeach--}}

{{--            </div>--}}
{{--        </div>--}}
{{--    </div>--}}

    <div class="box mb-15">
        <div class="container tariff-container p-15 pl-10 pr-10">

            <div class="pl-15 pr-15">

                <div id="vehicle-list" class="row row-sm">
                @foreach($vehicles as $vehicle)

                        <div id="vehicle_{{ $vehicle->id }}" class="pl-10 pr-10 mb-15 vehicle-element">

                            <div class="box">
                                <div class="vehicle-image">
                                    <img src="http://via.placeholder.com/160" alt="{{ $vehicle->full_name }}" />
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
                                    <div onclick="openDialog('vehicleDialog', '&vehicle_id={{ $vehicle->id }}&partner_id={{ auth()->user()->partner->id }}')">Изменить</div>
                                    <div onclick="user.removeVehicle({{ $vehicle->id }})">Удалить</div>
                                </div>
                            </div>

                        </div>

                    @endforeach

                </div>

            </div>
        </div>
    </div>

@endsection
