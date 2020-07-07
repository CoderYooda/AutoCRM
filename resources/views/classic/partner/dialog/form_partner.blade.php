<div id="{{ $class }}" class="dialog" style="width:640px;">

    <div class="titlebar">{{ $partner ? $partner->outputName() : 'Создание нового контакта' }}</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>
    <form id="act_form_partner" action="{{ route('StorePartner') }}" method="POST">

        @csrf
{{--        <input class="category_select" type="hidden" name="category_id" value="@if(isset($category)){{ $category->id }}@elseif(isset($product)){{ $product->category()->first()->id }}@else 2 @endif">--}}
{{--        <input class="supplier_select" type="hidden" name="supplier_id" value="@if(isset($product)){{ $product->supplier()->first()->id }}@elseif(isset($product)){{ $product->category()->first()->id }}@endif">--}}
        @if($partner)
            <input type="hidden" name="id" value="{{ $partner->id }}">
        @endif

        <input type="hidden" id="type" name="type" value="{{ $partner->type ?? 0 }}">

        <input type="hidden" name="category_id" value="@if(isset($partner)){{ $partner->category()->first()->id }}@elseif(isset($category)){{ $category->id }}@else 3 @endif">

        <input type="hidden" name="category_type" id="category_type" value="@if(!isset($partner)){{ $category->type }}@endif">

        <input type="hidden" name="page" value="@if(isset($request) && isset($request['page'])){{ $request['page'] }}@else 1 @endif">
        <input type="hidden" name="search" value="@if(isset($request) && isset($request['search'])){{ $request['search'] }}@else @endif">

        <div class="modal-header tab-container">
            <ul class="nav header_selects_navs">
                <li class="nav-item">
                    <a onclick="window.{{ $class }}.activateTab(this, 'fl');" class="button primary mr-15 tab-btn @if(!$partner || $partner['type'] == 0) active @endif" >Физическое лицо</a>
                </li>
                <li class="nav-item">
                    <a onclick="window.{{ $class }}.activateTab(this, 'ip');" class="button primary mr-15 tab-btn @if(isset($partner) && $partner['type'] == 1) active @endif" >ИП</a>
                </li>
                <li class="nav-item">
                    <a onclick="window.{{ $class }}.activateTab(this, 'ul');" class="button primary mr-15 tab-btn @if(isset($partner) && $partner['type'] == 2) active @endif" >Юридическое лицо</a>
                </li>
            </ul>
        </div>
        @include(get_template() . '.partner.dialog.tabs')
        <div class="modal-footer">
            <button onclick="window.{{ $class }}.finitaLaComedia()" class="button white">Закрыть</button>
            <button type="button" onclick="window.{{ $class }}.save(this)" class="button pull-right">Сохранить</button>
        </div>
        <div class="system_message"></div>
    </form>
</div>
