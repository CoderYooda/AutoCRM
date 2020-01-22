@if($providerorders->count() > 0)
    <div class="" data-simplebar style="max-height: 400px;">
        <div class="box-body">
            <ul  class="nav select-list-modal">
            @foreach($providerorders as $providerorder)
                <li id="providerorder_item_{{ $providerorder->id }}" onclick="{{ $class }}.pickProviderOrder({{ $providerorder->id }})" data-id="{{ $providerorder->id }}" class="pointer d-flex " >
                    <div class="ring-ico">
                        <i class="fa fa-cubes"></i>
                    </div>
                    <div class="list-title">
                        Заявка № {{ $providerorder->id }}
                        <div class="secondary">{{ $providerorder->partner()->first()->outputName() }}</div>
                    </div>
                    <div class="list-body">
                        <div class="date">{{ $providerorder->normalizedData() }}</div>
                        <div class="secondary">Сумма заявки: {{ $providerorder->summ }}</div>
                    </div>
                </li>
            @endforeach
            </ul>
        </div>
    </div>
@else
    <div class="padding text-center">
        <div>
            Заявок постащикам не найдено, <a href="#" class="text-success" onclick="openDialog('providerorderDialog')">создайте</a> первую
        </div>
    </div>
@endif
