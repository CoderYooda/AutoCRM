<div class="nlborder list-group box mb-0">
    @foreach($suppliers as $supplier)
        <span class="d-flex">
            <a class="folder-link list-group-item w-100" onclick="try{window.{{$request['refer']}}.selectSupplier({{ $supplier->id }})}catch (e) {}"><i class="fa fa-folder"></i> {{ $supplier->name }}</a>
        </span>
    @endforeach
</div>
