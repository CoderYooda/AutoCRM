<div class="list-group list-modify mb-0 box">
    <div class="modal-header">
        <h5 class="modal-title">
            Тринити партс
        </h5>
    </div>
</div>
<table class="table table-bordered table-hover table-sm mb-3" style="white-space: nowrap;">
    <thead>
    <tr>
        <th class="w-xxl">Наименование</th>
        <th class="w-sm">Артикул</th>
        <th class="w-sm">Производитель</th>
        <th class="w-62">
        </th>
    </tr>
    </thead>
    <tbody>
    @if(isset($brands) && isset($brands->data))
        @foreach($brands->data as $brand)
            @include('product.elements.provider.table_element')
        @endforeach
    @endif
    </tbody>
</table>
