
<div class="row">
    @foreach($stores as $store)
        @include(env('DEFAULT_THEME', 'classic') . '.settings.elements.store_elem')
    @endforeach
</div>

{{--{{ $articles->setPath(route('StoreIndex'))->appends(request()->only(['active_tab', 'page', 'search', 'category_id']))->links() }}--}}
