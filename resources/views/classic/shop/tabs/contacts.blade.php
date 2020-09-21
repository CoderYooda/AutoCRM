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
                        <div class="input-group mb-10 phone">
                            <input type="text" name="phones[num1][number]" class="form-control phone_input mr-5" placeholder="Номер телефона">
                            <input type="text" name="phones[num1][desc]" class="form-control mr-5" placeholder="Укажите, чей контакт Вы хотите добавить">
                            <span class="input-group-append checkbox_append" title="Активный номер">
                                <div class="input-group-text border-left-0">
                                    <label class="ui-check" style="margin-bottom: 0;margin-top: 1px;">
                                        <input type="radio" name="phones_main" checked value="num1">
                                        <i class="dark-white"></i>
                                    </label>
                                </div>
                            </span>
                            <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Удалить номер">
                                <button onclick="{{ $class }}.deletePhone(this)" class="input-group-text butt_del_append" type="button" style="height: auto">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="form-group addable" id="emails_addable">
                    <label>Email адрес <span onclick="{{ $class }}.addEmail(this)" class="input_as_link pointer">добавить</span></label>
                    <div class="emails">
                        <div class="input-group mb-10 email">
                            <input type="text" name="emails[num1][number]" class="form-control email_input mr-5" placeholder="Email адрес">
                            <input type="text" name="emails[num1][desc]" class="form-control mr-5" placeholder="Укажите, чей контакт Вы хотите добавить">
                            <span class="input-group-append checkbox_append" title="Активный номер">
                                <div class="input-group-text border-left-0">
                                    <label class="ui-check" style="margin-bottom: 0;margin-top: 1px;">
                                        <input type="radio" name="emails_main" checked value="num1">
                                        <i class="dark-white"></i>
                                    </label>
                                </div>
                            </span>
                            <span class="input-group-append" data-toggle="tooltip" data-placement="top" title="Удалить Email адрес">
                                <button onclick="{{ $class }}.deleteEmail(this)" class="input-group-text butt_del_append" type="button" style="height: auto">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="form-group">

                    <label>Адрес</label>

                    <input name="address_name" class="form-control" type="text" placeholder="Адрес" id="suggest" value="{{ $shop->address_name ?? '' }}">
                    <input type="hidden" name="address_coords" value="{{ $shop->address_coords ?? '' }}">

                    <div id="address_map" class="w-100 mt-10" style="height: 200px; border: 1px solid #e7e8ec;">

                    </div>

                </div>

                <div class="form-group">
                    <button type="button" onclick="{{ $class }}.save(this);" class="button primary float-right">Сохранить</button>
                </div>

            </form>

        </div>

    </div>

@endsection

