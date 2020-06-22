{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' ? env('DEFAULT_THEME', 'classic') . '.layouts.XHR' : 'classic.layouts.main')

@section('title', $page ?? 'Результат статистики')

@section('content')
    @php $class = 'statisticshow' @endphp

    <div class="bottom-container d-flex">
        <div class="statistic-preloader"></div>

        <div class="flex-1">

            <div class="d-flex ml-15 mt-15">
                <div onclick="goto('{{ asset('/statistic') }}')" class="box pointer" style="padding: 5px 10px 5px 10px; min-height: 32px;">
                    <i class="fa fa-chevron-left mr-15" aria-hidden="true"></i>
                    Вернуться назад
                </div>

                <form class="d-flex" id="form">

                    @if(isset($filter_params['manager']))
                        <div class="box d-flex ml-15" style="padding: 7px 10px; min-height: 32px; vertical-align: center;">
                            <div class="filter-result-title">Менеджер</div>
                            <div class="filter-result-desc ml-5">{{ $filter_params['manager']->fio }}</div>
                        </div>

                        <input type="hidden" name="manager_id" value="{{ $request->manager_id }}" />
                    @endif

                    @if(isset($filter_params['partner']))
                        <div class="box d-flex ml-15" style="padding: 7px 10px; min-height: 32px; vertical-align: center;">
                            <div class="filter-result-title">Партнёр</div>
                            <div class="filter-result-desc ml-5">{{ $filter_params['partner']->fio }}</div>
                        </div>

                        <input type="hidden" name="partner_id" value="{{ $request->partner_id }}" />
                    @endif

                    @if(isset($filter_params['ddsarticle']))
                        <div class="box d-flex ml-15" style="padding: 7px 10px; min-height: 32px; vertical-align: center;">
                            <div class="filter-result-title">Статья ДДС</div>
                            <div class="filter-result-desc ml-5">{{ $filter_params['ddsarticle']->name }}</div>
                        </div>

                        <input type="hidden" name="dds_id" value="{{ $request->dds_id }}" />
                    @endif

                    @if(isset($request->entities))
                        @foreach($request->entities as $entity)
                            <input type="hidden" name="entities[]" value="{{ $entity }}" />
                        @endforeach
                    @endif

                </form>

            </div>

            <div class="d-flex">

                <div class="box mr-16 pt-16 ml-16" style="width: 50%; height: calc(100vh - 130px)!important; flex: 1.5!important;">
                    <canvas id="statistic-chart"></canvas>
                </div>

                <div class="flex-1 box pt-16 pl-16 mr-16" style="max-width: 388px;">
                    <div data-simplebar style="max-height: calc(100vh - 130px);">
                        <div id="statistic-list" style="position: relative">
                            {!! $list !!}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
