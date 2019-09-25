<tr class="list-item" id="shipment_{{ $shipment->id }}">
    <td>{{ $shipment->id }}</td>
    <td>{{ \Carbon\Carbon::parse($shipment->do_date)->format('d.m.Y') }}</td>

    <td class="text-primary">
        Продажа
    </td>
    <td>{{ $shipment->partner()->first()->outputName() }}</td>
    {{--<td>{{ $shipment->ddsarticle()->first()->name }}</td>--}}
    {{--<td align="right">{{ $shipment->cashbox()->first()->name }}</td>--}}

    <td>
        <span class="text-sm text-primary">-{{ $shipment->summ }} <i class="fa fa-caret-down"></i></span>
    </td>

    <td style="position: relative;">
        <div class="item-action">
        </div>
        <div class="item-action-hovered">
            <a onclick="openDialog('shipmentDialog', '&shipment_id={{ $shipment->id }}')" class="pr-2" >
                <i class="fa fa-pencil"></i>
            </a>
            <a onclick="entity.remove('shipment', {{ $shipment->id }})">
                <i class="fa fa-remove"></i>
            </a>
        </div>
    </td>
</tr>
