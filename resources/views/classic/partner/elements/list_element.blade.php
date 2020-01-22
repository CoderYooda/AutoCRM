<div id="partner_{{ $partner->id }}" class="list-item">
    <span class="w-40 avatar circle blue-grey">
{{--        <i class="on b-white avatar-right"></i>--}}
          {{ $partner->firstLetterOfName() }}
    </span>
    <div class="list-body b-r mw-280-e" >
        <a onclick="openDialog('partnerDialog', '&partner_id={{ $partner->id }}&page={{ $partners->currentPage() }}&search={{ $request["search"] }}')" class="item-title _500">{{ $partner->outputName() }}</a>
        <div class="item-except text-sm text-muted h-1x">
            {{ $partner->firstActivePhoneNumber() }}
        </div>
    </div>
    <div class="list-body">
        Тип: {{ $partner->isflText() }}
        <div class="item-except text-sm text-muted h-1x">
            Дисконт: в разработке
        </div>
    </div>
    <div>
        <div class="item-action">
            {{ $partner->created_at }}
        </div>
        <div class="item-action-hovered">
            <div class="float-right">
                <button onclick="openDialog('partnerDialog', '&partner_id={{ $partner->id }}&page={{ $partners->currentPage() }}&search={{ $request["search"] }}')" class="btn btn-icon white mr-2">
                    <i class="fa fa-pencil"></i>
                </button>
                <button onclick="entity.remove('partner', {{ $partner->id }})" class="btn btn-icon white float-right">
                    <i class="fa fa-remove"></i>
                </button>
            </div>
{{--                    <a onclick="openDialog('partnerDialog', '&partner_id={{ $partner->id }}')" class="text-muted pr-2"><i class="fa fa-pencil"></i></a>--}}
{{--                    <a onclick="entity.remove('partner', {{ $partner->id }})" class="text-muted"><i class="fa fa-remove"></i></a>--}}
        </div>
    </div>
</div>