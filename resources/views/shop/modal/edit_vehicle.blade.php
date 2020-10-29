<div class="form_edit" style="padding: 32px;">

    <form class="vehicle_form" action="{{ route('vehicles.update', $vehicle->id) }}" method="POST" onsubmit="vehicle.update(this, {{ $vehicle->id }});">

        <div class="form-group-flex">
            <label>VIN вашего автомобиля <span class="required_field">*</span></label>
            <div>
                <input type="text" class="form-control" name="vin_code" value="{{ $vehicle->vin_code }}">
                <div class="error_text">Текст ошибки</div>
                <div class="error_notify">!</div>
            </div>
        </div>

        <div class="form-group-flex">
            <label>Марка вашего автомобиля</label>
            <select id="mark" name="mark_id" onchange="vehicle.changeMark(this);">
                @foreach($marks as $mark)
                    <option value="{{ $mark->id }}" @if($vehicle->mark->id == $mark->id) selected @endif>{{ $mark->name }}</option>
                @endforeach
            </select>
        </div>

        <div class="form-group-flex">
            <label>Модель вашего автомобиля</label>
            <select id="model" name="model_id" onchange="vehicle.changeModel(this);">
                @foreach($models as $model)
                    <option value="{{ $model->id }}" @if($vehicle->model->id == $model->id) selected @endif>{{ $model->name }}</option>
                @endforeach
            </select>
        </div>

        <div class="form-group-flex">
            <label>Модификация вашего автомобиля</label>
            <select id="modify" name="modify_id">
                @foreach($modifications as $modify)
                    <option value="{{ $modify->id }}" @if($vehicle->modify->id == $modify->id) selected @endif>{{ $modify->name }}</option>
                @endforeach
            </select>
        </div>

        <div class="form-group-flex">
            <label>Год автомобиля</label>
            <div>
                <input type="number" class="form-control" name="year" value="{{ $vehicle->year }}">
                <div class="error_text">Текст ошибки</div>
                <div class="error_notify">!</div>
            </div>
        </div>

        <div class="form-group-flex" style="min-height: 100px;">
            <label>Комментарий</label>
            <div>
                <textarea name="comment" class="form-control" style="height: 100px;">{{ $vehicle->comment }}</textarea>
            </div>
        </div>

        <div class="form-group">
            <div class="save_button" onclick="vehicle.update(this, {{ $vehicle->id }});">Сохранить</div>
        </div>

    </form>

</div>
