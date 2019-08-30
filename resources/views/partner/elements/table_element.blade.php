<tr id="partner_{{ $partner->id }}">
    <td><div class="compressed partner" title="{{ $partner->fio }}">{{ $partner->fio }}</div></td>
    <td>{{ $partner->date }}</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>
        <a onclick="openDialog('editPartner', '&partner_id={{ $partner->id }}')" class="btn btn-sm badge success text-white"><i class="fa fa-eye"></i></a>
        <a onclick="entity.remove('partner', {{ $partner->id }})" class="btn btn-sm badge danger text-white"><i class="fa fa-remove"></i></a>
    </td>
</tr>
