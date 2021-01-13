
<div class="row">
    @foreach($stores as $store)
        @include('settings.elements.store_elem')
    @endforeach
</div>

{{--{{ $articles->setPath(route('StoreIndex'))->appends(request()->only(['active_tab', 'page', 'search', 'category_id']))->links() }}--}}
