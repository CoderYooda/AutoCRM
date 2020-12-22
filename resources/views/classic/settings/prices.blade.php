@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? get_template() . '.layouts.TabXHR' : get_template() . '.settings.layout.tabs')

@section('tab')

    <div id="ajax-table-prices">

        @include(get_template() . '.settings.elements.prices_inner')

    </div>

@endsection

