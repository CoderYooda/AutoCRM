
<div class="row">
    @foreach($cashboxes as $cashbox)
        @include('settings.elements.cashbox_elem')
    @endforeach
</div>

{{--{{ $articles->setPath(route('StoreIndex'))->appends(request()->only(['active_tab', 'page', 'search', 'category_id']))->links() }}--}}
