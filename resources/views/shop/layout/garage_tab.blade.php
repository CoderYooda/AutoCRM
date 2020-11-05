<div class="tab_name">
    Мой транспорт

    <div class="controls">
        <div class="control-item left" onclick="window.garageSlider.prev();"></div>
        <div class="control-item right" onclick="window.garageSlider.next();"></div>
    </div>

</div>

<div class="slider_container">

    @include('shop.layout.garage_slider')

</div>

<div class="tab_name">
    Добавить транспорт
</div>

<form class="vehicle_form" action="{{ route('vehicles.store') }}" method="POST" onsubmit="vehicle.save(this);">

    <div class="form-group-flex">
        <label>VIN вашего автомобиля <span class="required_field">*</span></label>
        <div class="float-r">
            <div class="field">
                <input type="text" class="form-control" name="vin_code" value="{{ old('vin_code') }}">
            </div>
            <div class="error_text">Текст ошибки</div>
            <div class="error_notify">!</div>
        </div>
    </div>

    <div class="form-group-flex">
        <label>Марка вашего автомобиля</label>
        <div class="float-r">
            <div class="field">
                <select id="mark" name="mark_id" onchange="vehicle.changeMark(this);">
                    @foreach($marks as $mark)
                        <option value="{{ $mark->id }}">{{ $mark->name }}</option>
                    @endforeach
                </select>
            </div>
        </div>
    </div>

    <div class="form-group-flex">
        <label>Модель вашего автомобиля</label>
        <div class="float-r">
            <div class="field">
                <select id="model" name="model_id" onchange="vehicle.changeModel(this);">
                    @foreach($models as $model)
                        <option value="{{ $model->id }}">{{ $model->name }}</option>
                    @endforeach
                </select>
            </div>
        </div>
    </div>

    <div class="form-group-flex">
        <label>Модификация вашего автомобиля</label>
        <div class="float-r">
            <div class="field">
                <select id="modify" name="modify_id">
                    @foreach($modifications as $modify)
                        <option value="{{ $modify->id }}">{{ $modify->name }}</option>
                    @endforeach
                </select>
            </div>
        </div>
    </div>

    <div class="form-group-flex">
        <label>Год автомобиля</label>
        <div class="float-r">
            <div class="field">
                <input type="number" class="form-control" name="year" value="{{ old('year') }}">
            </div>
            <div class="error_text">Текст ошибки</div>
            <div class="error_notify">!</div>
        </div>
    </div>

    <div class="form-group-flex" style="min-height: 150px;">
        <label>Комментарий</label>
        <div class="float-r">
            <div class="field">
                <textarea name="comment" class="form-control" style="height: 150px;">{{ old('comment') }}</textarea>
            </div>
        </div>
    </div>

    <div class="form-group">
        <div class="float-r" style="width: 352px !important;">
            <div class="save_button float-l" onclick="vehicle.save(this);">Сохранить</div>
        </div>
    </div>

</form>
