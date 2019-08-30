<div id="selectPartner" class="dialog" style="width:580px;">
    <div class="titlebar">Выбор контрагента</div>
    <button class="btn_close" onclick="closeDialog(event)">×</button>
    <div class="navbar white no-radius box-shadow pos-rlt">
        <form class="flex">
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
</div>
