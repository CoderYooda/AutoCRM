<div
    @if(isset($partner) && $partner->id != NULL)
        id="editPartner{{$partner->id}}"
    @else
        id="addPartner"
    @endif
    class="dialog" style="width:600px;">
    @if(isset($partner) && $partner->id != NULL)
        <div class="titlebar">Редактирование '{{ $partner->fio }}'</div>
    @else
        <div class="titlebar">Создание нового партнера</div>
    @endif

    <button class="btn_close" onclick="closeDialog(event)">×</button>
    <form action="{{ route('StorePartner') }}" method="POST">
        @csrf
{{--        <input class="category_select" type="hidden" name="category_id" value="@if(isset($category)){{ $category->id }}@elseif(isset($product)){{ $product->category()->first()->id }}@else 2 @endif">--}}
{{--        <input class="supplier_select" type="hidden" name="supplier_id" value="@if(isset($product)){{ $product->supplier()->first()->id }}@elseif(isset($product)){{ $product->category()->first()->id }}@endif">--}}
        @if(isset($partner) && $partner->id != NULL)
            <input type="hidden" name="id" value="{{ $partner->id }}">
        @endif

        <input id="isfl" type="radio" name="isfl" value="1" @if(isset($partner) && $partner['isfl']) checked @elseif(!isset($partner)) checked @endif style="display: none;">
        <input id="isul" type="radio" name="isfl" value="0" @if(isset($partner) && !$partner['isfl'])checked @endif style="display: none;">
        <input class="category_select" type="hidden" name="category_id" value="@if(isset($partner)){{ $partner->category()->first()->id }}@else 3 @endif">

        <div class="p-3">
            <div class="nav-active-primary">
                <ul class="nav nav-pills nav-sm flexed-navs">
                    <li class="nav-item">
                        <a onclick="document.getElementById('isfl').click()" href="#" class="nav-link
                            @if(isset($partner) && $partner['isfl']) active @elseif(!isset($partner)) active @endif
                            " data-toggle="tab" data-target="#physial_tab">
                            Физическое лицо
                        </a>
                    </li>
                    <li class="nav-item">
                        <a onclick="document.getElementById('isul').click()" href="#" class="nav-link
                            @if(isset($partner) && !$partner['isfl']) active @endif
                            " data-toggle="tab" data-target="#uridical_tab">
                            Юридическое лицо
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="tab-content">
            <div class="tab-pane animate fadeIn text-muted @if(isset($partner) && $partner['isfl']) active @elseif(!isset($partner)) active @endif" id="physial_tab">
                @include('partner.dialog.physical')
            </div>
            <div class="tab-pane animate fadeIn text-muted @if(isset($partner) && !$partner['isfl']) active @endif" id="uridical_tab">
                @include('partner.dialog.uridical')
            </div>
            <div class="modal-footer">
                <button type="submit" onclick="axform.send(this)" class="btn success pull-right">Сохранить</button>
            </div>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
