<div
    @if(isset($partner) && $partner->id != NULL)
        id="partnerDialog{{$partner->id}}"
        @php $class = 'partnerDialog' . $partner->id @endphp
    @else
        id="partnerDialog"
        @php $class = 'partnerDialog' @endphp
    @endif
    class="dialog" style="width:600px;">


    @if(isset($partner) && $partner->id != NULL)
        <div class="titlebar">{{ $partner->outputName() }}</div>
    @else
        <div class="titlebar">Создание нового контакта</div>
    @endif
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>
    <form id="act_form_partner" action="{{ route('StorePartner') }}" method="POST">

        @csrf
{{--        <input class="category_select" type="hidden" name="category_id" value="@if(isset($category)){{ $category->id }}@elseif(isset($product)){{ $product->category()->first()->id }}@else 2 @endif">--}}
{{--        <input class="supplier_select" type="hidden" name="supplier_id" value="@if(isset($product)){{ $product->supplier()->first()->id }}@elseif(isset($product)){{ $product->category()->first()->id }}@endif">--}}
        @if(isset($partner) && $partner->id != NULL)
            <input type="hidden" name="id" value="{{ $partner->id }}">
        @endif

        <input id="isfl" type="radio" name="isfl" value="1"
               @if(isset($partner) && $partner['isfl'])
               checked
               @elseif(!isset($partner))
                   @if($category->type == 'partner')
                   @else
                   checked
                   @endif
               @endif
               style="display: none;">

        <input id="isul" type="radio" name="isfl" value="0"
               @if(isset($partner) && !$partner['isfl'])
               checked
                   @elseif(!isset($partner))
                    @if($category->type == 'partner')
                    checked
                    @else
                   @endif
               @endif
               style="display: none;">
        <input class="category_select" type="hidden" name="category_id" value="@if(isset($partner)){{ $partner->category()->first()->id }}@elseif(isset($category)){{ $category->id }}@else 3 @endif">

        <input id="category_type" class="category_type" type="hidden" name="category_type" value="@if(!isset($partner)){{ $category->type }}@endif">

        <input type="hidden" name="page" value="@if(isset($request) && isset($request['page'])){{ $request['page'] }}@else 1 @endif">
        <input type="hidden" name="search" value="@if(isset($request) && isset($request['search'])){{ $request['search'] }}@else @endif">

        <div class="modal-header tab-container">
            <ul id="fl_ul_tabs" class="nav header_selects_navs">
                <li id="fl_butt" class="nav-item" onclick="window.{{ $class }}.activateTab('fl', this);">
                    <a class="button primary mr-15 tab-btn
                    @if(isset($partner) && $partner['isfl'])
                        active
                    @elseif(!isset($partner))
                        @if($category->type == 'partner')

                        @else
                            active
                        @endif
                    @endif" >Физическое лицо</a>
                </li>
                <li id="ul_butt" class="nav-item" onclick="window.{{ $class }}.activateTab('ul', this);">
                    <a class="button primary tab-btn
                        @if(isset($partner) && !$partner['isfl'])
                            active
                        @else
                            @if($category->type == 'partner')
                                active
                            @else

                            @endif
                        @endif" >Юридическое лицо</a>
                </li>
            </ul>
        </div>
        @include(env('DEFAULT_THEME', 'classic') . '.partner.dialog.tabs')
        <div class="modal-footer">
            <button onclick="window.{{ $class }}.finitaLaComedia()" class="button white">Закрыть</button>
            <button type="submit" onclick="window.{{ $class }}.save(this)" class="button pull-right">Сохранить</button>
        </div>
        <div class="system_message"></div>
    </form>
</div>
