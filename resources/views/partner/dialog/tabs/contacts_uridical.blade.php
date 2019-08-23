<div class="tab-pane animate fadeIn text-muted" id="tab_contacts_uridical">
    <div class="form-group" id="phones_addable">
        <label>Номер телефона</label>
        <div class="input-group mb-2">
            <input type="text" name="ur_phones[1][number]" class="form-control" placeholder="Номер телефона">
            <span class="input-group-append" title="Основной номер">
                <div class="input-group-text">
                    <input name="ur_phones[1][main]" value="1" type="checkbox" checked>
                </div>
            </span>
        </div>
        <div class="input-group mb-2">
            <input type="text" name="ur_phones[2][number]" class="form-control" placeholder="Номер телефона">
            <span class="input-group-append" title="Основной номер">
                <div class="input-group-text">
                    <input name="ur_phones[2][main]" value="1" type="checkbox">
                </div>
            </span>
        </div>
    </div>
    <div class="form-group">
        <label>Адрес проживания</label>
        <input type="text" name="ur_address"
               @if(isset($partner)) value="{{ $partner->address }}" @endif
               class="form-control" placeholder="Адрес проживания">
    </div>
    <div class="form-group">
        <label>Email</label>
        <input type="text" name="ur_email"
               @if(isset($partner)) value="{{ $partner->email }}" @endif
               class="form-control" placeholder="Электронная почта">
    </div>
</div>
