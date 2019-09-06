@php $class = 'selectPartner' @endphp
<div id="selectPartner" class="dialog" style="width:580px;">
    <div class="titlebar">Выбор контрагента</div>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia();">×</button>
    <div class="navbar white no-radius box-shadow pos-rlt">
        <form class="flex">
            @if($request['refer'])
                <input id="refer" type="hidden" name="refer" value="{{ $request['refer'] }}">
            @endif
            <div class="input-group">
                <input id="partner_search" type="text" class="form-control form-control-sm search" placeholder="Поиск контрагентов" required="">
                <span class="input-group-append">
                    <button onclick="openDialog('addPartner')" class="btn btn-default btn-sm no-shadow" type="button"><i class="fa fa-plus"></i></button>
                </span>
            </div>
        </form>
    </div>
    <div id="partner_list" class="mh50-dialog">
        <div class="">
            <div id="search_partner_results" class="nlborder list-group box mb-0">
                @include('partner.dialog.select_partner_inner')
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn success" onclick="{{ $class }}.finitaLaComedia(this)">Закрыть</button>
    </div>
    <div class="system_message">

    </div>
</div>
