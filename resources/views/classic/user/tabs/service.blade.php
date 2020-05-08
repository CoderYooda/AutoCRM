@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.user.index')

@section('tab')
    <div class="p-15">
        Средства: 890р <button class="button primary" onclick="user.getPayment()">Пополнить счет</button>
    </div>
    <span> История платежей</span>
    <ul class="list-p-items">
        <li class="item d-flex">
            <div class="flex-1 p-id"><b>ID</b></div>
            <div class="flex-1 p-amount"><b>Сумма</b></div>
            <div class="flex-2 p-partner"><b>Плательщик</b></div>
            <div class="flex-2 p-idn"><b>Идентификатор платежа</b></div>
            <div class="flex-1 p-status"><b>Статус</b></div>
            <div class="flex-1 p-data"><b>Дата</b></div>
            <div class="flex-1 p-data"></div>
        </li>
        @foreach($payments as $payment)
            <li class="item d-flex" id="payment{{ $payment->id }}">
                @include(env('DEFAULT_THEME', 'classic') . '.tariff.payment_element')
            </li>
        @endforeach
    </ul>
@endsection
