<div class="box-lister d-flex">
    <div id="actions-container" class="box-content p-15 box mb-15 flex-1">
        <h2 class="mt-0 style_header mb-15">История отправленных SMS</h2>
        {{--{{ Auth::user()->getAllPermissions() }}--}}
        <div class="scroll_optimize" data-simplebar style="height: 40vh;" >
            <table class="table w-100">
                <thead class="mt-10">
                <th><div class="mb-10">SMS ID</div></th>
                <th><div class="mb-10">Дата</div></th>
                <th><div class="mb-10">Цена</div></th>
                <th><div class="mb-10">Текст сообщения</div></th>
                <th><div class="mb-10">Адресат</div></th>
                </thead>
                <tbody>
                @foreach($smses as $sms)
                    <tr class="simple-row sms-table" style="border-bottom: 1px solid #eee">
                        <td>{{ $sms->sms_id }}</td>
                        <td>{{ $sms->created_at->format('d.m.Y H:i:s') }}</td>
                        <td class="no-wrap">{{ $sms->cost }} ₽</td>
                        <td>{{ $sms->message }}</td>
                        <td class="no-wrap">{{ phone_format($sms->phone) }}</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
    <div class="box flex-1">
        <div class="p-15">
            <span><b>История платежей</b></span>
            <div class="mt-15 p-container no-wrap">
                <ul class="list-p-items mb-0 mt-0 bb-0">
                    <li class="item d-flex">
                        <div class="flex-1 p-id"><b>ID</b></div>
                        <div class="flex-1 p-amount"><b>Сумма</b></div>
                        <div class="flex-2 p-partner"><b>Плательщик</b></div>
                        <div class="flex-2 p-idn"><b>Идентификатор платежа</b></div>
                        <div class="flex-1 p-status"><b>Статус</b></div>
                        <div class="flex-1 p-data"><b>Дата</b></div>
                        <div class="flex-1 p-data"></div>
                    </li>
                </ul>
                <ul data-simplebar style="max-height: 400px;" class="list-p-items mb-0 mt-0">
                    @if($payments->count() > 0)
                    @foreach($payments as $payment)
                    <li class="item d-flex no-wrap" id="payment{{ $payment->id }}">
                        @include(get_template() . '.tariff.sms_payment_element')
                    </li>
                    @endforeach
                    @else
                    <li>
                        <div class="padding text-center">
                            <div>
                                <div class="out_of_search"></div>
                                <div class="mb-15">
                                    Платежей ранее не совершалось
                                </div>
                            </div>
                        </div>
                    </li>
                    @endif
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="content-rightside">
    <div class="box w-290 p-15 filter-panel">

        <div class="sms-stat-block mb-15">
            <div class="text-muted">SMS Баланс:</div>
            <div class="sms-balance"><span id="sms_balance">{{ Auth::user()->company->getSmsBalance() }}</span> ₽</div>
            <a onclick="settings.checkSmsPayments()">Обновить  <i class="fa fa-refresh"></i></a>
        </div>

        <div class="input-group">
            <input id="amount" type="number" min="0" class="form-control brad-3 mr-5" value="100">
            <span class="number_val">₽</span>
            <button type="button" onclick="settings.getSmsPayment()" class="button primary form-control pr-15">Пополнить</button>
        </div>
    </div>
</div>
