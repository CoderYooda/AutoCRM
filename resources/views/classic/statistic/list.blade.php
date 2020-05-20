@foreach($list as $entity => $dates)

    @foreach($dates as $date => $attributes)

        @continue($attributes == [])

        @if($loop->first)

            <h2 class="mt-0 stat_header p-15">{{ $entity }}</h2>

            <ul class="nav">
                <li class="item d-flex bold_title">
                    <div class="flex-1 stat_id">ID</div>
                    <div class="flex-1 stat_name">Партнёр</div>
                    <div class="flex-1 stat_name">Менеджер</div>
                    <div class="flex-1 stat_summ">Сумма</div>
                    <div class="flex-1 stat_date">Дата</div>
                </li>
            </ul>

        @endif

        <ul class="nav">
            <li class="item d-flex">
                <div class="flex-1 stat_id">{{ $attributes['id'] }}</div>
                <div class="flex-1 stat_name">{{ $attributes['partner'] }}</div>
                <div class="flex-1 stat_name">{{ $attributes['manager'] }}</div>
                <div class="flex-1 stat_summ">{{ $attributes['amount'] }}</div>
                <div class="flex-1 stat_date">{{ $date }}</div>
            </li>
        </ul>

    @endforeach

@endforeach