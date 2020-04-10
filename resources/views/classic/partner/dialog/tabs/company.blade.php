<div class="tab-pane animate fadeIn text-muted ul_only @if(isset($partner) && $partner['isfl']) d-none-f @endif" id="tab_company{{ $class }}">
    <div class="form-group ul_only @if(isset($partner) && $partner['isfl']) d-none-f @endif">
        <label>Юридический адрес</label>
        <input type="text" name="ur_address"
               @if(isset($partner)) value="{{ $partner->ur_address }}" @endif
               class="form-control entrance" placeholder="Юридический адрес" @if(isset($partner) && $partner['isfl']) disabled @endif>
    </div>
    <div class="form-group ul_only @if(isset($partner) && $partner['isfl']) d-none-f @endif">
        <label>Фактический адрес</label>
        <input type="text" name="fact_address"
               @if(isset($partner)) value="{{ $partner->fact_address }}" @endif
               class="form-control entrance" placeholder="Фактический адрес" @if(isset($partner) && $partner['isfl']) disabled @endif>
    </div>
    <div class="form-group ul_only @if(isset($partner) && $partner['isfl']) d-none-f @endif">
        <label>ИНН</label>
        <input type="text" name="inn"
               @if(isset($partner)) value="{{ $partner->inn }}" @endif
               class="form-control entrance" placeholder="ИНН" @if(isset($partner) && $partner['isfl']) disabled @endif>
    </div>
    <div class="form-group ul_only @if(isset($partner) && $partner['isfl']) d-none-f @endif">
        <label>КПП</label>
        <input type="text" name="kpp"
               @if(isset($partner)) value="{{ $partner->kpp }}" @endif
               class="form-control entrance" placeholder="КПП" @if(isset($partner) && $partner['isfl']) disabled @endif>
    </div>
    <div class="form-group ul_only @if(isset($partner) && $partner['isfl']) d-none-f @endif">
        <label>ОГРН</label>
        <input type="text" name="ogrn"
               @if(isset($partner)) value="{{ $partner->ogrn }}" @endif
               class="form-control entrance" placeholder="ОГРН" @if(isset($partner) && $partner['isfl']) disabled @endif>
    </div>
    <div class="form-group ul_only @if(isset($partner) && $partner['isfl']) d-none-f @endif">
        <label>Банк</label>
        <input type="text" name="bank"
               @if(isset($partner)) value="{{ $partner->bank }}" @endif
               class="form-control entrance" placeholder="Банк" @if(isset($partner) && $partner['isfl']) disabled @endif>
    </div>
    <div class="form-group ul_only @if(isset($partner) && $partner['isfl']) d-none-f @endif">
        <label>БИК</label>
        <input type="text" name="bik"
               @if(isset($partner)) value="{{ $partner->bik }}" @endif
               class="form-control entrance" placeholder="БИК" @if(isset($partner) && $partner['isfl']) disabled @endif>
    </div>

</div>
