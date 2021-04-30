
<div class="breadcrumb">
    @foreach($result->breadcrumbs as $breadcrumb)
        <a href="{{ $breadcrumb->url }}">{{ $breadcrumb->name }}</a>
    @endforeach
</div>
<div>
    <h1>Модификации {{ $result->model->name }}</h1>
</div>

<div class="modifs">
    <form method="get" id="acMitFiltersForm" style="margin: 8px 0 16px">
        @foreach($result->filters as $f)
        <select name="{{ $f->name->key }}" onchange="document.getElementById('acMitFiltersForm').submit()">
            <option value="" {{ property_exists($f, 'currentValue') && !$f->currentValue ? 'selected' : '' }}>{{ $f->name->text }}</option>
            @foreach($f->values as $v)
            <option {{ property_exists($f, 'currentValue') && $f->currentValue === $v->id ? 'selected' : '' }} value="{{ $v->id }}">
                {{ $v->text }}
            </option>
            @endforeach
        </select>
        @endforeach
        <span style="float: right">Всего результатов: {{ $result->itemsCount }}, показано: {{ count($result->modifications) }}</span>
    </form>
    <table>
        <thead>
            <tr class="table-row bottom-line">
                <td class="table-cell">Название</td>
                <td class="table-cell">Год</td>
                <td class="table-cell">Двигатель</td>
                <td class="table-cell">Трансмиссия</td>
                <td class="table-cell">Регион</td>
                <td class="table-cell">Описание</td>
            </tr>
        </thead>
        <tbody>
        @foreach($result->modifications as $modify)
            <tr class="table-row bottom-line active">
                <td class="table-cell"><a href="/{{ $result->breadcrumbs[3]->url }}/{{ $modify->id }}">{{ $modify->name }}</a><br><span>{{ $modify->steering }}</span></td>
                <td class="table-cell">{{ $modify->year }}</td>
                <td class="table-cell">{{ $modify->engine }}</td>
                <td class="table-cell">{{ $modify->transmission->name }}</td>
                <td class="table-cell">{{ $modify->region }}</td>
                <td class="table-cell">{{ $modify->description }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>

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
