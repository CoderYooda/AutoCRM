@foreach($members as $member)
    <li id="providerorder_item_1" onclick="window.actions.pickPartner({{ $member->id }})" class="pointer d-flex margin-sides2">
        <div class="list-title alone full-width">
            {{ $member->partner->outputName() }}
            <div class="secondary">Категория: {{ $member->partner()->first()->category()->first()->name }}</div>
        </div>
    </li>
@endforeach
