<div class="">
    <div class="nlborder list-group box mb-0">
    @foreach($suppliers as $supplier)
        <span class="d-flex">
            <a onclick="try{window.{{$request['refer']}}.selectSupplier({{ $supplier->id }})}catch (e) {}" class="folder-link list-group-item w-100" ><i class="fa fa-cogs"></i> {{ $supplier->name }}</a>
        </span>
    @endforeach
    </div>
</div>
