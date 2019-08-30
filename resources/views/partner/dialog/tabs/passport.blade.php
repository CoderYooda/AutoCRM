<div class="tab-pane animate fadeIn text-muted fl_only @if(isset($partner) && !$partner['isfl']) d-none-f @endif" id="tab_passport">
    @if(isset($partner) && $partner->passport)
        <input class="entrance" type="hidden" name="passport_id" value="{{$partner->passport->id}}">
    @endif

    <div class="form-group fl_only @if(isset($partner) && !$partner['isfl']) d-none-f @endif">
        <label>Серия и номер</label>
        <div class="input-group mb-2">
            <input type="text" name="number"
                   @if(isset($partner) && $partner->passport)
                       value="{{ $partner->passport->number }}"
                   @endif
                   class="form-control pass_num_input entrance" placeholder="Серия и номер" @if(isset($partner) && !$partner['isfl']) disabled @endif>
        </div>
    </div>
    <div class="form-group fl_only @if(isset($partner) && !$partner['isfl']) d-none-f @endif">
        <label>Кем выдан</label>
        <div class="input-group mb-2">
            <input type="text" name="issued_by"
                   @if(isset($partner) && $partner->passport)
                    value="{{ $partner->passport->issued_by }}"
                   @endif
                   class="form-control entrance" placeholder="Кем выдан" @if(isset($partner) && !$partner['isfl']) disabled @endif>
        </div>
    </div>
    <div class="form-group fl_only @if(isset($partner) && !$partner['isfl']) d-none-f @endif">
        <label>Дата выдачи</label>
        <div class="input-group mb-2">
            <input type="text" name="issued_date"
                   @if(isset($partner) && $partner->passport)
                        value="{{ $partner->passport->issued_date }}"
                   @endif
                   class="form-control date_picker entrance" placeholder="Дата выдачи" @if(isset($partner) && !$partner['isfl']) disabled @endif>
        </div>
    </div>

    <div class="form-group fl_only @if(isset($partner) && !$partner['isfl']) d-none-f @endif">
        <label>Место выдачи</label>
        <div class="input-group mb-2">
            <input type="text" name="issued_place"
                   @if(isset($partner) && $partner->passport)
                        value="{{ $partner->passport->issued_place }}"
                   @endif
                   class="form-control entrance" placeholder="Место выдачи" @if(isset($partner) && !$partner['isfl']) disabled @endif>
        </div>
    </div>
</div>
