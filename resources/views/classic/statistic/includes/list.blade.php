@forelse($list as $entity => $dates)

    @continue(!in_array($entity, $request->entities))

    @foreach($dates as $date => $entity_ids)

        @if($loop->first)

            <h2 class="mt-0 stat_header p-15">{{ $entity }}</h2>

            @if(is_array($entity_ids))

                <ul class="nav w-100 mb-0 mt-0">
                    <li class="item d-flex bold_title w-100">
                        <div class="flex-1 stat_id">ID</div>
                        {{--<div class="flex-1 stat_name">Партнёр</div>--}}
                        <div class="flex-1 stat_name">Менеджер</div>
                        <div class="flex-1 stat_summ">Сумма</div>
                        <div class="flex-1 stat_date">Дата</div>
                    </li>
                </ul>

            @else

                <ul class="nav w-100 mb-0 mt-0">
                    <li class="item d-flex bold_title w-100">
                        <div class="flex-1 stat_summ">{{ $entity == 'ROI' ? 'Процент' : 'Сумма' }}</div>
                        <div class="flex-1 stat_date">Дата</div>
                    </li>
                </ul>

            @endif

        @endif

        @if(!is_array($entity_ids))

            @continue($entity_ids == 0 || $date == 'total')

            <ul class="nav w-100 mb-0 mt-0">
                <li class="item d-flex w-100">
                    {{--<div class="flex-1 stat_name">{{ $attributes['partner'] }}</div>--}}
                    <div class="flex-1 stat_summ">{{ number_format($entity_ids, 2, ',', ' ')  }}</div>
                    <div class="flex-1 stat_date">{{ $date }}</div>
                </li>
            </ul>

        @else

            @foreach($entity_ids as $entity_id => $attributes)

                @break($loop->index == 10)

                <ul class="nav w-100 mb-0 mt-0">
                    <li onclick="window.openDialog('{{ $attributes['dialog_name'] }}Dialog', '&{{ $attributes['dialog_field'] . '=' . $entity_id }}')" class="item d-flex w-100 pointer">
                        <div class="flex-1 stat_id">{{ $entity_id }}</div>
                        {{--<div class="flex-1 stat_name">{{ $attributes['partner'] }}</div>--}}
                        <div class="flex-1 stat_name">{{ $attributes['manager'] }}</div>
                        <div class="flex-1 stat_summ">{{ number_format($attributes['amount'], 2, ',', ' ')  }}</div>
                        <div class="flex-1 stat_date">{{ $date }}</div>
                    </li>
                </ul>

            @endforeach

        @endif

    @endforeach
@empty
    <div class="padding text-center">
        <div>
            <div class="out_of_search"></div>
            <div class="mb-15">
                Нет данных за указанный период
            </div>
        </div>
    </div>
@endforelse