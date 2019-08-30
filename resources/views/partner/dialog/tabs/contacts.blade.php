<div class="tab-pane animate fadeIn text-muted" id="tab_contacts">
    <div class="form-group addable" id="phones_addable">
        <label>Номер телефона</label>
        <div class="phones">
            @if(isset($partner))
                @if($partner->phones()->get() != NULL)
                    @foreach($partner->phones()->get() as $phone)
                        <div class="input-group mb-2 phone" data-id="{{$phone->id}}">
                            <input type="hidden" name="phones[{{$phone->id}}][id]" value="{{$phone->id}}">
                            <input type="text" name="phones[{{$phone->id}}][number]" value="{{$phone->number}}" class="form-control phone_input" placeholder="Номер телефона">
                            <span class="input-group-append" title="Основной номер">
                                <div class="input-group-text border-left-0">
                                    <label class="ui-check" style="margin-bottom: 0;margin-top: 1px;">
                                        <input type="checkbox" name="phones[{{$phone->id}}][main]" value="1" @if($phone->main) checked @endif>
                                        <i class="dark-white"></i>
                                    </label>
                                </div>
                            </span>
                            <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Удалить номер">
                                <button onclick="partner.deletePhone(this)" class="input-group-text btn btn-icon white" type="button" style="height: auto">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </span>
                        </div>
                    @endforeach
                @endif
            @endif
            @if(!isset($partner) || $partner->phones()->count() < 1)
                <div class="input-group mb-2 phone">
                    <input type="text" name="phones[num1][number]" class="form-control phone_input" placeholder="Номер телефона">
                    <span class="input-group-append" title="Основной номер">
                        <div class="input-group-text border-left-0">
                            <label class="ui-check" style="margin-bottom: 0;margin-top: 1px;">
                                <input type="checkbox" name="phones[num1][main]" value="1">
                                <i class="dark-white"></i>
                            </label>
                        </div>
                    </span>
                    <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Удалить номер">
                        <button onclick="partner.deletePhone(this)" class="input-group-text btn btn-icon white" type="button" style="height: auto">
                            <i class="fa fa-trash"></i>
                        </button>
                    </span>
                </div>
             @endif
        </div>
        <button onclick="partner.addPhone(this)" type="button" class="btn btn-sm white">Добавить номер телефона</button>
    </div>
    <div class="form-group fl_only @if(isset($partner) && !$partner['isfl']) d-none-f @endif">
        <label>Адрес проживания</label>
        <input type="text" name="address"
               @if(isset($partner)) value="{{ $partner->address }}" @endif
               class="form-control entrance" placeholder="Адрес проживания" @if(isset($partner) && !$partner['isfl']) disabled @endif>
    </div>
    <div class="form-group">
        <label>Email</label>
        <input type="text" name="email"
               @if(isset($partner)) value="{{ $partner->email }}" @endif
               class="form-control" placeholder="Электронная почта">
    </div>
</div>
