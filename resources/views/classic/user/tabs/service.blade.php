@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? get_template() . '.layouts.TabXHR' : get_template() . '.user.index')

@section('tab')
    <div class="box mb-15">
        <div class="p-15 d-flex">
            <div>
                {{--<span class="system_balance pr-15">Баланс: <b>{{ number_format(Auth::user()->company->balance, 2, ',', ' ')  }} <sup>₽</sup></b></span> |--}}

                @if(Auth::user()->company->blocked)
                    <span class="system_balance"> Компания "{{ Auth::user()->company->name }}" заблокирована. Для активации свяжитесь с администратором</span>
                @elseif(Auth::user()->company->payed_days < Carbon\Carbon::now()->timestamp)
                    <span class="system_balance"> Компания "{{ Auth::user()->company->name }}" заблокирована. Для активации выберите тариф</span>
                @else
                    <span class="system_balance pr-15">Состояние записи: <b>Активно</b>. До отключения: <b>{{ Auth::user()->company->getPayedDays() }} дн.</b></span>
                @endif

            </div>
        </div>
    </div>
    <div class="box mb-15">
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
    </div>
    <div class="box mb-15">
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
                                @include(get_template() . '.tariff.payment_element')
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

@endsection
