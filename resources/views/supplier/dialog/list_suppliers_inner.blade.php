<div class="modal-header">
    <div class="input-group mb-1 mt-1">
        <input type="text"  name="supplier_search" class="form-control" placeholder="Поиск производителя">
        <div class="input-group-append">
            <button class="btn white" type="button">Создать</button>
        </div>
    </div>
</div>
<div class="">
    <div class="nlborder list-group box mb-0">
    @foreach($suppliers as $supplier)
        <span class="d-flex">
            <a onclick="supplier.pick({{ $supplier->id }}, '{{ $supplier->name }}', event)" class="folder-link list-group-item w-100" ><i class="fa fa-cogs"></i> {{ $supplier->name }}</a>
        </span>
    @endforeach
    </div>
</div>
