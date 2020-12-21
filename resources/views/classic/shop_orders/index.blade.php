@extends($request['view_as'] == 'json' && $request['target'] != null ? get_template() . '.layouts.TabXHR' : get_template() . '.store.layout.tabs')

@section('tab')

    <div id="ajax-table-shop_orders" class="bottom-container">
        @include(get_template() . '.shop_orders.elements.table_container')
    </div>

@endsection
