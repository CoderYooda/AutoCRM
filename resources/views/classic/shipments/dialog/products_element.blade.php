@foreach($shipment->articles as $product)
    @include(env('DEFAULT_THEME', 'classic') . '.shipments.dialog.product_element')
@endforeach
