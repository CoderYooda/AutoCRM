{{--@extends('product.layout.tabs')--}}

@extends(request()->view_as == 'json' && request()->target == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.store.layout.tabs')

@section('title', $page ?? 'Статистика')

@section('content')
    @php $class = 'statisticShow' @endphp

    <div id="ajax-table-statistic" class="bottom-container d-flex">
        <div class="flex-1">
            <div class="d-flex">

                <div class="box mr-16 pt-16 ml-16" style="height: calc(100vh - 80px)!important; flex: 1.5!important;">
                    <canvas id="statistic-chart"></canvas>
                </div>

                <div class="flex-1 box pt-16 pl-16 mr-16" style="max-width: 388px;">
                    <div data-simplebar style="max-height: calc(100vh - 80px);">
                        <div id="statistic-list" style="position: relative">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
