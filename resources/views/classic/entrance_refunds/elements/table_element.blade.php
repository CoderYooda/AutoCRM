
<tr>
    <td title="{{ $entrance_refund->id }}">
        <div class="compressed article">{{ $entrance_refund->id }}</div>
    </td>
    <td>{{ $entrance_refund->normalizedData() }}</td>
    <td>{{ $entrance_refund->partner->outputName() }}</td>
    <td>{{ $entrance_refund->manager->outputName() }}</td>
    <td>{{ $entrance_refund->totalPrice }}</td>
    <td>{{ $entrance_refund->comment }}</td>
    <td style="text-align: center;">@if($entrance_refund->locked)<i class="fa fa-lock text-muted"></i>@endif</td>
    <td style="width: 20px; text-align: center;">
        <a onclick="openDialog('entranceDialog', '&entrance_id={{ $entrance->id }}')" class="btn btn-sm badge white text-muted"><i class="fa fa-eye"></i></a>
    </td>
</tr>
