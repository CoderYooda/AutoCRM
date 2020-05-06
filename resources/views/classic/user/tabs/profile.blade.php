@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.user.index')
@php $user = \App\Http\Controllers\UserController::getUser($request); $class = 'user' @endphp

@section('tab')
    <div class="p-15">
        <h2 class="user_h2">
            @if(isset($editmode) && $editmode)
            <input class="name_edit" type="text" name="name" value="{{ $user->fio }}">
            @else
                {{ $user->outputName() }}
            @endif
            <div class="category">Категория: {{ $user->category->name }}</div>
            <div class="balance">Баланс: {{ $user->balance }} руб.</div>
        </h2>
    </div>
    <div class="user_stat">
        <a href="#" class="item">
            <span class="text-md d-block">200</span>
            <small class="text-xs text-muted">Продаж</small>
        </a>
        <a href="#" class="item">
            <span class="text-md d-block">120.000</span>
            <small class="text-xs text-muted">Выручка</small>
        </a>
        <a href="#" class="item">
            <span class="text-md d-block">12</span>
            <small class="text-xs text-muted">Клиентов</small>
        </a>
        <div class="btn-block">
            {{--TODO Can--}}
            @if(isset($editmode) && $editmode)
                <a class="button success">Сохранить</a>
            @else
                @if($user->id === Auth::user()->id)
                    <a href="{{ route('UserEdit') }}" class="button primary ajax-nav">Редактировать</a>
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
                                   class="form-control slim" placeholder="Выберите дату" @if(isset($user) && !$user['isfl']) disabled @endif>
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
                            <input type="text" name="barcode" class="form-control slim" value="@if(isset($user)){{ $user->barcode }}@endif" placeholder="Штрих код">
                            @if(isset($user) && $user->barcode != null)
                                <img class="w-100" src="data:image/png;base64,{!! \App\Http\Controllers\BarcodeController::getBarCodePNG($partner->barcode) !!}" alt="barcode" />
                            @endif
                        @else
                            <b>{{ $user->getBarCode() }}</b>
                        @endif
                    </div>
                </div>


                <div class="row row-sm mb-10">
                    <div class="col-sm-4">
                        Номер телефона <span onclick="window.useredit.addPhone(this)" class="input_as_link pointer">добавить</span>
                    </div>
                    <div class="col-sm-8" id="phones">
                        @if(isset($editmode) && $editmode)
                            @if(isset($user))
                                @if($user->phones()->get() != NULL)
                                    @foreach($user->phones()->get() as $phone)
                                        <div class="input-group mb-10 phone slim" data-id="{{$phone->id}}">
                                            <input type="hidden" name="phones[{{$phone->id}}][id]" value="{{$phone->id}}">
                                            <input type="text" name="phones[{{$phone->id}}][number]" value="{{$phone->number}}" class="form-control slim phone_input" placeholder="Номер телефона">
                                            <span class="input-group-append checkbox_append" title="Активный номер">
                                        <div class="input-group-text border-left-0">
                                            <label class="ui-check" style="margin-bottom: 0;margin-top: 1px;">
                                                <input type="radio" name="phones_main" value="{{$phone->id}}" @if($phone->main) checked @endif>
                                                <i class="dark-white"></i>
                                            </label>
                                        </div>
                                    </span>
                                            <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Удалить номер">
                                        <button onclick="window.useredit.deletePhone(this)" class="input-group-text butt_del_append" type="button" style="height: auto">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </span>
                                        </div>
                                    @endforeach
                                @endif
                            @endif
                            @if(!isset($user) || $user->phones()->count() < 1)
                                <div class="input-group mb-10 phone">
                                    <input type="text" name="phones[num1][number]" class="form-control slim phone_input" placeholder="Номер телефона">
                                    <span class="input-group-append checkbox_append" title="Активный номер">
                                <div class="input-group-text border-left-0">
                                    <label class="ui-check" style="margin-bottom: 0;margin-top: 1px;">
                                        <input type="radio" name="phones_main" checked value="num1">
                                        <i class="dark-white"></i>
                                    </label>
                                </div>
                            </span>
                                    <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Удалить номер">
                                <button onclick="window.useredit.deletePhone(this)" class="input-group-text butt_del_append" type="button" style="height: auto">
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
            </div>
            <div class="flex-1 pl-15">
                <label>Комментарий:</label><br>
                @if(isset($editmode) && $editmode)
                    <textarea style="    height: calc(100% - 52px);" type="text" name="comment" class="form-control w-100" placeholder="Комментарий">@if(isset($user)){{ $user->comment }}@endif</textarea>
                @else
                    {{ $user->comment }}
                @endif
            </div>
        </div>
    </div>
@endsection
