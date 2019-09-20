@php $moneymoves = \App\Http\Controllers\MoneyMoveController::getMoneyMoves($request) @endphp
<div class="d-flex flex white" data-simplebar style="max-height: calc(100% - 61px);">
{{--    <div class="d-flex flex-column white flex lt">--}}
{{--        <div class="white b-r d-table">--}}
{{--            <div class="">--}}
                @if( $moneymoves->count() > 0)
                <div class="">
                    <table class="table mb-0">
                        <thead>
                        <tr>
                            <th style="width:20px;">
                                №
                            </th>
                            <th>Дата</th>
                            <th>Касса отправитель</th>
                            <th>Касса получатель</th>
                            <th>Сумма</th>
                            <th style="width:60px;"></th>
                        </tr>
                        </thead>
                        <tbody>
                            <div class="list">
                                @foreach($moneymoves as $moneymove)
                                    @include('cash.elements.moneymove_list_element')
                                @endforeach
                            </div>
                        </tbody>
                    </table>
                </div>
                @else
                    <div class="no-result">
                        <div class="p-4 text-center">
                            По данным критериям ничего нет.
                        </div>
                    </div>
                @endif
{{--            </div>--}}
{{--        </div>--}}
{{--    </div>--}}
</div>
<div class="p-3 b-t mt-auto">
    <div class="d-flex align-items-center">
        <div class="flex">
            {{ $moneymoves->setPath(route('CashIndex'))->appends(request()->only(['active_tab', 'date_start', 'date_end', 'isIncoming', 'page', 'search']))->links() }}
        </div>
        <div>
            <span class="text-muted">Total:</span>
            <span id="count"></span>
        </div>
    </div>
</div>
