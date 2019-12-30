<tr ondblclick="openDialog('productDialog', '&product_id={{ $article->id }}')" class="list-item product_list_context" id="product_{{ $article->id }}">
    <td>
        <div class="compressed article" title="{{ $article->name }}">
            {{ $article->name }}
        </div>
    </td>
    <td>
        <a onclick="window.helper.copy('{{ $article->article }}');">
            {{ $article->article }}
        </a>
    </td>
    <td>
        @if($article->supplier()->first())<a onclick="window.helper.copy('{{ $article->supplier()->first()->name }}');">{{ $article->supplier()->first()->name }}</a>@elseНе указано@endif
    </td>

    <td>{{ $article->getCountInStoreId(Auth::user()->partner()->first()->store()->first()->id) }} / {{ $article->getCountInOthersStores(Auth::user()->partner()->first()->store()->first()->id) }}</td></td>
    {{--<td>{{ $article->getReservedCount() }}</td>--}}
    <td>{{ $article->getMidPriceByStoreId(Auth::user()->partner()->first()->store()->first()->id) }}</td>
    <td style="position: relative;">
        <div class="item-action-hovered">
            <a onclick="openDialog('productDialog', '&product_id={{ $article->id }}')" class="pr-2" >
                <i class="fa fa-pencil"></i>
            </a>
            <a onclick="entity.remove('product', {{ $article->id }})">
                <i class="fa fa-remove"></i>
            </a>
        </div>
    </td>
</tr>
