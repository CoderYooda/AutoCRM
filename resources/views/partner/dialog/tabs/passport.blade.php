<div class="tab-pane animate fadeIn text-muted" id="tab_passport">
    @if(isset($partner) && $partner->passport)
        <input type="hidden" name="passport_id" value="{{$partner->passport->id}}">
    @endif

    <div class="form-group">
        <label>Серия и номер</label>
        <div class="input-group mb-2">
            <input type="text" name="number"
                   @if(isset($partner) && $partner->passport)
                       value="{{ $partner->passport->number }}"
                   @endif
                   class="form-control pass_num_input" placeholder="Серия и номер">
        </div>
    </div>
    <div class="form-group">
        <label>Кем выдан</label>
        <div class="input-group mb-2">
            <input type="text" name="issued_by"
                   @if(isset($partner) && $partner->passport)
                    value="{{ $partner->passport->issued_by }}"
                   @endif
                   class="form-control" placeholder="Кем выдан">
        </div>
    </div>
    <div class="form-group">
        <label>Дата выдачи</label>
        <div class="input-group mb-2">
            <input type="text" name="issued_date"
                   @if(isset($partner) && $partner->passport)
                        value="{{ $partner->passport->issued_date }}"
                   @endif
                   class="form-control date_picker" placeholder="Дата выдачи">
        </div>
    </div>

    <div class="form-group">
        <label>Место выдачи</label>
        <div class="input-group mb-2">
            <input type="text" name="issued_place"
                   @if(isset($partner) && $partner->passport)
                        value="{{ $partner->passport->issued_place }}"
                   @endif
                   class="form-control" placeholder="Место выдачи">
        </div>
    </div>
</div>
