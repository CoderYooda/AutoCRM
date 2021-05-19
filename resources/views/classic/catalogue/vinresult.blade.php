@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.metaXHR' : 'classic.catalogue.index')

@section('meta')
    @include(get_template() . '.catalogue.search')
    <div style="overflow: auto" class="box-lister catalogue">
        <div id="ajax-table-store" class="">
            @if(isset($result) && isset($result->vins))
                <h1 class="mt-0">{{ $result->vins[0]->title }}</h1>
                <ol class="vin-ol">
                    @foreach($result->vins[0]->parameters as $param)
                        <li>{{ $param->name }} | {{ $param->value }}</li>
                    @endforeach
                </ol>
                <a href="{{ route('CatalogueGroups', [
                    'type' => $result->vins[0]->type,
                    'mark' => $result->vins[0]->mark,
                    'model' => $result->vins[0]->model,
                    'modification' => $result->vins[0]->modification,
                    ]) }}" class="button primary">Показать каталог</a>
            @else
                Результатов по запросу "{{ request('text') }}" не найдено
            @endif
        </div>
    </div>
@endsection
