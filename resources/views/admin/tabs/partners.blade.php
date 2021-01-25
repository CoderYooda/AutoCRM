@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'admin.layouts.tabs')

@section('tab')
    <div id="ajax-table-companies" class="bottom-container" style="height: calc(100% - 79px) !important;">
        <div class="box-lister">
            <div class="" data-simplebar style="max-height: calc(100% - 28px)">
            @foreach($partners as $partner)
                <div class="box p-10 mb-10">
                    <div class="d-flex mb-15">
                        <div class="flex-1">
                            Партнёр <h3 class="mt-0 mb-0">{{ $partner->referal->name }}</h3>
                        </div>
                        <div class="flex-1">
                            <div class="w-100 text-right pull-right">Реферальный код <b>{{ $partner->referal->code }}</b></div>
                            <div class="w-100 text-right pull-right">Дата регистрации {{ $partner->referal->created_at }}</div>
                        </div>
                    </div>


                    <div class="mb-15">
                        <div class=""><b>Условия сотрудничества:</b>
                        @if(!$partner->referal->percent_first_b && !$partner->referal->percent_each_b && !$partner->referal->rubbles_first_b && !$partner->referal->rubbles_each_b) Условия не были выбраны@endif
                        @if($partner->referal->percent_first_b)Процент с первой оплаты : {{ $partner->referal->percent_first_value }}% <br>@endif
                        @if($partner->referal->percent_each_b)Процент с каждой оплаты : {{ $partner->referal->percent_each_value }}% <br>@endif
                        @if($partner->referal->rubbles_first_b)Рублей с первой оплаты : {{ $partner->referal->rubbles_first_value }}₽ <br>@endif
                        @if($partner->referal->rubbles_each_b)Рублей с каждой оплаты : {{ $partner->referal->rubbles_each_value }}₽ <br>@endif
                        </div>
                    </div>


                    <div>
                        <div class="mb-10"><b>Привлеченные компании:</b></div>
                        @if($partner->referal && $partner->referal->companies->count())
                            <div class="">
                                @foreach($partner->referal->companies as $company)
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

                                                            @if($partner->referal->percent_first_b && $loop->index === 0)
                                                                <td>{{ $payment->amount / 100 / 100 * $partner->referal->percent_first_value }} ₽</td>
                                                            @elseif($partner->referal->percent_each_b)
                                                                <td>{{ $payment->amount / 100 / 100 * $partner->referal->percent_each_value }} ₽</td>
                                                            @elseif($partner->referal->rubbles_first_b)
                                                                <td>{{ $payment->amount / 100 / 100 * $partner->referal->rubbles_first_value }} ₽</td>
                                                            @elseif($partner->referal->rubbles_each_b)
                                                                <td>{{ $payment->amount / 100 / 100 * $partner->referal->rubbles_each_value }} ₽</td>
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
            @endforeach
            </div>
            <div class="pagination">{{ $partners->appends(['active_tab' => 'partners'])->links() }}</div>
        </div>
        <div class="content-rightside">
            <div class="box w-290 p-15 filter-panel">
                <button onclick="window.openDialog('referalPartnerDialog');" class="button primary w-100">Добавить партнёра</button>
            </div>
        </div>
    </div>
@endsection
