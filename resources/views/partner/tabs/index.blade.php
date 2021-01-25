@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'partner.layouts.tabs')

@section('tab')
    <div class="p-15" data-simplebar style="height:100%">
        <div class="box p-10 mb-10">
            <div class="d-flex mb-15">
                <div class="flex-1">
                    <h3 class="mt-0 mb-0">{{ $partner->name }}</h3>
                </div>
                <div class="flex-1">
                    <div class="w-100 text-right pull-right">Реферальный код <b>{{ $partner->code }}</b></div>
                    <div class="w-100 text-right pull-right">Дата регистрации {{ $partner->created_at }}</div>
                </div>
            </div>

            <div class="mb-15">
                <div class=""><b>Условия сотрудничества:</b>
                    @if(!$partner->percent_first_b && !$partner->percent_each_b && !$partner->rubbles_first_b && !$partner->rubbles_each_b) Условия не были выбраны@endif
                    @if($partner->percent_first_b)Процент с первой оплаты : {{ $partner->percent_first_value }}% <br>@endif
                    @if($partner->percent_each_b)Процент с каждой оплаты : {{ $partner->percent_each_value }}% <br>@endif
                    @if($partner->rubbles_first_b)Рублей с первой оплаты : {{ $partner->rubbles_first_value }}₽ <br>@endif
                    @if($partner->rubbles_each_b)Рублей с каждой оплаты : {{ $partner->rubbles_each_value }}₽ <br>@endif
                </div>
            </div>

            <div>
                <div class="mb-10"><b>Привлеченные компании:</b></div>
                @if($partner && $partner->companies->count())
                    <div class="">
                        @foreach($partner->companies as $company)
                            <div class="box p-10">
                                <div class="d-flex">
                                    <div class="flex-1"><h2>{{ $company->name }}</h2> (ID: {{ $company->id }})</div>
                                    <div class="flex-1 text-right">Дата регистрации: {{ $company->created_at }}</div>
                                </div>

                                <div>
                                    <h3 class="mb-0 mt-10">Оплаты компании</h3>
                                </div>
                                <div>
                                    @if($company->confirmedPayments()->count())
                                        <table class="w-100">
                                            <thead>
                                            <th>Номер</th>
                                            <th>Плательщик</th>
                                            <th>Сумма</th>
                                            <th>Дата</th>
                                            <th>Начисление</th>
                                            </thead>
                                            <tbody>
                                            @foreach($company->confirmedPayments as $payment)
                                                <tr>
                                                    <td>{{ $loop->index + 1 }}</td>
                                                    <td>{{ $payment->partner->outputName() }}</td>
                                                    <td>{{ $payment->amount / 100 }}</td>
                                                    <td>{{ $payment->created_at }}</td>

                                                    @if($partner->percent_first_b && $loop->index === 0)
                                                        <td>{{ $payment->amount / 100 / 100 * $partner->percent_first_value }} ₽</td>
                                                    @elseif($partner->percent_each_b)
                                                        <td>{{ $payment->amount / 100 / 100 * $partner->percent_each_value }} ₽</td>
                                                    @elseif($partner->rubbles_first_b)
                                                        <td>{{ $payment->amount / 100 / 100 * $partner->rubbles_first_value }} ₽</td>
                                                    @elseif($partner->rubbles_each_b)
                                                        <td>{{ $payment->amount / 100 / 100 * $partner->rubbles_each_value }} ₽</td>
                                                    @else
                                                        <td>0 ₽</td>
                                                    @endif
                                                </tr>
                                            @endforeach
                                            </tbody>
                                        </table>
                                    @else
                                        <div>Оплат не было совершено</div>
                                    @endif
                                </div>
                            </div>
                        @endforeach
                    </div>
                @else
                    <div class="box p-10">Привлеченных компаний нет</div>
                @endif
            </div>
        </div>
    </div>


@endsection
