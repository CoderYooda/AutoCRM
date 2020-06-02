<div id="{{ $tag . ($vehicle->id ?? '') }}" class="dialog" style="width:600px;">

    <div class="titlebar">{{ $vehicle->full_name ?? 'Добавление нового транспорта' }}</div>

    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>
    <form id="act_form_partner" action="#" method="POST">

        @csrf

        @if(isset($vehicle->id))
            <input type="hidden" name="id" value="{{ $vehicle->id }}">
        @endif

        <div class="form-group fl_only">
            <label>VIN:</label>
            <input onclick="this.select();" type="text" name="numberplate"
                   @if(isset($vehicle)) value="{{ $vehicle->vin_code }}" @endif
                   class="form-control" />
        </div>

        <div class="form-group fl_only">
            <label>Гос. номер:</label>
            <input onclick="this.select();" type="text" name="numberplate"
                   @if(isset($vehicle)) value="{{ $vehicle->numberplate }}" @endif
                   class="form-control" />
        </div>

        <div class="form-group fl_only">
            <label>Год:</label>
            <input onclick="this.select();" type="text" name="year"
                   @if(isset($vehicle)) value="{{ $vehicle->year }}" @endif
                   class="form-control" />
        </div>

        <div class="modal-footer">
            <button onclick="window.{{ $class }}.finitaLaComedia()" class="button white">Закрыть</button>
            <button type="submit" onclick="window.{{ $class }}.save(this)" class="button pull-right">Сохранить</button>
        </div>
        <div class="system_message"></div>
    </form>
</div>
