<ul id="statistic-list" class="nav select-list-modal">
    @foreach($global_data as $date => $amount)

        @continue($amount == 0)
            
        <li>{{ $date }}: {{ $amount }}</li>

    @endforeach
</ul>