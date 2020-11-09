@if(!$request->inner)
<div id="entranceDialog{{ $entrance->id ?? '' }}" @if($entrance) data-id="{{ $entrance->id }}" @endif class="dialog entrance_dialog" style="width:800px;">
@endif
    <div class="titlebar">{{ $entrance ? ('Поступление товара #' . $entrance->id . ' по заявке #' . $entrance->providerorder->id) : 'Новое поступление товара' }}</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
    <div class="modal-header dark" style="justify-content: normal;">
        <div class="modal-alt-header">
            <span class="item-title _500">Всего на сумму</span>
            <div class="item-except font-weight-bolder h-1x">
                    <span id="total_price">
                        @if(isset($entrance)){{ correct_price($entrance->i) . ' ₽' }} @else 0.00 ₽ @endif
                    </span>
            </div>
            <div class="item-tag tag hide">
            </div>
        </div>
    </div>
    <form class="WarrantStoredListner" action="{{ route('StoreEntrance') }}" method="POST">
        <div class="modal-body">
            @csrf
            @if(isset($entrance) && $entrance->id != NULL)
                <input type="hidden" name="id" value="{{ $entrance->id }}">
                {{--<input type="hidden" name="itogo" value="{{ $entrance->totalPrice }}">--}}
                {{--<input type="hidden" name="ostatok" value="{{ $entrance->totalPrice - $entrance->warrants()->sum('summ') }}">--}}
            @else
                <input type="hidden" name="id" value="">
            @endif
            <input class="partner_select" type="hidden" name="partner_id" value=" @if(isset($entrance->providerorder)){{ $entrance->providerorder->partner->id }}@endif">
            <input class="providerorder_select" type="hidden" name="providerorder_id" value=" @if(isset($entrance->providerorder)){{ $entrance->providerorder->id }}@endif">
            <div class="d-flex">
                <div class="link-tabs no-pr">
                    <ul class="nav" id="entrance_tabs{{ $entrance ? $entrance->id : '' }}" storage_tabs>
                        <li class="nav-item active">
                            <a class="nav-link" href="{{ $entrance ? '#e_tab_base' . $entrance->id : '#e_tab_base' }}" aria-controls="{{ $entrance ? 'e_tab_base' . $entrance->id : 'e_tab_base' }}" data-toggle="tab" data-target="{{ $entrance ? '#e_tab_base' . $entrance->id : '#e_tab_base' }}">
                                Основные
                                <span class="float-right helper_danger d-none-f">
                                        <i class="fa fa-exclamation-triangle text-md ml-2 text-danger"></i>
                                    </span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ $entrance ? '#e_tab_items' . $entrance->id : '#e_tab_items' }}" aria-controls="{{ $entrance ? 'e_tab_items' . $entrance->id : 'e_tab_items' }}" data-toggle="tab" data-target="{{ $entrance ? '#e_tab_items' . $entrance->id : '#e_tab_items' }}">
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
                        <div class="tab-pane active" id="{{ $entrance ? 'e_tab_base' . $entrance->id : 'e_tab_base' }}">
                            <div class="form-group row row-sm">
                                <label for="category_id" class="col-sm-5 label-sm">Заявка поставщику</label>
                                <div class="input-group mb-3 col-sm-7 mb-0">
                                    <button onclick="{{ $class }}.openSelectProviderOrderModal()" type="button" name="providerorder_id" class="providerorder_select form-control text-left button_select" @if(isset($providerorder) && $providerorder != null) disabled @endif>
                                        @if(isset($entrance) && $entrance->providerorder)
                                            {{ $entrance->providerorder->outputName() }}
                                        @else
                                            <option>Не выбрано</option>
                                        @endif
                                    </button>
                                </div>
                            </div>
                            <div class="form-group row row-sm">
                                <label for="category_id" class="col-sm-5 label-sm">Номер накладной</label>
                                <div class="input-group mb-3 col-sm-7 mb-0">
                                    <input class="form-control" name="invoice" type="text" placeholder="Номер накладной" value="{{ $entrance->invoice ?? '' }}" @isset($entrance) disabled @endisset>
                                </div>
                            </div>
                            @if($entrance && $entrance->providerorder)
                                <div class="form-group row row-sm">
                                    <label for="category_id" class="col-sm-5 label-sm">Ответственный</label>
                                    <div class="input-group mb-3 col-sm-7 mb-0">
                                        <input class="form-control" type="text" value="{{ $entrance->providerorder->manager->outputName() }}" disabled>
                                    </div>
                                </div>
                                <div class="form-group row row-sm">
                                    <label for="category_id" class="col-sm-5 label-sm">Телефон ответственного</label>
                                    <div class="input-group mb-3 col-sm-7 mb-0">
                                        <input class="form-control" type="text" value="{{ $entrance->providerorder->manager->firstActivePhoneNumber() }}" disabled>
                                    </div>
                                </div>
                                <div class="form-group row row-sm">
                                    <label for="category_id" class="col-sm-5 label-sm">Поставщик</label>
                                    <div class="input-group mb-3 col-sm-7 mb-0">
                                        <input class="form-control" type="text" value="{{ $entrance->providerorder->partner->outputName() }}" disabled>
                                    </div>
                                </div>
                                <div class="form-group row row-sm">
                                    <label for="category_id" class="col-sm-5 label-sm">Телефон поставщика</label>
                                    <div class="input-group mb-3 col-sm-7 mb-0">
                                        <input class="form-control" type="text" value="{{ $entrance->providerorder->partner->firstActivePhoneNumber() }}" disabled>
                                    </div>
                                </div>
                                <div class="form-group row row-sm">
                                    <label for="category_id" class="col-sm-5 label-sm">Дата поступления</label>
                                    <div class="input-group mb-3 col-sm-7 mb-0">
                                        <input class="form-control" type="text" value="{{ $entrance->providerorder->created_at }}" disabled>
                                    </div>
                                </div>
                                <div class="form-group row row-sm">
                                    <label for="category_id" class="col-sm-5 label-sm">Общая сумма заявки</label>
                                    <div class="input-group mb-3 col-sm-7 mb-0">
                                        <input class="form-control" type="text" value="{{ $entrance->providerorder->itogo }} р." disabled>
                                    </div>
                                </div>
                            @endif

                            <div class="form-group row row-sm">
                                <label for="entrance_dialog_focused" class="col-sm-5 label-sm">Комментарий:</label>
                                <div class="input-group mb-3 col-sm-7 mb-0">
                                <textarea style="resize: none; height: 80px;" class="form-control" name="comment" id="entrance_dialog_focused" cols="30" rows="5" placeholder="Комментарий" @isset($entrance) disabled @endisset>{{ $entrance->comment ?? '' }}</textarea>
                                </div>
                            </div>

                        </div>
                        <div class="tab-pane" id="{{ $entrance ? 'e_tab_items' . $entrance->id : 'e_tab_items' }}">
                            <div data-prefs="{{ $prefs }}" data-items="{{ $items }}" id="entrance_list{{ $entrance ? $entrance->id : '' }}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                @if(!isset($entrance))
                    <button type="button" class="button primary pull-right uppercase-btn" onclick="{{ $class }}.saveAndClose(this)">Сохранить и закрыть</button>
                    <button type="button" class="button primary pull-right mr-15 uppercase-btn" onclick="{{ $class }}.save(this)">Сохранить</button>
                @endif
                <button class="button white mr-15 uppercase-btn" onclick="{{ $class }}.finitaLaComedia(this)">Закрыть</button>
            </div>
            <div class="system_message">

            </div>
        </div>
    </form>
@if(!$request->inner)
</div>
@endif
