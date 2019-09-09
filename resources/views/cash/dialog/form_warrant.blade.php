<div
    @if(isset($warrant) && $warrant->id != NULL)
        @php $class = 'warrantDialog' . $warrant->id @endphp
        id="warrantDialog{{$warrant->id}}" data-id="{{$warrant->id}}"
    @else
        @php $class = 'warrantDialog' @endphp
        id="warrantDialog"
    @endif
    class="dialog warrant_dialog" style="width:400px;">
    @if(isset($warrant) && $warrant->id != NULL)
        <div class="titlebar">Расходный ордер №{{ $warrant->id }}</div>
    @else
        <div class="titlebar">Новый расходный ордер</div>
    @endif
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
    <form action="{{ route('StoreWarrant') }}" method="POST">
        @csrf
        @if(isset($warrant) && $warrant->id != NULL)
            <input type="hidden" name="id" value="{{ $warrant->id }}">
        @endif
        <input class="partner_select" type="hidden" name="partner_id" value=" @if(isset($warrant)){{ $warrant->partner()->first()->id }}@endif">
        <input class="cashbox_select" type="hidden" name="cashbox_id" value=" @if(isset($warrant)){{ $warrant->cashbox()->first()->id }}@endif">
        <input class="ddsarticle_select" type="hidden" name="ddsarticle_id" value=" @if(isset($warrant)){{ $warrant->ddsarticle()->first()->id }}@endif">

        <div class="no-gutters align-items-stretch">
        <div class="padding">
            <div class="form-group">
                <label for="category_id">Поставщик</label>
                <div class="input-group">
                    <select name="partner_id" disabled class="partner_select form-control input-c noarrow fake-disabled" readonly>
                        @if(isset($warrant) && $warrant->partner()->first() != null)
                            <option value="{{ $warrant->partner()->first()->id }}">{{ $warrant->partner()->first()->outputName() }}</option>
                        @else
                            <option>Не выбрано</option>
                        @endif
                    </select>
                    <div class="input-group-append">
                        <button onclick="{{ $class }}.openSelectPartnerModal()"
                                class="btn white" type="button"><i class="fa fa-bars"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="category_id">Касса</label>
                <div class="input-group">
                    <select name="cashbox_id" disabled class="cashbox_select form-control input-c noarrow fake-disabled" readonly>
                        @if(isset($warrant) && $warrant->cashbox()->first() != null)
                            <option value="{{ $warrant->cashbox()->first()->id }}">{{ $warrant->cashbox()->first()->outputName() }}</option>
                        @else
                            <option>Не выбрано</option>
                        @endif
                    </select>
                    <div class="input-group-append">
                        <button onclick="{{ $class }}.openSelectCashboxModal()"
                                class="btn white" type="button"><i class="fa fa-bars"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="category_id">Статья</label>
                <div class="input-group">
                    <select name="ddsarticle_id" disabled class="cashbox_select form-control input-c noarrow fake-disabled" readonly>
                        @if(isset($warrant) && $warrant->ddsarticle()->first() != null)
                            <option value="{{ $warrant->ddsarticle()->first()->id }}">{{ $warrant->ddsarticle()->first()->outputName() }}</option>
                        @else
                            <option>Не выбрано</option>
                        @endif
                    </select>
                    <div class="input-group-append">
                        <button onclick="{{ $class }}.openSelectDdsarticleModal()"
                                class="btn white" type="button"><i class="fa fa-bars"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>Сумма</label>
                <input type="number" step="0.1" name="summ"
                       @if(isset($warrant)) value="{{ $warrant->summ }}" @endif
                       class="form-control" placeholder="Сумма">
            </div>
            <div class="form-group">
                <label>Основание</label>
                <input type="text" name="reason"
                       @if(isset($warrant)) value="{{ $warrant->reason }}" @endif
                       class="form-control" placeholder="Основание">
            </div>
            <div class="form-group">
                <label for="comment">Комментарий</label>
                <textarea style="resize: none;" class="form-control" name="comment" id="comment" cols="30" rows="5">@if(isset($entrance)){{ $entrance->comment }}@endif</textarea>
            </div>
        </div>
{{--                <div class="form-group">--}}
{{--                    <label>Артикул</label>--}}
{{--                    <input type="text" name="article"--}}
{{--                           @if(isset($product))value="{{ $product->article }}"@endif--}}
{{--                           @if(isset($request) && $request['article'] != NULL)value="{{ $request['article'] }}"@endif--}}
{{--                           class="form-control" placeholder="Артикул детали (не более 64 символов)">--}}
{{--                </div>--}}

        </div>
        <div class="modal-footer">
            <button class="btn primary" onclick="{{ $class }}.save(this)">Сохранить</button>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
