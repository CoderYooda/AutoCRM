@foreach($shipment->articles as $product)
    @include(get_template() . '.shipments.dialog.product_element')
@endforeach
