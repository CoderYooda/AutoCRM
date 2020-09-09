@if(!isset($inner) || !$inner)
    <div id="adjustmentDialog{{$adjustment->id ?? ''}}" @isset($adjustment) data-id="{{ $adjustment->id }}" @endif class="dialog adjustment_dialog" style="width:844px;">
@endif
        <div class="titlebar">{{ isset($adjustment) ? ('Корректировка №' . $adjustment->id) : ('Новая корректировка') }}</div>
        <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
        <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>

        <div id="adjustment_tabs" class="d-flex tab_links" style="margin: 10px 22px 10px 22px;">
            <a href="#" class="mr-10 active" data-target="tab_desc">Описание</a>
            <a href="#" data-target="tab_products">Продукты</a>
        </div>

        <form onsubmit="{{ $class }}.save(this)" class="AdjustmentStoredListner" action="{{ route('StoreAdjustment') }}" method="POST">

            @csrf

            <input type="hidden" name="id" value="{{ $adjustment->id ?? '' }}">

            <div id="tab_desc" class="tab active" style="height: 295px;">
                <div style="padding: 0 22px;">

                    <div class="d-flex">

                        <div class="flex-1">

                            <div class="form-group d-flex flex-column">
                                <label>Менеджер</label>
                                <span>{{ $adjustment ? $adjustment->manager->fio : auth()->user()->partner->fio }}</span>
                            </div>

                        </div>

                        <div class="flex-2">

                            <div class="form-group">
                                <label>Комментарий</label>
                                @if($adjustment)
                                    @if($adjustment->comment)
                                        <p class="m-0">{{ $adjustment->comment }}</p>
                                    @else
                                        <div class="p-15" style="background: #F7F7F7; border-radius: 4px;">
                                            <div class="text-center">
                                                <div>
                                                    <img src="{{ asset('/images/dialog/empty_comment.svg') }}" />
                                                </div>
                                                <div>Комментарий отсутствует</div>
                                            </div>
                                        </div>
                                    @endif
                                @else
                                    <textarea class="form-control resize-none" style="height: 60px;"></textarea>
                                @endif
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <div id="tab_products" class="tab" style="height: 295px;">

                <div id="table-list" style="margin: 0 22px 10px 22px;">

                    <div class="header d-flex w-100">
                        <div class="pl-10" style="width: 20%">Артикул</div>
                        <div style="width: 30%">Производитель</div>
                        <div style="width: 40%">Название</div>
                        <div style="width: 10%"></div>
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

                <button class="button-add" style="margin-left: 22px;" name="product_id" onclick="{{ $class }}.selectProduct()" @if($adjustment) disabled @endif>+ Добавить позицию</button>

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
