<tr ondblclick="openDialog('clientorderDialog', '&client_order_id={{ $client_order->id }}')" class="list-item" id="client_order_{{ $client_order->id }}">
    <td>{{ $client_order->id }}</td>
    <td>{{ $client_order->normalizedData() }}</td>

    <td>{{ $client_order->partner()->first()->outputName() }}</td>
{{--    <td>{{ $client_order->ddsarticle()->first()->name }}</td>--}}
{{--    <td align="right">{{ $client_order->cashbox()->first()->name }}</td>--}}
    <td>
        <span class="text-sm text-primary">{{ $client_order->summ }}</span>
    </td>
    <td>
        <span class="text-sm">
            {{ $client_order->discount }} @if($client_order->inpercents) % @else р @endif
        </span>
    </td>
    <td>
        <span class="text-sm text-success">{{ $client_order->itogo }} р</span>
    </td>

    <td style="position: relative;">
        <div class="item-action">
        </div>
        <div class="item-action-hovered">
            <a onclick="openDialog('clientorderDialog', '&client_order_id={{ $client_order->id }}')" class="pr-2" >
                <i class="fa fa-pencil"></i>
            </a>
            <a onclick="entity.remove('client_order', {{ $client_order->id }})">
                <i class="fa fa-remove"></i>
            </a>
        </div>
    </td>
</tr>
