@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.store.layout.tabs')

@section('title', $page ?? 'Каталог')

@section('tab')

    @php $class = 'store' @endphp
    <div style="overflow: auto" class="box-lister catalogue">
        <div id="ajax-table-store" class="">
            @include(get_template() . '.catalogue.marks')
        </div>
    </div>


@endsection
