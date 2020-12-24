@if(!$request['inner'])
        <div id="{{ $class }}" @if($referal) data-id="{{$referal->id}}" @endif class="dialog referal_dialog" style="width:400px">
@endif
    <div class="titlebar">{{ $referal ? ('Партнер №' . $referal->id) : ('Новый партнёр') }}</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
    <form class="clientOrderSMSListner" action="/member/store" method="POST">
        <div class="modal-body p-10">
            @csrf
            <div class="form-group">
                <label for="name">Название</label>
                <input id="name" type="text" class="form-control form-control-sm">
            </div>
            <div class="form-group">
                <label for="code">Реферальный код</label>
                <input id="code" type="text" class="form-control form-control-sm">
            </div>
            <div class="form-group">
                <label for="">Вознаграждения партнера</label>

                <div class="d-flex">
                    <div class="checkbox">
                        <input name="f_p" id="f_p" type="checkbox">
                        <label for="f_p"></label>
                    </div>
                    <label class="flex-1" for="f_p" style="margin-bottom: 2px;">Процент с первой оплаты</label>
                    <input id="code" type="text" class="w-128 form-control form-control-sm ml-10" style="height: 22px;line-height: 22px;">
                    <div class="ml-10" style="width: 16px">%</div>
                </div>
                <div class="d-flex">
                    <div class="checkbox">
                        <input name="a_p" id="a_p" type="checkbox">
                        <label for="a_p"></label>
                    </div>
                    <label class="flex-1" for="a_p" style="margin-bottom: 2px;">Процент с каждой оплаты</label>
                    <input id="code" type="text" class="w-128 form-control form-control-sm ml-10" style="height: 22px;line-height: 22px;">
                    <div class="ml-10" style="width: 16px">%</div>
                </div>
                <div class="d-flex">
                    <div class="checkbox">
                        <input name="f_r" id="f_r" type="checkbox">
                        <label for="f_r"></label>
                    </div>
                    <label class="flex-1" for="f_r" style="margin-bottom: 2px;">Рублей с первой оплаты</label>
                    <input id="code" type="text" class="w-128 form-control form-control-sm ml-10" style="height: 22px;line-height: 22px;">
                    <div class="ml-10" style="width: 16px">₽</div>
                </div>
                <div class="d-flex">
                    <div class="checkbox">
                        <input name="a_r" id="a_r" type="checkbox">
                        <label for="a_r"></label>
                    </div>
                    <label class="flex-1" for="a_r" style="margin-bottom: 2px;">Рублей с каждой оплаты</label>
                    <input id="code" type="text" class="w-128 form-control form-control-sm ml-10" style="height: 22px;line-height: 22px;">
                    <div class="ml-10" style="width: 16px">₽</div>
                </div>
            </div>
        </div>

        <div class="modal-footer" style="white-space: nowrap">
            <button type="button" class="button white uppercase-btn" onclick="{{ $class }}.finitaLaComedia()">Закрыть</button>
            <button type="button" class="button primary pull-right uppercase-btn  mr-15" >Сохранить</button>
        </div>
        <div class="system_message">

        </div>
    </form>
@if(!$request['inner'])
    </div>
@endif
