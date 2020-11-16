@if(!isset($inner) || !$inner)
    <div id="adjustmentDialog{{$adjustment->id ?? ''}}" @isset($adjustment) data-id="{{ $adjustment->id }}" @endif class="dialog adjustment_dialog" style="width:844px;">
@endif
        <div class="titlebar">{{ isset($adjustment) ? ('Корректировка №' . $adjustment->id) : ('Новая корректировка') }}</div>
        <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
        <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>

        <form onsubmit="{{ $class }}.save(this)" class="AdjustmentStoredListner" action="{{ route('StoreAdjustment') }}" method="POST">
            <div class="modal-body">
                @csrf
                <input type="hidden" name="id" value="{{ $adjustment->id ?? '' }}">
                <div class="d-flex">
                    <div class="link-tabs no-pr">
                        <ul class="nav" id="adjustment_tabs{{ $adjustment ? $adjustment->id : '' }}" storage_tabs>
                            <li class="nav-item active">
                                <a class="nav-link" href="{{ $adjustment ? '#adj_tab_base' . $adjustment->id : '#adj_tab_base' }}" aria-controls="{{ $adjustment ? 'adj_tab_base' . $adjustment->id : 'adj_tab_base' }}" data-toggle="tab" data-target="{{ $adjustment ? '#adj_tab_base' . $adjustment->id : '#adj_tab_base' }}">
                                    Основные
                                    <span class="float-right helper_danger d-none-f">
                                        <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                                    </span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ $adjustment ? '#adj_tab_items' . $adjustment->id : '#adj_tab_items' }}" aria-controls="{{ $adjustment ? 'adj_tab_items' . $adjustment->id : 'adj_tab_items' }}" data-toggle="tab" data-target="{{ $adjustment ? '#adj_tab_items' . $adjustment->id : '#adj_tab_items' }}">
                                    Позиции
                                    <span class="float-right helper_danger d-none-f">
                                        <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="dialog_tab_holder">
                        <div class="tab-content no-pl">
                            <div class="tab-pane active" id="{{ $adjustment ? 'adj_tab_base' . $adjustment->id : 'adj_tab_base' }}">
                                <div class="form-group row">
                                    <label class="col-sm-5" for="shipment_dialog_focused">Менеджер</label>
                                    <div class="col-sm-7">
                                        <button  type="button" name="partner_id" class="partner_select form-control text-left button_select" disabled >
                                            {{ $adjustment ? $adjustment->manager->fio : auth()->user()->partner->fio }}
                                        </button>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-5" for="shipment_dialog_focused">Комментарий</label>
                                    <div class="col-sm-7">
                                        <textarea placeholder="Комментарий" style="resize: none;height: 85px;" class="form-control" name="comment" id="shipment_dialog_focused" cols="30" rows="4" @if(isset($adjustment)) disabled @endif >@if(isset($adjustment) && $adjustment->id != NULL){{ $adjustment->comment }}@endif</textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="{{ $adjustment ? 'adj_tab_items' . $adjustment->id : 'adj_tab_items' }}">
                                <div class="title_cont"><div class="header_title">Список номенклатур</div></div>
                                <div id="table-list" >
                                    <div class="header d-flex w-100">
                                        <div class="pl-10" style="width: 120px;">Артикул</div>
                                        <div style="width: 180px;">Производитель</div>
                                        <div style="width: 45%;">Название</div>
                                        <div></div>
                                    </div>
                                    <div data-simplebar class="body w-100" style="height: 216px;">
                                        <div id="product-list">
                                            @if(count($articles))
                                                @foreach($articles as $article_id => $articleAttributes)

                                                    @include(get_template() . '.adjustments.dialog.includes.product_element')

                                                @endforeach
                                            @endif
                                        </div>
                                    </div>
                                </div>
                                <button class="button-add pr-5 pl-5" style="margin-top: 15px;" name="product_id" onclick="{{ $class }}.selectProduct()" @if($adjustment) disabled @endif>+ Добавить позицию</button>
                            </div>
                        </div>
                    </div>
                </div>



                {{--<div id="tab_desc" class="tab active" style="height: 295px;">--}}
                    {{--<div style="padding: 0 22px;">--}}

                        {{--<div class="d-flex">--}}

                            {{--<div class="flex-1">--}}

                                {{--<div class="form-group d-flex flex-column">--}}
                                    {{--<label>Менеджер</label>--}}
                                    {{--<span>{{ $adjustment ? $adjustment->manager->fio : auth()->user()->partner->fio }}</span>--}}
                                {{--</div>--}}

                            {{--</div>--}}

                            {{--<div class="flex-2">--}}

                                {{--<div class="form-group">--}}
                                    {{--<label>Комментарий</label>--}}
                                    {{--@if($adjustment)--}}
                                        {{--@if($adjustment->comment)--}}
                                            {{--<p class="m-0">{{ $adjustment->comment }}</p>--}}
                                        {{--@else--}}
                                            {{--<div class="p-15" style="background: #F7F7F7; border-radius: 4px;">--}}
                                                {{--<div class="text-center">--}}
                                                    {{--<div>--}}
                                                        {{--<img src="{{ asset('/images/dialog/empty_comment.svg') }}" />--}}
                                                    {{--</div>--}}
                                                    {{--<div>Комментарий отсутствует</div>--}}
                                                {{--</div>--}}
                                            {{--</div>--}}
                                        {{--@endif--}}
                                    {{--@else--}}
                                        {{--<textarea class="form-control resize-none" style="height: 60px;"></textarea>--}}
                                    {{--@endif--}}
                                {{--</div>--}}

                            {{--</div>--}}

                        {{--</div>--}}

                    {{--</div>--}}
                {{--</div>--}}

                {{--<div id="tab_products" class="tab" style="height: 295px;">--}}

                    {{--<div id="table-list" style="margin: 0 22px 10px 22px;">--}}

                        {{--<div class="header d-flex w-100">--}}
                            {{--<div class="pl-10" style="width: 15%">Артикул</div>--}}
                            {{--<div style="width: 23%">Производитель</div>--}}
                            {{--<div style="width: 57%">Название</div>--}}
                            {{--<div></div>--}}
                        {{--</div>--}}

                        {{--<div data-simplebar class="body w-100" style="height: 216px;">--}}

                            {{--<div id="product-list">--}}

                                {{--@if(count($articles))--}}
                                    {{--@foreach($articles as $article_id => $articleAttributes)--}}

                                        {{--@include(get_template() . '.adjustments.dialog.includes.product_element')--}}

                                    {{--@endforeach--}}
                                {{--@endif--}}

                            {{--</div>--}}

                        {{--</div>--}}

                    {{--</div>--}}

                    {{--<button class="button-add pr-5 pl-5" style="margin-left: 22px;" name="product_id" onclick="{{ $class }}.selectProduct()" @if($adjustment) disabled @endif>+ Добавить позицию</button>--}}

                {{--</div>--}}
            </div>
        </form>


        <div class="modal-footer" style="height: 58px;">

            <button class="button white uppercase-btn" onclick="{{ $class }}.finitaLaComedia()">Закрыть</button>

            @if(!isset($adjustment))
                <button type="button" class="button primary pull-right uppercase-btn" onclick="{{ $class }}.saveAndClose(this)">Сохранить и закрыть</button>
                <button type="button" class="button primary pull-right mr-15 uppercase-btn" onclick="{{ $class }}.save(this)">Сохранить</button>
            @endif

        </div>

        <div class="system_message">
        </div>

        @if(!isset($inner) || !$inner)
    </div>
@endif
