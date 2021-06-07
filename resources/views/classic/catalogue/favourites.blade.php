@if(isset($favorites) && $favorites->count())
    @foreach($favorites as $fav)
        <a href="{{ $fav->link }}">
            <div class="box cat_item">
                <div class="bookmark" onclick="window.storecatalogs.addFavour()"></div>
                <span>
                                <img src="{{ $fav->img_link }}" alt="">
                                {{ $fav->name }}
                            </span>
            </div>
        </a>
    @endforeach
@endif
