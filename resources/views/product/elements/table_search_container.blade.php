{{--<div class="list-group list-modify mb-0 box">--}}
{{--    <div class="modal-header">--}}
{{--        <h5 class="modal-title">--}}
{{--            Поиск по запросу "{{ $request['search'] }}"--}}
{{--        </h5>--}}
{{--    </div>--}}

{{--    @foreach($categories['stack'] as $category)--}}
{{--        @include('product.elements.table_folder')--}}
{{--    @endforeach--}}
{{--</div>--}}
<table class="table table-bordered table-hover table-sm mb-3" style="white-space: nowrap;">
    <thead>
    <tr>
        <th class="w-xxl">Модель</th>
        <th class="w-sm">Артикул</th>
        <th>Бренд</th>
        <th>Наличие</th>
        <th>Заявки</th>
        <th>Цена</th>
        <th class="w-62"></th>
    </tr>
    </thead>
    <tbody>
    @foreach($articles as $article)
        @include('product.elements.table_element')
    @endforeach
    </tbody>
</table>
{{ $articles->setPath(route('StoreIndex'))->appends(request()->only(['active_tab', 'page', 'search', 'category_id']))->links() }}
