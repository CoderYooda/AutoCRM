<div class="list-group list-modify b-b mb-0 box">
    {{--    @if(isset($request) && $request['search'] != null)--}}
    {{--            <div class="modal-header">--}}
    {{--                <h5 class="modal-title">Поиск по складу по "{{ $request['search'] }}"</h5>--}}
    {{--            </div>--}}
    {{--        @endif--}}
    <div id="dds_categories">
        @include('category.list')
    </div>
</div>
<div class="row">
    @foreach($Ddsarticles as $Ddsarticle)
        @include('settings.elements.ddsarticle_elem')
    @endforeach
</div>

{{--{{ $articles->setPath(route('StoreIndex'))->appends(request()->only(['active_tab', 'page', 'search', 'category_id']))->links() }}--}}
