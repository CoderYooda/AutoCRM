<div class="list-group list-modify mb-0 box">
    @if(isset($categories['parent']))
    <div class="modal-header">
        <h5 class="modal-title">
                @if(!$categories['parent']->locked)
                    <a href="{{ route('StoreIndex', ['category_id' => $categories['parent']->category_id]) }}" class="ajax-nav"><i class="fa fa-caret-square-o-left"></i></a>
                @endif
                {{ $categories['parent']->name }}
        </h5>
        <a style="font-size: 18px;" onclick="openDialog('createCategory', '&category_select={{ $categories['parent']->id }}')" class="">
            <i class="fa fa-plus"></i>
        </a>
    </div>
    @endif
    @if($request['search'] != null)
            <div class="modal-header">
                <h5 class="modal-title">Поиск по складу по "{{ $request['search'] }}"</h5>
            </div>
        @endif

    @foreach($categories['stack'] as $category)
        @include('product.elements.table_folder')
    @endforeach
</div>
<table class="table table-bordered table-hover table-sm mb-3" style="white-space: nowrap;">
    <thead>
    <tr>
        <th class="w-xxl">Модель</th>
        <th class="w-sm">Артикул</th>
        <th>Бренд</th>
        <th>Наличие</th>
        <th>Заявки</th>
        <th>Цена</th>
        <th class="w-62">
            @if(isset($categories['parent']))
            <a onclick="openDialog('createProduct', '&category_select={{ $categories['parent']->id }}' )" class="btn btn-sm badge success text-white w-100"><i class="fa fa-plus"></i></a>
            @endif
        </th>
    </tr>
    </thead>
    <tbody>
    @foreach($articles as $article)
        @include('product.elements.table_element')
    @endforeach
    </tbody>
</table>
{{ $articles->setPath(route('StoreIndex'))->appends(request()->only(['active_tab', 'page', 'search', 'category_id']))->links() }}
