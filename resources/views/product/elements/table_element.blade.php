<tr>
    <td>{{ $article->name }}</td>
    <td>{{ $article->article }}</td>
    <td>@if($article->supplier()->first()){{ $article->supplier()->first()->name}} @elseНе указано@endif</td>
    <td>@mdo</td>
    <td>@mdo</td>
    <td>@mdo</td>
    <td>
        <a class="btn btn-sm badge success text-white"><i class="fa fa-eye"></i></a>
        <a class="btn btn-sm badge danger text-white"><i class="fa fa-remove"></i></a>
    </td>
</tr>
