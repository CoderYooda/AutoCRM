<div data-simplebar style="max-height: 500px;">
    <div class="form-group ip ul">
        <label>ИНН</label>
        <input type="text" name="inn" onchange="{{ $class }}.writingInn(this)" value="{{ $partner->inn ?? '' }}" class="form-control entrance" placeholder="ИНН">
    </div>

    <div class="form-group ul">
        <label>КПП</label>
        <input type="text" name="kpp" value="{{ $partner->kpp ?? '' }}" class="form-control entrance" placeholder="КПП">
    </div>

    <div class="form-group ip">
        <label>ОГРНИП</label>
        <input type="text" name="ogrn" value="{{ $partner->ogrn ?? '' }}" class="form-control entrance" placeholder="ОГРНИП">
    </div>

    <div class="form-group ul">
        <label>ОГРН</label>
        <input type="text" name="ogrn" value="{{ $partner->ogrn ?? '' }}" class="form-control entrance" placeholder="ОГРН">
    </div>

    <div class="form-group ip ul">
        <label>БИК</label>
        <input type="text" name="bik" onchange="{{ $class }}.writingBik(this)" value="{{ $partner->bik ?? '' }}"
               class="form-control entrance" placeholder="БИК">
    </div>
    <div class="form-group ip ul">
        <label>Банк</label>
        <input type="text" name="bank" value="{{ $partner->bank ?? '' }}" class="form-control entrance" placeholder="Банк">
    </div>

    <div class="form-group ip ul">
        <label>Корреспонденский счет</label>
        <input type="text" name="cs" value="{{ $partner->cs ?? '' }}" class="form-control entrance" placeholder="К/С">
    </div>

    <div class="form-group ip ul">
        <label>Расчетный счет</label>
        <input type="text" name="rs" value="{{ $partner->rs ?? '' }}" class="form-control entrance" placeholder="К/С">
    </div>

    <div class="form-group ul">
        <label>
            Юридический адрес
            <span onclick="{{ $class }}.showField(this, 'fact_address')" class="input_as_link pointer" @hide($partner && $partner->fact_address)>Не совпадает с фактическим?</span>
        </label>
        <input type="text" name="ur_address" value="{{ $partner->ur_address ?? '' }}" class="form-control entrance" placeholder="Юридический адрес">
    </div>

    <div class="form-group ul d-none @if(!$partner || !$partner->fact_address) mb-0 hide @endif">
        <label>Фактический адрес</label>
        <input type="text" name="fact_address" value="{{ $partner->fact_address ?? '' }}" class="form-control entrance" placeholder="Фактический адрес">
    </div>
</div>
