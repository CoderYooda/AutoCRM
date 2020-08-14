<div class="titlebar">{{ $entrance ? ('Поступление товара #' . $entrance->id . ' по заявке #' . $providerorder->id) : 'Новое поступление товара' }}</div>
<button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
<button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
<form class="WarrantStoredListner" action="{{ route('StoreEntrance') }}" method="POST">
    @csrf
    @if(isset($entrance) && $entrance->id != NULL)
        <input type="hidden" name="id" value="{{ $entrance->id }}">
        {{--<input type="hidden" name="itogo" value="{{ $entrance->totalPrice }}">--}}
        {{--<input type="hidden" name="ostatok" value="{{ $entrance->totalPrice - $entrance->warrants()->sum('summ') }}">--}}
    @else
        <input type="hidden" name="id" value="">
    @endif
    <input class="partner_select" type="hidden" name="partner_id" value=" @if(isset($providerorder)){{ $providerorder->partner->id }}@endif">
    <input class="providerorder_select" type="hidden" name="providerorder_id" value=" @if(isset($providerorder)){{ $providerorder->id }}@endif">
    <div class="box-body">

        <div class="d-flex">

            <div class="flex-1 mr-5">

                <div class="form-group row row-sm">
                    <label for="category_id" class="col-sm-5 label-sm">Заявка поставщику</label>
                    <div class="input-group mb-3 col-sm-7 mb-0">
                        <button onclick="{{ $class }}.openSelectProviderOrderModal()" type="button" name="providerorder_id" class="providerorder_select form-control text-left button_select" @if(isset($providerorder) && $providerorder != null) disabled @endif>
                            @if(isset($entrance) && $providerorder)
                                {{ $providerorder->outputName() }}
                            @else
                                <option>Не выбрано</option>
                            @endif
                        </button>
                    </div>
                </div>

                @if($providerorder)

                    <div class="d-flex " >

                        <div class="flex-1">

                            <div class="mb-15">
                                <div><span style="font-weight: 500;">ID заявки: </span></div>
                                <div><span style="font-weight: 500;">Номер накладной: </span></div>
                                <div><span style="font-weight: 500;">Дата оформления: </span></div>
                                <div><span style="font-weight: 500;">Сумма заявки: </span></div>
                            </div>

                            <div class="mb-15">
                                <div><span style="font-weight: 500;">Поставщик: </span></div>
                                <div><span style="font-weight: 500;">Телефон поставщика: </span></div>
                            </div>

                            <div class="mb-15">
                                <div><span style="font-weight: 500;">Ответственный: </span></div>
                                <div><span style="font-weight: 500;">Телефон ответственного: </span></div>
                            </div>

                        </div>

                        <div class="flex-1">

                            <div class="mb-15">
                                <div>{{ $providerorder->id }}</div>
                                <div>{{ strlen($entrance->invoice) ? $entrance->invoice : '-' }}</div>
                                <div>{{ $providerorder->created_at }}</div>
                                <div>{{ $providerorder->itogo }} р.</div>
                            </div>

                            <div class="mb-15">
                                <div>{{ $providerorder->partner->outputName() }}</div>
                                <div>{{ $providerorder->partner->firstActivePhoneNumber() }}</div>
                            </div>

                            <div class="mb-15">
                                <div>{{ $providerorder->manager->outputName() }}</div>
                                <div>{{ $providerorder->manager->firstActivePhoneNumber() }}</div>
                            </div>

                        </div>
                    </div>

                @else

                    <div class="d-flex all-center mb-15" style="height: calc(100% - 63px);">
                        <div class="flex-2">
                            <div class="color-black text-center">Информация отсутствует</div>
                        </div>
                    </div>

                @endif

            </div>

            <div class="flex-1 d-flex flex-column ml-5 @if($entrance && $entrance->comment == null) all-center @endif">

                @if(!isset($entrance))

                    <div class="form-group mb-5">
                        <label>Комментарий</label>
                        <textarea style="resize: none; height: 128px;" class="form-control" name="comment" id="entrance_dialog_focused" cols="30" rows="5"></textarea>
                    </div>

                    <div class="form-group mb-0">
                        <label>Номер накладной</label>
                        <input class="form-control" name="invoice" value="{{ $entrance->invoice ?? '' }}" @if($entrance) disabled @endif />
                    </div>

                @else
                    @if($entrance->comment)
                        <label>Комментарий:</label>
                        <div class="box p-10" style="flex-grow: 1;">{{ $entrance->comment }}</div>
                    @else

                        <div class="text-center">
                            <div>
                                <img src="{{ asset('/images/dialog/empty_comment.svg') }}" />
                            </div>
                            <div>Комментарий отсутствует</div>
                        </div>

                    @endif
                @endif

            </div>

        </div>

        {{--                <div class="col-sm-6 form-group mb-0" id="entrance_info_block" @if($entrance && $entrance->comment == null) style="display: flex; align-items: center; justify-content: center;" @endif>--}}

        {{--                </div>--}}
        <div class="form-group">
            <div for="category_id" class="mb-3"><b>Список приходных номенклатур</b>
            </div>
            <div data-simplebar style="max-height: 300px;">
                <table class="table-modal" style="max-height: 300px;">
                    <thead class="text-muted">
                    <tr>
                        <th width="30%">Наименование</th>
                        <th width="10%">Артикул</th>
                        <th width="10%" style="min-width: 60px;">Кол-во</th>
                        <th width="17%" style="min-width: 20px; white-space: nowrap">Поступило / Ожидается</th>
                        <th width="8%" style="min-width: 100px;">Цена</th>
                        <th width="5%"></th>
                    </tr>
                    </thead>
                    <tbody class="product_list">
                    @if(isset($entrance))
                        @foreach($entrance->articles as $product)
                            @include(get_template() . '.entrance.dialog.product_element')
                        @endforeach
                    @else
                        <tr>
                            <td colspan="6">
                                <div class="text-center color-black m-15">Информация отсутствует</div>
                            </td>
                        </tr>
                    @endif
                    </tbody>
                </table>
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
</form>
