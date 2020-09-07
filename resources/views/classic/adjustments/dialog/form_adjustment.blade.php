@if(!isset($inner) || !$inner)
    <div id="adjustmentDialog{{$adjustment->id ?? ''}}" @isset($adjustment) data-id="{{ $adjustment->id }}" @endif class="dialog adjustment_dialog" style="width:844px; height: 450px;">
@endif
        <div class="titlebar">{{ isset($adjustment) ? ('Корректировка №' . $adjustment->id) : ('Новая корректировка') }}</div>
        <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
        <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>

        <div id="adjustment_tabs" class="d-flex tab_links ml-15 mt-15 mr-15">
            <a href="#" class="active" data-target="tab_desc" style="margin-right: 30px;">Описание</a>
            <a href="#" data-target="tab_products">Продукты</a>
        </div>

        <form onsubmit="{{ $class }}.save(this)" class="AdjustmentStoredListner" action="{{ route('StoreAdjustment') }}" method="POST" style="height: 295px;">

            @csrf

            <input type="hidden" name="id" value="{{ $adjustment->id ?? '' }}">

            <div id="tab_desc" class="box-body tab active">

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

            <div id="tab_products" class="tab">

{{--                <div class="form-group w-100">--}}
{{--                    <button type="button" onclick="{{ $class }}.selectProduct()" name="product_id" class="form-control text-left button_select" @if($adjustment) disabled @endif>Выбор продукта</button>--}}
{{--                </div>--}}

                <div data-simplebar class="w-100 mt-5">
                    <div id="table-list" class="d-flex flex-column w-100">

                        <table cellspacing="0">

                            <thead>
                                <th>Артикул</th>
                                <th>Производитель</th>
                                <th>Название</th>
                                <th>
                                    <div class="pointer" style="color: #A1A1A1;">
                                        <span>Удалить все <i class="fa fa-times" aria-hidden="true"></i></span>
                                    </div>
                                </th>
                            </thead>

                            <tbody>
                                @if(count($articles))
                                    @foreach($articles as $article_id => $articleAttributes)

                                        <tr style="height: 40px;">
                                            <td>
                                                <div>
                                                    <span>{{ $article_id }}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <span>{{ $articleAttributes['manufacturer'] }}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <span>{{ $articleAttributes['name'] }}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="p-5">
                                                    <img class="pointer" src="{{ asset('/images/icons/edit-pen.svg') }}" style="vertical-align: middle;" />
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                @endif
                            </tbody>

                        </table>

{{--                        @if(count($articles))--}}
{{--                            @foreach($articles as $article_id => $articleAttributes)--}}
{{--                                @include(get_template() . '.adjustments.dialog.product_elements')--}}
{{--                            @endforeach--}}
{{--                        @endif--}}

                    </div>
                </div>

            </div>

        </form>


        <div class="modal-footer">

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
