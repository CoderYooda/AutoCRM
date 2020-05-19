@foreach($global_data as $date => $value)

    @if(is_array($value))

        @if(array_sum($value))
        <h2 class="mt-0 stat_header p-15">Заявки поставщикам</h2>
        @endif

        @foreach($value as $entity => $amount)

        @continue($amount == 0)

        <ul class="nav">
            <li class="item d-flex bold_title">
                <div class="flex-1 stat_id">ID</div>
                <div class="flex-1 stat_name">{{ $entity }}</div>
                <div class="flex-1 stat_summ">{{ $amount }}</div>
                <div class="flex-1 stat_date">{{ $date }}</div>
            </li>
        </ul>
        @endforeach

    @endif
@endforeach