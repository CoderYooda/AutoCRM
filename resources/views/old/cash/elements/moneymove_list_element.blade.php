<tr ondblclick="openDialog('moneymoveDialog', '&moneymove_id={{ $moneymove->id }}')" class="list-item" id="moneymove_{{ $moneymove->id }}">
    <td>{{ $moneymove->id }}</td>
    <td>{{ \Carbon\Carbon::parse($moneymove->do_date)->format('d.m.Y') }}</td>

    <td>{{ $moneymove->in_cashbox()->first()->name }}</td>
    <td>{{ $moneymove->out_cashbox()->first()->name }}</td>
    <td>{{ $moneymove->summ }}</td>
{{--    <td align="right">{{ $warrant->cashbox()->first()->name }}</td>--}}
{{--    @if($warrant->isIncoming)--}}
{{--        <td>--}}
{{--            <span class="text-sm text-success">+{{ $warrant->summ }} <i class="fa fa-caret-up"></i></span>--}}
{{--        </td>--}}
{{--    @else--}}
{{--        <td>--}}
{{--            <span class="text-sm text-primary">-{{ $warrant->summ }} <i class="fa fa-caret-down"></i></span>--}}
{{--        </td>--}}
{{--    @endif--}}
    <td style="position: relative;">
        <div class="item-action">
{{--            <a href="#" class="active">--}}
{{--                <i class="fa fa-pencil text-success"></i>--}}
{{--            </a>--}}
{{--            <a href="#" class="active">--}}
{{--                <i class="fa fa-remove text-success"></i>--}}
{{--            </a>--}}
        </div>
        <div class="item-action-hovered">
            <a onclick="openDialog('moneymoveDialog', '&moneymove_id={{ $moneymove->id }}')" class="pr-2" >
                <i class="fa fa-pencil"></i>
            </a>
            <a onclick="entity.remove('moneymove', {{ $moneymove->id }})">
                <i class="fa fa-remove"></i>
            </a>
        </div>
    </td>
</tr>
