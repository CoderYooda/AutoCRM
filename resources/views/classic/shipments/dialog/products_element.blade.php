@foreach($shipment->products as $product)
    @include(get_template() . '.shipments.dialog.product_element')
@endforeach
