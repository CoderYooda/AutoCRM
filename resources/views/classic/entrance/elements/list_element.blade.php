<tr ondblclick="openDialog('entranceDialog', '&entrance_id={{ $entrance->id }}')" class="list-item" id="entrance_{{ $entrance->id }}">
    <td title="{{ $entrance->id }}">
        <div class="compressed article">{{ $entrance->id }}</div>
    </td>
    <td>№ {{ $entrance->providerorder()->first()->id }}</td>
    <td>{{ $entrance->normalizedData() }}</td>
    <td>{{ $entrance->providerorder()->first()->partner()->first()->outputName() }}</td>
    <td>{{ $entrance->partner()->first()->outputName() }}</td>
    <td>{{ $entrance->comment }}</td>
    {{--<td style="text-align: center;">@if($entrance->locked)<i class="fa fa-lock text-muted"></i>@endif</td>--}}

    <td style="position: relative;">
        <div class="item-action">
        </div>
        <div class="item-action-hovered">
            <a onclick="openDialog('entranceDialog', '&entrance_id={{ $entrance->id }}')" class="pr-2">
                <i class="fa fa-pencil"></i>
            </a>
            <a onclick="entity.remove('entrance', {{ $entrance->id }})">
                <i class="fa fa-remove"></i>
            </a>
        </div>
    </td>
</tr>
