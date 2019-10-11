<tr ondblclick="openDialog('provider_orderDialog', '&provider_order_id={{ $provider_order->id }}')" class="list-item" id="providerorder_{{ $provider_order->id }}">
    <td>{{ $provider_order->id }}</td>
    <td>{{ \Carbon\Carbon::parse($provider_order->created_at)->format('d.m.Y') }}</td>

    <td>{{ $provider_order->partner()->first()->outputName() }}</td>
    {{--<td>{{ $shipment->ddsarticle()->first()->name }}</td>--}}
    {{--<td align="right">{{ $shipment->cashbox()->first()->name }}</td>--}}
    <td>
        <span class="text-sm text-primary">{{ $provider_order->summ }}</span>
    </td>
    <td>
        <span class="text-sm">
            {{ $provider_order->discount }}@if($provider_order->inpercents) % @else р @endif
        </span>
    </td>
    <td>
        <span class="text-sm text-success">{{ $provider_order->itogo }} р</span>
    </td>

    <td style="position: relative;">
        <div class="item-action">
        </div>
        <div class="item-action-hovered">
            <a onclick="openDialog('providerorderDialog', '&provider_order_id={{ $provider_order->id }}')" class="pr-2" >
                <i class="fa fa-pencil"></i>
            </a>
            <a onclick="entity.remove('providerorder', {{ $provider_order->id }})">
                <i class="fa fa-remove"></i>
            </a>
        </div>
    </td>
</tr>
