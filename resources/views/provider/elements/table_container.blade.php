<div class="list-group list-modify mb-0 box">
    <div class="modal-header">
        <h5 class="modal-title">
            Тринити партс
        </h5>
    </div>
</div>
@if(isset($brands) && isset($brands->data))
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
        @foreach($brands->data as $brand)
            @include('provider.elements.table_element')
        @endforeach
        </tbody>
    </table>
@else
    <h5 class="my-4 text-muted">Для поиска запчастей воспользуйтесь поиском</h5>
@endif
