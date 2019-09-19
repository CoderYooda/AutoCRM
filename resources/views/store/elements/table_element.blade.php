<tr class="list-item" id="product_{{ $article->id }}">
    <td>
        <div class="compressed article" title="{{ $article->name }}">
            <a onclick="openDialog('productDialog', '&product_id={{ $article->id }}')">
                {{ $article->name }}
            </a>
        </div>
    </td>
    <td>
        <a onclick="openDialog('productDialog', '&product_id={{ $article->id }}')">
            {{ $article->article }}
        </a>
    </td>
    <td>@if($article->supplier()->first()){{ $article->supplier()->first()->name}} @elseНе указано@endif</td>
    <td>{{ $article->stores()->sum('count') }}</td></td>
    <td>0</td>
    <td>1</td>
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
