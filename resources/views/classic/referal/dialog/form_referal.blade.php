@if(!$request['inner'])
        <div id="{{ $class }}" @if($referal) data-id="{{$referal->id}}" @endif class="dialog referal_dialog" style="width:400px">
@endif
    <div class="titlebar">{{ $referal ? ('Партнер №' . $referal->id) : ('Новый партнёр') }}</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
    <form class="clientOrderSMSListner" action="{{ route('StoreReferalPartner') }}" method="POST">
        <div class="modal-body p-10">
            @csrf
            <div class="form-group">
                <label for="name">Название (ФИО)</label>
                <input id="name" type="text" name="name" class="form-control form-control-sm">
            </div>
            <div class="form-group">
                <label for="phone">Телефон</label>
                <input id="phone_input" type="text" name="phone" class="form-control form-control-sm">
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input id="password" type="text" name="password" class="form-control form-control-sm">
            </div>
            <div class="form-group">
                <div class="d-flex mb-5">
                    <div class="checkbox">
                        <input name="send_sms" id="send_sms" type="checkbox">
                        <label for="send_sms"></label>
                    </div>
                    <label for="send_sms" style="margin-bottom: 2px;">Отправить SMS с доступом партнёру</label>
                </div>
            </div>
            <div class="form-group">
                <label for="code">Реферальный код</label>
                <input id="code" type="text" name="code" class="form-control form-control-sm">
            </div>
            <div class="form-group">
                <label for="">Вознаграждения партнера</label>

                <div class="d-flex mb-5">
                    <div class="checkbox">
                        <input name="percent_first_b" id="f_p" type="checkbox">
                        <label for="f_p"></label>
                    </div>
                    <label class="flex-1" for="f_p" style="margin-bottom: 2px;">Процент с первой оплаты</label>
                    <input type="text" name="percent_first_value" class="w-128 form-control form-control-sm ml-10" style="height: 22px;line-height: 22px;">
                    <div class="ml-10" style="width: 16px">%</div>
                </div>
                <div class="d-flex mb-5">
                    <div class="checkbox">
                        <input name="percent_each_b" id="a_p" type="checkbox">
                        <label for="a_p"></label>
                    </div>
                    <label class="flex-1" for="a_p" style="margin-bottom: 2px;">Процент с каждой оплаты</label>
                    <input type="text" name="percent_each_value" class="w-128 form-control form-control-sm ml-10" style="height: 22px;line-height: 22px;">
                    <div class="ml-10" style="width: 16px">%</div>
                </div>
                <div class="d-flex mb-5">
                    <div class="checkbox">
                        <input name="rubbles_first_b" id="f_r" type="checkbox">
                        <label for="f_r"></label>
                    </div>
                    <label class="flex-1" for="f_r" style="margin-bottom: 2px;">Рублей с первой оплаты</label>
                    <input type="text" name="rubbles_first_value" class="w-128 form-control form-control-sm ml-10" style="height: 22px;line-height: 22px;">
                    <div class="ml-10" style="width: 16px">₽</div>
                </div>
                <div class="d-flex mb-5">
                    <div class="checkbox">
                        <input name="rubbles_each_b" id="a_r" type="checkbox">
                        <label for="a_r"></label>
                    </div>
                    <label class="flex-1" for="a_r" style="margin-bottom: 2px;">Рублей с каждой оплаты</label>
                    <input type="text" name="rubbles_each_value" class="w-128 form-control form-control-sm ml-10" style="height: 22px;line-height: 22px;">
                    <div class="ml-10" style="width: 16px">₽</div>
                </div>
                <div class="form-group">
                    <label for="comment">Комментарий</label>
                    <textarea name="comment" type="text" class="form-control form-control-sm" style="max-width: 100%; min-width: 100%; height: 120px;"></textarea>
                </div>
            </div>
        </div>

        <div class="modal-footer" style="white-space: nowrap">
            <button type="button" class="button white uppercase-btn" onclick="{{ $class }}.finitaLaComedia()">Закрыть</button>
            <button type="button" onclick="{{ $class }}.save(this)" class="button primary pull-right uppercase-btn  mr-15" >Сохранить</button>
        </div>
        <div class="system_message">

        </div>
    </form>
@if(!$request['inner'])
    </div>
@endif
