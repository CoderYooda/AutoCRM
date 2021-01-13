@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'admin.layouts.tabs')

@section('tab')

    <div id="ajax-table-companies" class="bottom-container" style="height: calc(100% - 79px) !important;">
        <div class="box-lister">
            <div class="" data-simplebar style="max-height: calc(100% - 28px)">
            @foreach($partners as $partner)
                <div class="box p-10 mb-10">
                    <div class="d-flex">
                        <div class="flex-1">
                            <h3 class="mt-0 mb-0">{{ $partner->referal->name }}</h3>
                        </div>
                        <div class="flex-1">
                            <div class="w-100 text-right pull-right">Реферальный код {{ $partner->referal->code }}</div>
                            <div class="w-100 text-right pull-right">Дата регистрации {{ $partner->referal->created_at }}</div>
                        </div>
                    </div>



                    <div class="weight"><b>Условия сотрудничества:</b></div>
                    @if(!$partner->referal->percent_first_b && !$partner->referal->percent_each_b && !$partner->referal->rubbles_first_b && !$partner->referal->rubbles_each_b) Условия не были выбраны@endif
                    @if($partner->referal->percent_first_b)Процент с первой оплаты : {{ $partner->referal->percent_first_value }}% <br>@endif
                    @if($partner->referal->percent_each_b)Процент с каждой оплаты : {{ $partner->referal->percent_each_value }}% <br>@endif
                    @if($partner->referal->rubbles_first_b)Рублей с первой оплаты : {{ $partner->referal->rubbles_first_value }}₽ <br>@endif
                    @if($partner->referal->rubbles_each_b)Рублей с каждой оплаты : {{ $partner->referal->rubbles_each_value }}₽ <br>@endif
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
