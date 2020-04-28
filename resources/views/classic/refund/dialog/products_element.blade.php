@foreach($products as $product)
    @include(env('DEFAULT_THEME', 'classic') . '.refund.dialog.product_element')
@endforeach
