{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.store.layout.tabs')

@section('title', $page ?? 'Статистика')

@section('content')
    @php $class = 'statistic' @endphp
    <div id="ajax-table-statistic" class="bottom-container">
        Общий профит компании: {{ $info['profit'] }}
        <br/>
        Общий расход компании: {{ $info['expenses'] }}
    </div>
@endsection