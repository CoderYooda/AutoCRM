<div class="box-lister box">
    <div id="actions-container" class="box-content p-15">
        {{--{{ Auth::user()->getAllPermissions() }}--}}
        <table class="table w-100">
            <thead>
            <th>SMS ID</th>
            <th>Цена</th>
            <th>Текст сообщения</th>
            <th>Адресат</th>
            </thead>
            <tbody>
            @foreach($smses as $sms)
                <tr>
                    <td>{{ $sms->sms_id }}</td>
                    <td>{{ $sms->cost }}</td>
                    <td>{{ $sms->message }}</td>
                    <td>{{ App\Http\Controllers\HelpController::phoneFormat($sms->phone) }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>
<div class="content-rightside">
    <div class="box w-290 p-15 filter-panel">
        <div class="box-title">SMS Баланс: <span id="sms_balance">{{ Auth::user()->company->getSmsBalance() }}</span></div> <span onclick="settings.checkSmsPayments()">проверить</span>
        <div class="input-group mb-3">
            <input id="amount" type="number" class="form-control brad-3 mr-5" value="100">
            <button type="button" onclick="settings.getSmsPayment()" class="button primary form-control pr-15">Пополнить</button>
        </div>
    </div>
</div>
