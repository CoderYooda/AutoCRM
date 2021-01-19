{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин | Контакты')

@section('tab')

    <div id="ajax-shop-contacts" class="bottom-container" style="height: calc(100% - 30px) !important;">

        <div class="box w-100 m-15 p-15">

            <div class="form-group">

                <label>Адрес торговой точки</label>

                <div class="input-group">
                    <input class="w-100" id="suggest" type="text" name="address_name" placeholder="Москва, ул. Победы, д. 3" value="{{ $shop->address_name ?? '' }}" />
                </div>

            </div>

            <div class="form-group">

                <label>Примечание к адресу</label>

                <div class="input-group">
                    <input class="w-100" type="text" name="address_desc" placeholder="Вход с левой стороны здания" value="{{ $shop->address_desc ?? '' }}" />
                </div>

            </div>

            <div class="form-group">

                <input type="hidden" name="address_coords" value="{{ $shop->address_coords ?? '' }}">

                <div id="address_map" class="w-100 mt-10" style="height: 160px; border: 1px solid #e7e8ec;">

                </div>

            </div>

            <div class="form-group addable" id="phones_addable">
                <label>Номер телефона <span onclick="{{ $class }}.addPhone(this)" class="input_as_link pointer">добавить</span></label>
                <div class="phones">
                    @if($shop && count($shop->phones))
                        @foreach($shop->phones as $phone)
                            <div class="input-group mb-10 phone">
                                <input type="text" name="phones[{{ $loop->index }}][number]" class="form-control phone_input mr-5" placeholder="Номер телефона" value="{{ $phone->number }}">
                                <input type="text" name="phones[{{ $loop->index }}][desc]" class="form-control mr-5" placeholder="Например: Бухгалтерия" value="{{ $phone->desc }}">
                                <label data-error="phones_main" class="custom_checkbox">
                                    <input type="radio" class="not_default" name="phones_main" @if($phone->main) checked @endif value="{{ $loop->index }}" />
                                    <span></span>
                                </label>
                                <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Удалить номер">
                                    <button onclick="{{ $class }}.deletePhone(this)" class="input-group-text butt_del_append" type="button" style="height: auto">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </span>
                            </div>
                        @endforeach
                    @else
                        <div class="input-group mb-10 phone">
                            <input type="text" name="phones[0][number]" class="form-control phone_input mr-5" placeholder="Номер телефона">
                            <input type="text" name="phones[0][desc]" class="form-control mr-5" placeholder="Например: Бухгалтерия">
                            <label data-error="phones_main" class="custom_checkbox">
                                <input type="radio" class="not_default" name="phones_main" checked value="0" />
                                <span></span>
                            </label>
                            <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Удалить номер">
                                <button onclick="{{ $class }}.deletePhone(this)" class="input-group-text butt_del_append" type="button" style="height: auto">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </span>
                        </div>
                    @endif
                </div>
            </div>

            <div class="form-group addable" id="emails_addable">
                <label>Email адрес <span onclick="{{ $class }}.addEmail(this)" class="input_as_link pointer">добавить</span></label>
                <div class="emails">
                    @if($shop && count($shop->contactEmails))
                        @foreach($shop->contactEmails as $email)
                            <div class="input-group mb-10 email">
                                <input type="text" name="emails[{{ $loop->index }}][email]" class="form-control email_input mr-5" placeholder="Email адрес" value="{{ $email->email }}">
                                <input type="text" name="emails[{{ $loop->index }}][desc]" class="form-control mr-5" placeholder="Например: Отдел кадров" value="{{ $email->desc }}">
                                <label data-error="emails_main" class="custom_checkbox">
                                    <input type="radio" class="not_default" @if($email->main) checked @endif name="emails_main" value="{{ $loop->index }}" />
                                    <span></span>
                                </label>
                                <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Удалить Email адрес">
                                        <button onclick="{{ $class }}.deleteEmail(this)" class="input-group-text butt_del_append" type="button" style="height: auto">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </span>
                            </div>
                        @endforeach
                    @else
                        <div class="input-group mb-10 email">
                            <input type="text" name="emails[0][email]" class="form-control email_input mr-5" placeholder="Email адрес">
                            <input type="text" name="emails[0][desc]" class="form-control mr-5" placeholder="Например: Отдел кадров">
                            <label data-error="emails_main" class="custom_checkbox">
                                <input type="radio" class="not_default" name="emails_main" checked value="0" />
                                <span></span>
                            </label>
                            <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Удалить Email адрес">
                                <button onclick="{{ $class }}.deleteEmail(this)" class="input-group-text butt_del_append" type="button" style="height: auto">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </span>
                        </div>
                    @endif
                </div>
            </div>

        </div>

    </div>

@endsection

