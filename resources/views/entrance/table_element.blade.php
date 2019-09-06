
<tr>
    <td title="{{ $entrance->id }}">
        <div class="compressed article">{{ $entrance->id }}</div>
    </td>
    <td>{{ $entrance->normalizedData() }}</td>
    <td>{{ $entrance->partner()->first()->outputName() }}</td>
    <td>{{ $entrance->totalPrice }}</td>
    <td>{{ $entrance->comment }}</td>
    <td style="text-align: center;">@if($entrance->locked)<i class="fa fa-lock text-muted"></i>@endif</td>
    <td style="width: 20px; text-align: center;">
        <a onclick="openDialog('editEntrance', '&entrance_id={{ $entrance->id }}')" class="btn btn-sm badge white text-muted"><i class="fa fa-eye"></i></a>
    </td>
</tr>
