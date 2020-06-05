<div id="{{ $tag }}" class="dialog" style="width:400px;">

    <div class="titlebar">{{ $vehicle->full_name ?? 'Добавление нового транспорта' }}</div>

    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $tag }}')">_</button>
    <button class="btn_close" onclick="window.{{ $tag }}.finitaLaComedia()">×</button>

    <form id="save_vehicle_form" action="{{ route('StoreVehicle') }}" method="post">
        <div class="modal-body">
            <div class="p-15">
                @csrf

                @if(isset($vehicle))
                    <input type="hidden" name="id" value="{{ $vehicle->id }}">
                @endif

                <input type="hidden" id="refer" name="refer" value="{{ request('refer') }}">
                <input type="hidden" name="mark_id" value="{{ $vehicle->mark_id ?? 1 }}" />
                <input type="hidden" name="model_id" value="{{ $vehicle->model_id ?? 1 }}" />
                <input type="hidden" name="modify_id" value="{{ $vehicle->modify_id ?? 1 }}" />

                <div class="form-group d-flex">
                    <label for="vin_code">VIN:</label>
                    <input id="vin_code" onclick="this.select();" type="text" name="vin_code"
                           @if(isset($vehicle)) value="{{ $vehicle->vin_code }}" @endif
                           class="form-control" />
                    <button onclick="{{ $tag }}.parserVinCode()" class="button primary">Найти</button>
                </div>

                <div class="form-group">
                    <label>Марка:</label>
                    <select id="mark" onchange="{{ $tag }}.changeMark()" data-trigger class="form-control">
                        @foreach($marks as $mark)
                            <option @if($vehicle && $vehicle->mark_id == $mark->id) selected @endif value="{{ $mark->id }}">{{ $mark->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="form-group">
                    <label>Модель:</label>
                    <select onchange="{{ $tag }}.changeModel()" id="model" data-trigger class="form-control">
                        @if(count($models))
                            @foreach($models as $model)
                                <option @if($vehicle && $vehicle->model_id == $model->id) selected @endif value="{{ $model->id }}">{{ $model->name }}</option>
                            @endforeach
                        @endif
                    </select>
                </div>

                <div class="form-group">
<<<<<<< HEAD
                    <label>Модификация:</label>
                    <select onchange="{{ $tag }}.changeModify()" id="modify" data-trigger class="form-control">
                        @if(count($modifies))
                            @foreach($modifies as $modify)
                                <option @if($vehicle && $vehicle->modify_id == $modify->id) selected @endif value="{{ $modify->id }}">{{ $modify->name }}</option>
                            @endforeach
                        @endif
                    </select>
                </div>

                <div class="form-group">
                    <label>Год:</label>
                    <input onclick="this.select();" type="text" id="year" name="year"
                           @if(isset($vehicle)) value="{{ $vehicle->year }}" @endif
=======
                    <label>Гос. номер:</label>
                    <input onclick="this.select();" type="text" name="numberplate"
                           @if(isset($vehicle)) value="{{ $vehicle->numberplate }}" @endif
>>>>>>> origin/master
                           class="form-control" />
                </div>

                <div class="form-group">
                    <label>Гос. номер:</label>
                    <input onclick="this.select();" type="text" id="numberplate" name="numberplate"
                           @if(isset($vehicle)) value="{{ $vehicle->numberplate }}" @endif
                           class="form-control" />
                </div>

            </div>

        </div>

        <div class="modal-footer">
            <button class="button white" onclick="{{ $tag }}.finitaLaComedia()">Закрыть</button>
            <button class="button primary pull-right" onclick="{{ $tag }}.save(this)">Сохранить</button>
        </div>
        <div class="system_message">

        </div>
    </form>


</div>
