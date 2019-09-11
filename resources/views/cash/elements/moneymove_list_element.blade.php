<tr class="list-item" id="moneymove_{{ $moneymove->id }}">
    <td>{{ $moneymove->id }}</td>
    <td>2</td>

{{--    <td>{{ $warrant->partner()->first()->outputName() }}</td>--}}
{{--    <td>{{ $warrant->ddsarticle()->first()->name }}</td>--}}
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
    <td>
        <div class="item-action">
{{--            <a href="#" class="active">--}}
{{--                <i class="fa fa-pencil text-success"></i>--}}
{{--            </a>--}}
{{--            <a href="#" class="active">--}}
{{--                <i class="fa fa-remove text-success"></i>--}}
{{--            </a>--}}
        </div>
        <div class="item-action-hovered">
{{--            <a onclick="openDialog('warrantDialog', '&warrant_id={{ $warrant->id }}')" class="pr-2" >--}}
{{--                <i class="fa fa-pencil"></i>--}}
{{--            </a>--}}
{{--            <a onclick="entity.remove('warrant', {{ $warrant->id }})">--}}
{{--                <i class="fa fa-remove"></i>--}}
{{--            </a>--}}
        </div>
    </td>
</tr>
