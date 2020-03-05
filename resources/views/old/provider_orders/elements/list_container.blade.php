@php $provider_orders = \App\Http\Controllers\ProviderOrdersController::getPoviderOrders($request) @endphp
<div class="d-flex flex white" data-simplebar style="max-height: calc(100% - 61px);">
    @if( $provider_orders->count() > 0)
    <div class="">
        <table class="table mb-0">
            <thead>
            <tr>
                <th style="width:20px;">№</th>
                <th>Дата</th>
                <th>Поставщик</th>
                <th>Сумма</th>
                <th>Скидка</th>
                <th style="width:120px;">Итого</th>
                <th style="width:60px;"></th>
            </tr>
            </thead>
            <tbody>
                <div class="list">
                    @foreach($provider_orders as $provider_order)
                        @include('provider_orders.elements.list_element')
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
</div>
<div class="p-3 b-t mt-auto">
    <div class="d-flex align-items-center">
        <div class="flex">
            {{ $provider_orders->setPath(route('StoreIndex'))->appends(request()->only(['active_tab', 'date_start', 'date_end', 'isIncoming', 'page', 'search']))->links() }}
        </div>
        <div>
            <span class="text-muted">Total:</span>
            <span id="count"></span>
        </div>
    </div>
</div>