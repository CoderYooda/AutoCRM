@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.user.index')

@section('tab')
    <div class="p-15 d-flex" style="padding-bottom: 0px">
        <div>
            <span class="system_balance">Средства: <b>{{ Auth::user()->company->balance }} <sup>₽</sup></b></span>
        </div>

    </div>


    <div class="container tariff-container p-15">
        <div class="row no-gutters">
            <div class="col-sm-4 pr-75">
                <div class="box">
                    <div class="box-body text-center r-t primary">
                        <h6 class="text-u-c">30 дней</h6>
                        <h3 class="py-3">
                            <span class="text-2x">2 500</span>
                            <sup>₽</sup>
                            <span class="text-xs">/ 30 дней</span>
                        </h3>
                    </div>
                    <ul class="list m-0 b-t b-b no-radius">
                        <li class="list-item">
                            <div class="list-body" style="margin: auto;">
                                <i class="fa fa-check text-success mr-2"></i> Без ограничений
                            </div>
                        </li>
                    </ul>
                    <div class="text-center p-3 mb-15">
                        <button class="button primary" onclick="user.getPayment(30)">Оплатить</button>
                    </div>
                </div>
            </div>
            <div class="col-sm-4 pr-75 pl-75">
                <div class="box">
                    <div class="box-body text-center r-t primary">
                        <h6 class="text-u-c">180 дней</h6>
                        <h3 class="py-3">
                            <span class="text-2x">2 400</span>
                            <sup>₽</sup>
                            <span class="text-xs">/ 30 дней</span>
                        </h3>
                    </div>
                    <ul class="list m-0 b-t b-b no-radius">
                        <li class="list-item">
                            <div class="list-body" style="margin: auto;">
                                <i class="fa fa-check text-success mr-2"></i> Без ограничений
                            </div>
                        </li>
                    </ul>
                    <div class="text-center p-3 mb-15">
                        <button class="button primary" onclick="user.getPayment(180)">Оплатить</button>
                    </div>
                </div>
            </div>
            <div class="col-sm-4 pl-75">
                <div class="box">
                    <div class="box-body text-center r-t primary">
                        <h6 class="text-u-c">360 дней</h6>
                        <h3 class="py-3">
                            <span class="text-2x">2 300</span>
                            <sup>₽</sup>
                            <span class="text-xs">/ 30 дней</span>
                        </h3>
                    </div>
                    <ul class="list m-0 b-t b-b no-radius">
                        <li class="list-item">
                            <div class="list-body" style="margin: auto;">
                                <i class="fa fa-check text-success mr-2"></i> Без ограничений
                            </div>
                        </li>
                    </ul>
                    <div class="text-center p-3 mb-15">
                        <button class="button primary" onclick="user.getPayment(360)">Оплатить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="p-15">
        <span><b>История платежей</b></span>
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
    </div>

@endsection
