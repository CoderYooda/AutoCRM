@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? get_template() . '.layouts.TabXHR' : get_template() . '.user.index')

@section('tab')
    <div class="box">
        @if(isset($editmode) && $editmode)
            <form id="act_form_partner" action="{{ route('StorePartner') }}" method="POST">
                @csrf
                <input type="hidden" name="id" value="{{ $user->id }}">

                <input id="type" type="hidden" name="type" value="{{ $user['type'] ?? 0 }}">
                <input class="category_select" type="hidden" name="category_id" value="{{ $user->category()->first()->id}}">

                    @if(isset($user) && $user->user()->first() != null)
                        @if(isset($user) && $user->user()->first()->banned_at == null)
                            <input type="hidden" name="access" value="1">
                        @else
                            <input type="hidden" name="access" value="0">
                        @endif
                    @else
                        <input type="hidden" name="access" value="0">
                    @endif

                @endif
                <div class="p-15">
                    <h2 class="user_h2">
                        @if(isset($editmode) && $editmode)
                            @if($user->type != 2)
                                <input class="name_edit" type="text" name="fio" value="{{ $user->fio }}">
                            @else
                                <input class="name_edit" type="text" name="companyName"
                                       value="{{ $user->companyName }}">
                            @endif
                        @else
                            {{ $user->outputName() }}
                        @endif
                        <div class="category">Категория: {{ $user->category->name }}</div>
                        <div class="balance">Баланс: {{ correct_price($user->balance) }} руб.</div>
                    </h2>
                </div>

                <div class="user_stat">
                    <a href="#" class="item">
                        <span class="text-md d-block">{{ \App\Models\Shipment::where('manager_id', auth()->user()->partner_id)->count() }}</span>
                        <small class="text-xs text-muted">Продаж</small>
                    </a>
                    <a href="#" class="item">
                        <span class="text-md d-block">{{ \App\Models\Warrant::where('isIncoming', 1)->where('manager_id', auth()->user()->partner_id)->sum('summ') }}</span>
                        <small class="text-xs text-muted">Выручка</small>
                    </a>
{{--                    <a href="#" class="item">--}}
{{--                        <span class="text-md d-block">12</span>--}}
{{--                        <small class="text-xs text-muted">Клиентов</small>--}}
{{--                    </a>--}}
                    <div class="btn-block">
                        {{--TODO Can--}}
                        @if(isset($editmode) && $editmode)
                            <button onclick="window.useredit.save(this)" class="button success">Сохранить</button>
                        @else
                            @if($user->id === Auth::user()->partner->id)
                                <a href="{{ route('UserEdit', ['id' => $user->id]) }}" class="button primary ajax-nav">Редактировать</a>
                            @endif
                        @endif
                    </div>
                </div>
                <div class="p-15">
                    <div class="d-flex flex">
                        <div class="flex-2">
                            <div class="row row-sm mb-10">
                                <div class="col-sm-4">Участник системы с:</div>
                                <div class="col-sm-8"><b>{{ $user->getDateMembership() }}</b></div>
                            </div>
                            @if($user->type == 2)
                                <div class="row row-sm mb-10">
                                    <div class="col-sm-4">Ответственное лицо</div>
                                    <div class="col-sm-8">
                                        @if(isset($editmode) && $editmode)
                                            <input type="text" name="ur_fio"
                                                   @if(isset($user)) value="{{ $user->fio }}" @endif
                                                   class="form-control slim" placeholder="Ответственное лицо">
                                        @else
                                            <b>{{ $user->fio }}</b>
                                        @endif
                                    </div>
                                </div>
                            @endif
                            <div class="row row-sm mb-10">
                                <div class="col-sm-4">Email:</div>
                                <div class="col-sm-8">
                                    @if(isset($editmode) && $editmode)
                                        <input type="email" name="email"
                                               @if(isset($user)) value="{{ $user->email }}" @endif
                                               class="form-control slim" placeholder="Электронная почта">
                                    @else
                                        <b>{{ $user->outputEmail() }}</b>
                                    @endif
                                </div>
                            </div>
                            <div class="row row-sm mb-10">
                                <div class="col-sm-4">Дата рождения:</div>
                                <div class="col-sm-8">
                                    @if(isset($editmode) && $editmode)
                                        <input onclick="this.select();" type="text" name="birthday"
                                               @if(isset($user)) value="{{ $user->getBirthday() }}" @endif
                                               class="form-control slim" placeholder="Выберите дату"
                                               @if(isset($user) && $user->type != 0) disabled @endif>
                                    @else
                                        <b>{{ $user->getBirthday() }}</b>
                                    @endif
                                </div>
                            </div>

                            <div class="row row-sm mb-10">
                                <div class="col-sm-4">
                                    Штрих код (EAN 13)
                                </div>
                                <div class="col-sm-8">
                                    @if(isset($editmode) && $editmode)
                                        <input type="text" name="barcode" class="form-control slim"
                                               value="@if(isset($user)){{ $user->barcode }}@endif"
                                               placeholder="Штрих код">
                                    @else
                                        <b>{{ $user->getBarCode() }}</b>
                                    @endif
                                </div>
                            </div>


                            <div class="row row-sm mb-10">
                                <div class="col-sm-4">
                                    Номер телефона @if(isset($editmode) && $editmode) <span
                                        onclick="window.useredit.addPhone(this)"
                                        class="input_as_link pointer">добавить</span>@endif
                                </div>
                                <div class="col-sm-8 slim" id="phones">
                                    @if(isset($editmode) && $editmode)
                                        @if(isset($user))
                                            @if($user->phones()->get() != null)
                                                @foreach($user->phones()->get() as $phone)
                                                    <div class="input-group mb-10 phone slim" data-id="{{$phone->id}}">
                                                        <input type="hidden" name="phones[{{$phone->id}}][id]"
                                                               value="{{$phone->id}}">
                                                        <input type="text" name="phones[{{$phone->id}}][number]"
                                                               value="{{$phone->number}}"
                                                               class="form-control slim phone_input"
                                                               placeholder="Номер телефона">
                                                        <span class="input-group-append checkbox_append"
                                                              title="Активный номер">
                                            <div class="input-group-text border-left-0">
                                                <label class="ui-check" style="margin-bottom: 0;margin-top: 1px;">
                                                    <input type="radio" name="phones_main" value="{{$phone->id}}"
                                                           @if($phone->main) checked @endif>
                                                    <i class="dark-white"></i>
                                                </label>
                                            </div>
                                        </span>
                                                        <span class="input-group-append" data-toggle="tooltip"
                                                              data-placement="top" title="Удалить номер">
                                            <button onclick="window.useredit.deletePhone(this)"
                                                    class="input-group-text butt_del_append" type="button"
                                                    style="height: auto">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </span>
                                                    </div>
                                                @endforeach
                                            @endif
                                        @endif
                                        @if(!isset($user) || $user->phones()->count() < 1)
                                            <div class="input-group mb-10 phone">
                                                <input type="text" name="phones[num1][number]"
                                                       class="form-control slim phone_input"
                                                       placeholder="Номер телефона">
                                                <span class="input-group-append checkbox_append" title="Активный номер">
                                    <div class="input-group-text border-left-0">
                                        <label class="ui-check" style="margin-bottom: 0;margin-top: 1px;">
                                            <input type="radio" name="phones_main" checked value="num1">
                                            <i class="dark-white"></i>
                                        </label>
                                    </div>
                                </span>
                                                <span class="input-group-append" data-toggle="tooltip"
                                                      data-placement="top" title="Удалить номер">
                                    <button onclick="window.useredit.deletePhone(this)"
                                            class="input-group-text butt_del_append" type="button" style="height: auto">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </span>
                                            </div>
                                        @endif
                                    @else
                                        <b>{{ $user->firstActivePhoneNumber() }}</b>
                                    @endif
                                </div>
                            </div>
                            {{--<div class="row row-sm mb-10">--}}
                            {{--<div class="col-sm-4">--}}
                            {{--Доступ в систему--}}
                            {{--</div>--}}
                            {{--<div class="col-sm-8">--}}
                            {{--<select custom_select onchange="partnerDialog3.toggleAccess(this)" name="access" class="form-control input-c">--}}
                            {{--<option value="1">Разрешен</option>--}}
                            {{--<option value="0" selected="">Запрещен</option>--}}
                            {{--</select>--}}
                            {{--</div>--}}
                            {{--</div>--}}
                        </div>
                        <div class="flex-1 pl-15">
                            <label>Комментарий:</label><br>
                            @if(isset($editmode) && $editmode)
                                <textarea style="    height: calc(100% - 52px);" type="text" name="comment"
                                          class="form-control w-100"
                                          placeholder="Комментарий">@if(isset($user)){{ $user->comment }}@endif</textarea>
                            @else
                                {{ $user->getComment() }}
                            @endif
                        </div>
                    </div>
                </div>
                @if(isset($editmode) && $editmode)
            </form>
        @endif
    </div>
@endsection
