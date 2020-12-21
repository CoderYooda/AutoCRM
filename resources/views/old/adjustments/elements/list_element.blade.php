<tr ondblclick="openDialog('adjustmentDialog', '&adjustment_id={{ $adjustment->id }}')" class="list-item" id="adjustment_{{ $adjustment->id }}">
    <td>{{ $adjustment->id }}</td>
    <td>{{ \Carbon\Carbon::parse($adjustment->created_at)->format('d.m.Y') }}</td>

    <td>{{ $adjustment->partner()->first()->outputName() }}</td>
    <td>{{ $adjustment->store()->first()->name }}</td>
    <td>{{ $adjustment->comment }}</td>
    {{--<td>{{ $shipment->ddsarticle()->first()->name }}</td>--}}
    {{--<td align="right">{{ $shipment->cashbox()->first()->name }}</td>--}}
    {{--<td>--}}
        {{--<span class="text-sm text-primary">{{ $shipment->summ }}</span>--}}
    {{--</td>--}}
    {{--<td>--}}
        {{--<span class="text-sm">--}}
            {{--{{ $shipment->discount }}@if($shipment->inpercents) % @else р @endif--}}
        {{--</span>--}}
    {{--</td>--}}
    {{--<td>--}}
        {{--<span class="text-sm text-success">{{ $shipment->itogo }} р</span>--}}
    {{--</td>--}}

    <td style="position: relative;">
        <div class="item-action">
        </div>
        <div class="item-action-hovered">
            <a onclick="openDialog('adjustmentDialog', '&adjustment_id={{ $adjustment->id }}')" class="pr-2" >
                <i class="fa fa-pencil"></i>
            </a>
            <a onclick="entity.remove('adjustment', {{ $adjustment->id }})">
                <i class="fa fa-remove"></i>
            </a>
        </div>
    </td>
</tr>
