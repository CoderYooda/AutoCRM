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
        <div class="titlebar">{{ $partner->fio }}</div>
    @else
        <div class="titlebar">Создание нового контакта</div>
    @endif

    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>
    <form id="act_form_partner" action="{{ route('StorePartner') }}" method="POST">
        @csrf
{{--        <input class="category_select" type="hidden" name="category_id" value="@if(isset($category)){{ $category->id }}@elseif(isset($product)){{ $product->category()->first()->id }}@else 2 @endif">--}}
{{--        <input class="supplier_select" type="hidden" name="supplier_id" value="@if(isset($product)){{ $product->supplier()->first()->id }}@elseif(isset($product)){{ $product->category()->first()->id }}@endif">--}}
        @if(isset($partner) && $partner->id != NULL)
            <input type="hidden" name="id" value="{{ $partner->id }}">
        @endif

        <input id="isfl" type="radio" name="isfl" value="1" @if(isset($partner) && $partner['isfl']) checked @elseif(!isset($partner)) checked @endif style="display: none;">
        <input id="isul" type="radio" name="isfl" value="0" @if(isset($partner) && !$partner['isfl'])checked @endif style="display: none;">

        <input class="category_select" type="hidden" name="category_id" value="@if(isset($partner)){{ $partner->category()->first()->id }}@else 3 @endif">

        <input type="hidden" name="page" value="@if(isset($request) && isset($request['page'])){{ $request['page'] }}@else 1 @endif">
        <input type="hidden" name="search" value="@if(isset($request) && isset($request['search'])){{ $request['search'] }}@else @endif">

        <div class="p-3">
            <div class="nav-active-primary">
                <ul class="nav nav-pills nav-sm flexed-navs">
                    <li class="nav-item">
                        <a onclick="window.{{ $class }}.activateTab('fl');" class="nav-link fl-tab
                            @if(isset($partner) && $partner['isfl']) active @elseif(!isset($partner)) active @endif
                            " data-toggle="tab" data-target="#physial_tab">
                            Физическое лицо
                        </a>
                    </li>
                    <li class="nav-item">
                        <a onclick="window.{{ $class }}.activateTab('ul');" class="nav-link
                            @if(isset($partner) && !$partner['isfl']) active @endif
                            " data-toggle="tab" data-target="#uridical_tab">
                            Юридическое лицо
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        @include('partner.dialog.tabs')
        <div class="modal-footer">
            <button type="submit" onclick="window.{{ $class }}.save(this)" class="btn success pull-right">Сохранить</button>
        </div>
{{--        <div class="tab-content">--}}
{{--            <div class="tab-pane @if(isset($partner) && $partner['isfl']) active @elseif(!isset($partner)) active @endif" id="physial_tab">--}}
{{--                @include('partner.dialog.physical')--}}
{{--            </div>--}}
{{--            <div class="tab-pane @if(isset($partner) && !$partner['isfl']) active @endif" id="uridical_tab">--}}
{{--                @include('partner.dialog.uridical')--}}
{{--            </div>--}}

{{--        </div>--}}
        <div class="system_message">
        </div>
    </form>
</div>
