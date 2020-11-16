<div class="vehicle_list">

    @foreach($vehicles as $vehicle)

        <div class="vehicle_element" onclick="vehicle.edit(this, {{ $vehicle->id }});">

            <div class="vehicle_content">
                <div class="title">Марка</div>
                <div class="desc">{{ $vehicle->mark->name ?? 'Не указано' }}</div>

                <div class="title">Модель</div>
                <div class="desc">{{ $vehicle->model->name ?? 'Не указано' }}</div>

                <div class="title">Модификация</div>
                <div class="desc">{{ $vehicle->modify->name ?? 'Не указано' }}</div>
            </div>

            <div class="remove_button" onclick="vehicle.remove(this, {{ $vehicle->id }});"></div>

        </div>


    @endforeach

</div>
