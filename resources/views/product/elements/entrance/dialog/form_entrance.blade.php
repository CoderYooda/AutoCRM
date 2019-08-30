<div
    @if(isset($entrance) && $entrance->id != NULL)
        id="editEntrance{{$product->id}}"
    @else
        id="createEntrance"
    @endif
    class="dialog" style="width:600px;">
    @if(isset($entrance) && $entrance->id != NULL)
        <div class="titlebar">Редактирование '{{ $entrance->name }}'</div>
    @else
        <div class="titlebar">Новое поступление</div>
    @endif

    <button class="btn_close" onclick="closeDialog(event)">×</button>
        <div class="modal-header" style="justify-content: normal;">
            <div class="b-r pr-3 mr-3">
                <span class="item-title _500">Поступление</span>
                <div class="item-except text-sm h-1x">
                    Новое
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>
            <div class="b-r pr-3 mr-3">
                <span class="item-title _500">Поступление</span>
                <div class="item-except text-sm h-1x">
                    Новое
                </div>
                <div class="item-tag tag hide">
                </div>
            </div>
        </div>
    <form action="{{ route('StoreEntrance') }}" method="POST">
        @csrf
        @if(isset($entrance) && $entrance->id != NULL)
            <input type="hidden" name="id" value="{{ $entrance->id }}">
        @endif
        <div class="no-gutters align-items-stretch">
        <div class="padding">
            <div class="form-group">
                <label for="category_id">В категории</label>
                <div class="input-group mb-3">
                    <select name="partner_id" disabled class="partner_select form-control input-c noarrow fake-disabled" readonly>
                        @if(isset($entrance) && $entrance->partner()->first() != null)
                            <option value="{{ $entrance->partner()->first()->id }}">{{ $entrance->partner()->first()->fio }}</option>
                        @else
                            <option>Не выбрано</option>
                        @endif
                    </select>
                    <div class="input-group-append">
                        <button onclick="openDialog('selectPartner');"
                                class="btn white" type="button"><i class="fa fa-bars"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
{{--                <div class="form-group">--}}
{{--                    <label>Артикул</label>--}}
{{--                    <input type="text" name="article"--}}
{{--                           @if(isset($product))value="{{ $product->article }}"@endif--}}
{{--                           @if(isset($request) && $request['article'] != NULL)value="{{ $request['article'] }}"@endif--}}
{{--                           class="form-control" placeholder="Артикул детали (не более 64 символов)">--}}
{{--                </div>--}}

            <div class="col-md-12 p-3">
                <button type="submit" onclick="axform.send(this)" class="btn success pull-right">Сохранить</button>
            </div>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
