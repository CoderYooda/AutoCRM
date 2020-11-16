{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин')

@section('tab')

    <div id="ajax-table-shop" class="bottom-container contacts-shop-page" style="height: calc(100% - 79px) !important;">

        <div class="box w-100 m-15 p-15">

            <form action="#" method="POST">

                <div class="form-group">
                    <label>Название магазина</label>
                    <input name="name" type="text" class="form-control" placeholder="Название магазина" value="{{ $shop->name ?? '' }}">
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

                <div class="form-group">

                    <label>Адрес торговой точки</label>

                    <input name="address_name" class="form-control" type="text" placeholder="Адрес торговой точки" id="suggest" value="{{ $shop->address_name ?? '' }}">
                    <input name="address_desc" type="text" class="form-control mt-5" placeholder="Примечание, к примеру: Вход с левой стороны здания" value="{{ $shop->address_desc ?? '' }}" />
                    <input type="hidden" name="address_coords" value="{{ $shop->address_coords ?? '' }}">

                    <div id="address_map" class="w-100 mt-10" style="height: 200px; border: 1px solid #e7e8ec;">

                    </div>

                </div>

                <div class="form-group">
                    <label>SEO Заголовок</label>
                    <textarea name="seo_contacts_title" class="form-control resize-none" rows="4" placeholder="Заголовок">{{ $shop->seo_contacts_title ?? '' }}</textarea>
                </div>

                <div class="form-group">
                    <label>SEO Описание</label>
                    <textarea name="seo_contacts_desc" class="form-control resize-none" rows="4" placeholder="Описание">{{ $shop->seo_contacts_desc ?? '' }}</textarea>
                </div>

                <div class="form-group">
                    <button type="button" onclick="{{ $class }}.saveContacts(this);" class="button primary">Сохранить</button>
                </div>

            </form>

        </div>

    </div>

@endsection

