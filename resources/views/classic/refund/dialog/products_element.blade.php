@foreach($products as $product)
    @include(get_template() . '.refund.dialog.product_element')
@endforeach
