<div
    @if(isset($moneymove) && $moneymove->id != NULL)
        @php $class = 'moneymoveDialog' . $moneymove->id @endphp
        id="moneymoveDialog{{$moneymove->id}}"
    @else
        @php $class = 'moneymoveDialog' @endphp
        id="moneymoveDialog"
    @endif
    class="dialog moneymove_dialog" style="width:400px;">
    @if(isset($moneymove) && $moneymove->id != NULL)
        <div class="titlebar">Перемещение средств №{{ $moneymove->id }}</div>
    @else
        <div class="titlebar">Новое перемещение средств</div>
    @endif
        <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>
    <form action="{{ route('StoreMoneyMove') }}" method="POST">
        @csrf
        @if(isset($moneymove) && $moneymove->id != NULL)
            <input type="hidden" name="id" value="{{ $moneymove->id }}">
        @endif
        <input class="in_cashbox_select" type="hidden" name="in_cashbox_id" value=" @if(isset($moneymove)){{ $moneymove->in_cashbox()->first()->id }}@endif">
        <input class="out_cashbox_select" type="hidden" name="out_cashbox_id" value=" @if(isset($moneymove)){{ $moneymove->out_cashbox()->first()->id }}@endif">
        @if(isset($moneymove))<input class="do_date" type="hidden" name="do_date" value="{{ $moneymove->do_date }}">@endif

        <div class="no-gutters align-items-stretch">

            <div class="modal-header">
                <span class="text-muted pr-15">Дата</span> <span>@if(isset($moneymove)){{ \Carbon\Carbon::parse($moneymove->do_date)->format('d.m.Y') }}@else{{ \Carbon\Carbon::now()->format('d.m.Y')  }}@endif</span>
            </div>

            <div class="box-body">
                <div class="form-group">
                    <label for="category_id">Касса отправитель</label>
                    <div class="input-group">
                        <button onclick="{{ $class }}.openSelectCashboxModal('In')" type="button" name="in_cashbox_id" class="in_cashbox_select form-control text-left button_select">
                            @if(isset($moneymove) && $moneymove->in_cashbox()->first() != null)
                                {{ $moneymove->in_cashbox()->first()->name }}
                            @else
                                Не выбрано
                            @endif
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="category_id">Касса получатель</label>
                    <div class="input-group">
                        <button onclick="{{ $class }}.openSelectCashboxModal('Out')" type="button" name="out_cashbox_id" class="out_cashbox_select form-control text-left button_select">
                            @if(isset($moneymove) && $moneymove->out_cashbox()->first() != null)
                                {{ $moneymove->out_cashbox()->first()->name }}
                            @else
                                Не выбрано
                            @endif
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label>Сумма</label>
                    <input type="number" step="0.1" name="summ"
                           @if(isset($moneymove)) value="{{ $moneymove->summ }}" @endif
                           class="form-control" placeholder="Сумма">
                </div>
                <div class="form-group">
                    <label for="comment">Комментарий</label>
                    <textarea style="resize: none;" class="form-control" name="comment" id="comment" cols="30" rows="5">@if(isset($moneymove)){{ $moneymove->comment }}@endif</textarea>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="button white" onclick="{{ $class }}.finitaLaComedia()">Закрыть</button>
            <button type="submit" class="button pull-right" onclick="window.{{ $class }}.save(this)" >Сохранить</button>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
