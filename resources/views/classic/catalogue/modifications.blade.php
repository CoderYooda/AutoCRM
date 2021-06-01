@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.metaXHR' : 'classic.catalogue.index')

@section('meta')
    @include(get_template() . '.catalogue.search')
    <div style="overflow: auto" class="box-lister catalogue">
        <div id="ajax-table-store" class="">

            @if( isset($result->breadcrumbs))
                @include(get_template() . '.catalogue.breadcrumbs', ['breadcrumbs' => $result->breadcrumbs])
            @endif
            <div class="p-25 pt-0">
                <div>
                    <h1>Модификации {{ $result->model->name ?? 'RR' }}</h1>
                </div>

                <div class="box modifs">
                    @if(isset($result->filters))
                        <form method="get" id="acMitFiltersForm" class="pbox" style="margin: 8px 0 0px">
                            @foreach($result->filters as $f)
                                <select name="{{ $f->name->key }}">
                                    <option value="" {{ property_exists($f, 'currentValue') && !$f->currentValue ? 'selected' : '' }}>{{ $f->name->text }}</option>
                                    @foreach($f->values as $v)
                                        <option {{ property_exists($f, 'currentValue') && $f->currentValue === $v->id ? 'selected' : '' }} value="{{ $v->id }}">
                                            {{ $v->text }}
                                        </option>
                                    @endforeach
                                </select>
                            @endforeach
                            <button type="submit">найти</button>
                            <span style="float: right">Всего результатов: {{ $result->itemsCount }}, показано: {{ count($result->modifications) }}</span>
                        </form>
                    @endif
                    <table class="cattable" style="width: 100%;">
                        <tr class="table-row bottom-line">
                            <th class="table-cell">Название</th>
                            <th class="table-cell">Год</th>
                            <th class="table-cell">Двигатель</th>
                            <th class="table-cell">Трансмиссия</th>
                            <th class="table-cell">Регион</th>
                            <th class="table-cell">Описание</th>
                        </tr>

                        @foreach($result->modifications as $modify)
                            <tr class="table-row bottom-line">
                                <td class="table-cell">
                                    <a class="ajax-nav" href="{{ './' . $result->breadcrumbs[3]->url . '/' . ($modify->id ?? $modify->short_name) . '?active_tab=catalogue'}}">{{ $modify->name ?? $modify->short_name ?? $modify->full_name }}</a>
                                    <br><span>{{ $modify->steering ?? $modify->full_name ?? 'Не указано' }}</span></td>
                                <td class="table-cell">{{ $modify->year ?? 'Не указано' }}</td>
                                <td class="table-cell">{{ $modify->engine ?? 'Не указано' }}</td>
                                <td class="table-cell">{{ $modify->transmission->name ?? 'Не указано' }}</td>
                                <td class="table-cell">{{ $modify->region ?? 'Не указано' }}</td>
                                <td class="table-cell">{{ $modify->description ?? 'Не указано' }}</td>
                            </tr>
                        @endforeach
                    </table>
                </div>
            </div>

        </div>
    </div>
@endsection
{{--<button onclick="store.model.getModels({{ $model->mark()->first()->id }})">Назад</button>--}}
{{--<div id="cat_box" class="">--}}
    {{--@foreach($modifications as $modification)--}}
        {{--<div class="box modification_item">--}}
            {{--<div class="text">{{ $modification->name }}</div>--}}
            {{--<div class="text">{{ $modification->region }}</div>--}}
            {{--<div class="text">{{ $modification->year }}</div>--}}
            {{--<div class="text">{{ $modification->description }}</div>--}}
        {{--</div>--}}
    {{--@endforeach--}}
    {{--{{ $modifications->links() }}--}}
{{--</div>--}}
