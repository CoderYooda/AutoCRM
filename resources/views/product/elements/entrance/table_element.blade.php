
<tr>
    <td title="{{ str_replace("'",'"', htmlspecialchars_decode($brand->ident, ENT_QUOTES)) }}">
        <div class="compressed article">{{ str_replace("'",'"', htmlspecialchars_decode($brand->ident, ENT_QUOTES)) }}</div></td>
    <td>{{ $brand->article }}</td>
    <td class="compressed brand">{{ $brand->producer }}</td>
    <td>
{{--        <a onclick="openDialog('createProduct', '&brand={{ $brand->producer }}&article={{ $brand->article }}&provided_name={{ str_replace("'",'"', htmlspecialchars_decode($brand->ident, ENT_QUOTES)) }}' )" class="btn btn-sm badge danger text-white">Добавить</a>--}}
    </td>
</tr>
