<tr ondblclick="openDialog('provider_orderDialog', '&provider_order_id={{ $provider_order->id }}')" class="list-item" id="provider_order_{{ $provider_order->id }}">
    <td>{{ $provider_order->id }}</td>
    <td>{{ \Carbon\Carbon::parse($provider_order->created_at)->format('d.m.Y') }}</td>

    {{--<td>{{ $shipment->partner()->first()->outputName() }}</td>--}}
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
            <a onclick="openDialog('provider_orderDialog', '&provider_order_id={{ $provider_order->id }}')" class="pr-2" >
                <i class="fa fa-pencil"></i>
            </a>
            <a onclick="entity.remove('provider_order', {{ $provider_order->id }})">
                <i class="fa fa-remove"></i>
            </a>
        </div>
    </td>
</tr>
