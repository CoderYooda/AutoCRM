<div>
    <span style="color:#212121; text-transform: uppercase" >{{ $product->getStorageZone(auth()->user()->current_store) }} </span>
    <span style="color:#4298bb; text-transform: uppercase" >{{ $product->getStorageRack(auth()->user()->current_store) }} </span>
    <span style="color:#d32b2a; text-transform: uppercase" >{{ $product->getStorageVert(auth()->user()->current_store) }} </span>
    <span style="color:#278a51; text-transform: uppercase" >{{ $product->getStorageHor(auth()->user()->current_store)  }} </span>
</div>
