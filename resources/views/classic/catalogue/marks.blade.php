@foreach($types as $type)
    <h2>{{ $type->name }}</h2>
    <div class="cat_item_container">
        @if(isset($type->marks))
            @foreach($type->marks as $mark)
                <div onclick="store.model.getModels({{$mark->id}})" class="box cat_item">
                    <img src="{{ $mark->image }}" alt="">
                    {{ $mark->name  }}
                </div>
            @endforeach
        @endif
    </div>
@endforeach
