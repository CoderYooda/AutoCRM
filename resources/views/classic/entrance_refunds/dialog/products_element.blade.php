@foreach($products as $product)
    @include(env('DEFAULT_THEME', 'classic') . '.entrance_refunds.dialog.product_element')
@endforeach
