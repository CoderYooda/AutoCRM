@if($providerorders->count() > 0)
    <div class="" data-simplebar style="max-height: 400px;">
        <div class="box-body">
            <ul  class="nav select-list-modal">
            @foreach($providerorders as $providerorder)
                <li id="providerorder_item_{{ $providerorder->id }}"
                    onclick="{{ $request['refer'] }}.selectProviderOrder({{ $providerorder->id }})" data-id="{{ $providerorder->id }}"
                    onmouseenter="setTimeout(function() {  window.{{ $class }}.providerOrderDescription({{$providerorder}})}, 800)"
                    class="pointer d-flex " >
                    <div class="ring-ico">
                        <i class="fa fa-cubes"></i>
                    </div>
                    <div class="list-title">
                        Заявка № {{ $providerorder->id }}
                        <div class="secondary">{{ $providerorder->partner->official_name ?? 'Не указано' }}</div>
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
            <div class="out_of_search"></div>
            <div class="mb-15">
                Заявок постащикам не найдено
            </div>
        </div>
    </div>
@endif

