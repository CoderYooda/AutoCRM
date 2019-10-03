<div id="partner_{{ $employee->id }}" class="list-item">
    <span class="w-40 avatar circle blue-grey">
{{--        <i class="on b-white avatar-right"></i>--}}
          {{ $employee->firstLetterOfName() }}
    </span>
    <div class="list-body b-r mw-280-e" >
        <a href="{{ route('UserIndex', ['id' => $employee->id, 'active_tab' => 'profile']) }}" class="ajax-nav item-title _500">{{ $employee->outputName() }}</a>
        <div class="item-except text-sm text-muted h-1x">
            {{ $employee->category()->first()->name }}
        </div>
    </div>
    <div class="list-body">
        Тип: {{ $employee->isflText() }}
        <div class="item-except text-sm text-muted h-1x">
            Дисконт: в разработке
        </div>
    </div>
    <div>
        <div class="item-action">
            {{ $employee->created_at }}
        </div>
        <div class="item-action-hovered">
            <div class="float-right">
                <button onclick="openDialog('partnerDialog', '&partner_id={{ $employee->id }}&page={{ $employees->currentPage() }}&search={{ $request["search"] }}')" class="btn btn-icon white mr-2">
                    <i class="fa fa-pencil"></i>
                </button>
                <button onclick="entity.remove('partner', {{ $employee->id }})" class="btn btn-icon white float-right">
                    <i class="fa fa-remove"></i>
                </button>
            </div>
{{--                    <a onclick="openDialog('partnerDialog', '&partner_id={{ $partner->id }}')" class="text-muted pr-2"><i class="fa fa-pencil"></i></a>--}}
{{--                    <a onclick="entity.remove('partner', {{ $partner->id }})" class="text-muted"><i class="fa fa-remove"></i></a>--}}
        </div>
    </div>
</div>