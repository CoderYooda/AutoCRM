{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'classic.shop.layout.tabs')

@section('title', $page ?? 'Интернет-магазин')

@section('tab')

    <div id="ajax-shop-about" class="bottom-container" style="height: calc(100% - 79px) !important;">

        <div class="box w-100 m-15 p-15">

            <div class="form-group">
                <label>Описание компании</label>
                <div id="editor"></div>
            </div>

            <div class="form-group">

                <label>Фотографии</label>

                <div class="d-flex">

                    <div class="flex-3 images">

                        <div class="image relative copy d-none">

                            <button type="button" class="right-remove" onclick="{{ $class }}.removeImage(this);">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                            </button>

                            <img src=""  alt=""/>
                        </div>

                    </div>

                    <div class="flex-1 box p-5 ml-10 text-center">

                        <div>Максимальное кол-во изображений: 9.</div>
                        <div>Доступные форматы: jpeg, png, gif.</div>

                        <input type="file" name="images" onchange="{{ $class }}.uploadFiles(this);" multiple accept="image/jpeg,image/png,image/gif">

                    </div>

                </div>

            </div>

            <div>
                <button type="button" class="button primary float-right">Сохранить</button>
            </div>

        </div>

    </div>

@endsection

