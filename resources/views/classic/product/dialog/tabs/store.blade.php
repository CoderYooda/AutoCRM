<div class="tab-pane" id="{{$class}}_tab_store">
    <table class="table w-100">
        <thead>
        <tr>
            <th>Склад</th>
            <th>Количество</th>
        </tr>
        </thead>
        <tbody>
        @foreach($stores as $store)
            <tr>
                <td>
                    {{ $store->name }}
                </td>
                <td>
                    @if(isset($product  )){{ $store->getArticlesCountById($product->id) }}@else 0 @endif
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
