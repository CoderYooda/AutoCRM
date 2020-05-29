<ul class="nav select-list-modal">
    @foreach($vehicles as $vehicle)
        <li id="garage_item_{{ $vehicle->id }}" onclick="" class="pointer d-flex ">
            <div class="ring-ico">
                <span class="first_letter">{{ ucfirst($vehicle->mark->name) }}</span>
            </div>
            <div class="list-title">
                {{ $vehicle->mark->name }}
                <div class="secondary">{{ $vehicle->model->name }}</div>
            </div>
        </li>
    @endforeach
</ul>
