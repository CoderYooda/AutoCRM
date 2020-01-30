<ul class="nav select-list-modal categories_list m-0">
    @foreach($suppliers as $supplier)
        <li onclick="try{window.{{$request['refer']}}.selectSupplier({{ $supplier->id }})}catch (e) {}" id="supplier_{{ $supplier->id }}" class="pointer d-flex " >
            <div class="list-title">
                {{ $supplier->name }}
            </div>
        </li>
    @endforeach
</ul>
