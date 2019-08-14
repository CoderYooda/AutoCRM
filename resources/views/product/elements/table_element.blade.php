<tr id="product_{{ $article->id }}">
    <td>{{ $article->name }}</td>
    <td>{{ $article->article }}</td>
    <td>@if($article->supplier()->first()){{ $article->supplier()->first()->name}} @elseНе указано@endif</td>
    <td>{{ $article->stores()->sum('count') }}</td></td>
    <td>0</td>
    <td>1</td>
    <td>
        <a onclick="openDialog('editProduct={{ $article->id }}')" class="btn btn-sm badge success text-white"><i class="fa fa-eye"></i></a>
        <a onclick="product.remove({{ $article->id }})" class="btn btn-sm badge danger text-white"><i class="fa fa-remove"></i></a>
    </td>
</tr>
