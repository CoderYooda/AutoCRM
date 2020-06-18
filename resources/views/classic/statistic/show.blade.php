{{--@extends('product.layout.tabs')--}}

@extends(request()->view_as == 'json' && request()->target == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.store.layout.tabs')

@section('title', $page ?? 'Статистика')

@section('content')
    @php $class = 'statisticshow' @endphp

    <div class="bottom-container d-flex">
        <div class="statistic-preloader"></div>
        <div class="flex-1">
            <div class="d-flex">

                <form id="form">

                @if(isset(request()->manager_id))
                    <input type="hidden" name="manager_id" value="{{ request()->manager_id }}" />
                @endif
                @if(isset(request()->manager_id))
                    <input type="hidden" name="partner_id" value="{{ request()->partner_id }}" />
                @endif
                @if(isset(request()->manager_id))
                    <input type="hidden" name="dds_id" value="{{ request()->dds_id }}" />
                @endif
                <input type="hidden" name="begin_date" value="{{ request()->begin_date }}" />
                <input type="hidden" name="final_date" value="{{ request()->final_date }}" />

                @if(isset(request()->entities))
                    @foreach(request()->entities as $entity)
                        <input type="hidden" name="entities[]" value="{{ $entity }}" />
                    @endforeach
                @endif

                </form>

                <div class="box mr-16 pt-16 ml-16" style="width: 50%; height: calc(100vh - 80px)!important; flex: 1.5!important;">
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
