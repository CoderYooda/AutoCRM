<div class="tab_name">
    Мой транспорт

    <div class="controls">
        <div class="control-item left"></div>
        <div class="control-item right"></div>
    </div>

</div>

<div class="vehicle_list">

    @foreach($vehicles as $vehicle)

        <div class="vehicle_element">

            <div class="vehicle_content">
                <div class="title">Марка</div>
                <div class="desc">{{ $vehicle->mark->name }}</div>

                <div class="title">Модель</div>
                <div class="desc">{{ $vehicle->model->name }}</div>

                <div class="title">Модификация</div>
                <div class="desc">{{ $vehicle->modify->name }}</div>
            </div>

        </div>

    @endforeach

</div>

<div class="tab_name">
    Добавить транспорт
</div>

<form class="vehicle_form" action="#" method="POST">

    <div class="form-group-flex">
        <label>VIN вашего автомобиля <span class="required_field">*</span></label>
        <div class="float-r">
            <div class="field">
                <input type="text" class="form-control" name="vin" value="{{ old('vin') }}">
            </div>
            {{--                                @error('vin')--}}
            <div class="error_text">Текст ошибки</div>
            <div class="error_notify">!</div>
            {{--                                @enderror--}}
        </div>
    </div>

    <div class="form-group-flex">
        <label>Марка вашего автомобиля</label>
        <div class="float-r">
            <div class="field">
                <select id="mark" name="mark_id" onchange="vehicle.changeMark();">
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
                <select id="model" name="model_id" onchange="vehicle.changeModel();">
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
                <select id="modify" name="modification_id" onchange="vehicle.changeModify();">
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
                <input type="text" class="form-control" name="year" value="{{ old('year') }}">
            </div>
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

</form>
