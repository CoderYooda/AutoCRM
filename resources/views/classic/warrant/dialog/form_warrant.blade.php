<div
    @if(isset($warrant) && $warrant->id != NULL)
        @php $class = 'warrantDialog' . $warrant->id @endphp
        id="warrantDialog{{$warrant->id}}"
    @else
        @php $class = 'warrantDialog' @endphp
        id="warrantDialog"
    @endif
    class="dialog warrant_dialog" style="width:500px;">
    @if(isset($warrant) && $warrant->id != NULL)
        @if($warrant->isIncoming)
            <div class="titlebar">Приходный ордер №{{ $warrant->id }}</div>
        @else
            <div class="titlebar">Расходный ордер №{{ $warrant->id }}</div>
        @endif
    @else
        @if($request['isIncoming'])
            <div class="titlebar">Новый приходный ордер</div>
        @else
            <div class="titlebar">Новый расходный ордер</div>
        @endif
    @endif

    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="{{ $class }}.finitaLaComedia()">×</button>

    <form action="{{ route('StoreWarrant') }}" method="POST">
        @csrf

        <input type="hidden" name="entity_id" value="{{ $request->refer_id ?? null }}" />
        <input type="hidden" name="ostatok" value="{{ $request->ostatok ?? null }}" />

        @if(isset($request) && $request['refer'] != NULL)
            <input type="hidden" name="refer" value="{{ $request['refer'] }}">
        @endif

        @if(isset($request) && $request['refer_id'] != NULL)
            <input type="hidden" name="refer_id" value="{{ $request['refer_id'] }}">
        @endif

        @if(isset($warrant) && $warrant->id != NULL)
            <input type="hidden" name="id" value="{{ $warrant->id }}">
        @endif
        @if(isset($data->partner_selected) && $data->partner_selected !== null)
            <input class="partner_select" type="hidden" name="partner_id" value="{{ $data->partner_selected->id }}">
        @else
            <input class="partner_select" type="hidden" name="partner_id" value="
            @if(isset($warrant))
            {{ $warrant->partner->id }}
            @elseif(isset($data->partner_selected) && $data->partner_selected !== null)
            {{ $data->partner_selected->id }}
            @endif">
        @endif




        @if(isset($warrant))
            <input class="cashbox_select" type="hidden" name="cashbox_id" value="@if(isset($warrant)){{ $warrant->cashbox->id }}@else @endif">
        @else
            @if(isset($data) && $data->cashbox !== null)
                <input class="cashbox_select" type="hidden" name="cashbox_id" value="{{ $data->cashbox->id }}">
            @else
                <input class="cashbox_select" type="hidden" name="cashbox_id" value="">
            @endif
        @endif


        @if(isset($warrant))
            <input class="ddsarticle_select" type="hidden" name="ddsarticle_id" value=" @if(isset($warrant)){{ $warrant->ddsarticle->id }}@endif">
        @else
            @if(isset($data->dds_article) && $data->dds_article !== null)
                <input class="dds_article_select" type="hidden" name="ddsarticle_id" value="{{ $data->dds_article->id }}">
            @else
                <input class="ddsarticle_select" type="hidden" name="ddsarticle_id" value="">
            @endif
        @endif


        @if(isset($warrant))<input class="do_date" type="hidden" name="do_date" value="{{ $warrant->do_date }}">@endif

        <input type="hidden" name="isIncoming" value="@if(isset($warrant)){{ $warrant->isIncoming }}@elseif(isset($request['isIncoming'])){{ $request['isIncoming'] }}@else 1 @endif">
        <input type="hidden" id="move_to" name="move_to" value="@if(isset($warrant)){{ $warrant->move_to }}@elseif(isset($request['move_to'])){{ $request['move_to'] }}@else out @endif">
        @if(isset($data->summ))
            <input type="hidden" name="max_summ" value="{{ $data->summ }}">
        @endif
        <div class="modal-header d-flex">
            <div class="flex-1">
                <span class="text-muted pr-15">Дата</span>
                <span>@if(isset($warrant)){{ \Carbon\Carbon::parse($warrant->do_date)->format('d.m.Y') }}@else{{ \Carbon\Carbon::now()->format('d.m.Y')  }}@endif</span>
            </div>
            <div class="pull-right flex-1">
                <span class="partner_balance text-warning">
                    @if(isset($warrant) && $warrant->payed_at != null)
                        @if($warrant->payed_by == 'evotor')
                            <div class="evotor_ico">
                                <span class="payed">ОПЛАЧЕНО</span>
                                <span class="payed_logo"></span>
                            </div>
                        @endif
                    @endif
                </span>
            </div>
        </div>
        <div class="box-body">
            <div class="form-group row">
                <label for="partner_id" class="col-sm-3 no-pr col-form-label">@if(isset($warrant) && $warrant->isIncoming) Плательщик @elseif($request['isIncoming']) Плательщик @else Получатель @endif</label>
                <div class="col-sm-6 no-pr">
                    <button onclick="{{ $class }}.openSelectPartnerModal()" type="button" name="partner_id" class="form-control text-left button_select">
                        @if(isset($warrant) && $warrant->partner != null)
                            {{ $warrant->partner->outputName() }}
                        @else
                            @if(isset($data->partner_selected) && $data->partner_selected !== null)
                                {{ $data->partner_selected->outputName() }}
                            @else
                                Не выбрано
                            @endif
                        @endif
                    </button>
                </div>
                <div class="col-sm-3">
                    <span class="partner-balance">
                        Баланс:<br>
                        <span id="balance">@if(isset($warrant)){{ correct_price($warrant->partner->balance) }} @elseif(isset($data->partner_selected)) {{ correct_price($data->partner_selected->balance) }} @else 0.00 @endif р.</span>
                    </span>
                </div>
            </div>

            <div class="form-group row">
                <label for="partner_id" class="col-sm-3 col-form-label">Касса</label>
                <div class="col-sm-9">
                    <button onclick="{{ $class }}.openSelectCashboxModal()" type="button" name="cashbox_id" class="form-control text-left button_select">
                        @if(isset($warrant) && $warrant->cashbox != null)
                            {{ $warrant->cashbox->name }}
                        @else
                            @if(isset($data->cashbox) && $data->cashbox !== null)
                                {{ $data->cashbox->name }}
                            @else
                                Не выбрано
                            @endif
                        @endif
                    </button>
                </div>
            </div>

            <div class="form-group row">
                <label for="partner_id" class="col-sm-3 col-form-label">Статья</label>
                <div class="col-sm-9">
                    <button onclick="{{ $class }}.openSelectDdsarticleModal({{ $warrant->isIncoming ?? $request['isIncoming'] }})" type="button" name="ddsarticle_id" class="form-control text-left button_select">
                        @if(isset($warrant) && $warrant->ddsarticle != null)
                            {{ $warrant->ddsarticle->name }}
                        @else
                            @if(isset($data->dds_article) && $data->dds_article !== null)
                                {{ $data->dds_article->name }}
                            @else
                                Не выбрано
                            @endif
                        @endif
                    </button>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-3 col-form-label" >Сумма</label>
                <div class="col-sm-9">
                    <input id="warrant_dialog_focused" onclick="this.select();" onkeyup="{{ $class }}.writingSumm(this)" type="text" name="summ" value="{{ $warrant->summ ?? $data->summ ?? '' }}" class="form-control" placeholder="Сумма">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label" >Основание</label>
                <div class="col-sm-9">
                    <input type="text" name="reason" value="{{ $warrant->reason ?? $data->reason ?? '' }}" class="form-control" placeholder="Основание">
                </div>
            </div>
            <div class="form-group">
                <textarea placeholder="Комментарий" style="resize: none; height: 60px;" class="form-control" name="comment" id="comment" cols="30" rows="5">@if(isset($entrance)){{ $entrance->comment }}@endif</textarea>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="button white" onclick="{{ $class }}.finitaLaComedia()">Закрыть</button>
            @if(isset($warrant))
                <button type="button" class="button pull-right" onclick="window.helper.printDocument('{{ $warrant->isIncoming ? 'in-warrant' : 'out-warrant' }}', {{ $warrant->id }})" >Печать</button>
            @else
                <button type="button" class="button pull-right" onclick="window.{{ $class }}.save(this)" >Сохранить</button>
            @endif
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
