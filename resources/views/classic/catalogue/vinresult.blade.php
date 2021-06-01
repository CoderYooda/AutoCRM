<div style="overflow: auto" class="box-lister catalogue">
    <div id="ajax-table-store" class="">
        @if(isset($result) && isset($result->vins))
            <h1 class="mt-0">{{ $result->vins[0]->title }}</h1>
            <ol class="vin-ol">
                @foreach($result->vins[0]->parameters as $param)
                    <li>
                        <div class="flex-1"><span>{{ $param->name }}</span></div>
                        <div class="flex-1">{{ $param->value }}</div>
                    </li>
                @endforeach
            </ol>
            <a style="margin-top: 20px" href="{{ route('CatalogueGroups', [
                    'type' => $result->vins[0]->type,
                    'mark' => $result->vins[0]->mark,
                    'model' => $result->vins[0]->model,
                    'modification' => $result->vins[0]->modification,
                    ]) }}" class="button primary w-100">Показать каталог</a>
        @else
            Результатов по запросу "{{ request('text') }}" не найдено
        @endif
    </div>
</div>
