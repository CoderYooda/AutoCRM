<div class="tab-pane p-3 active" id="{{$class}}_tab_index">

    <div class="form-group">
        <label>Описание компании</label>
        <div data-error="about_desc">
            <div id="editor">{!! $shop->about_desc ?? '' !!}</div>
        </div>
    </div>

    <div class="form-group">

        <label>SEO Заголовок</label>

        <div class="input-group">
            <textarea class="form-control resize-none" rows="4">{{ $shop->seo_about_title ?? '' }}</textarea>
        </div>

    </div>

    <div class="form-group">

        <label>SEO Описание</label>

        <div class="input-group">
            <textarea class="form-control resize-none" rows="4">{{ $shop->seo_about_desc ?? '' }}</textarea>
        </div>

    </div>

    <div class="form-group">
        <label>Фотографии</label>

        <div class="d-flex">

            <div class="mr-15">

                <div class="upload" onclick="{{ $class }}.selectFiles(this);">
                    <input type="file" class="d-none" onchange="{{ $class }}.uploadFiles(this);" multiple accept="image/jpeg,image/png,image/gif">
                </div>

            </div>

            <div class="sliders">

                @foreach($shop->sliderImages as $image)

                    <div class="slide">

                        <img class="image" data-index="{{ $loop->index }}" src="https://via.placeholder.com/300" alt="" />

                        <div class="input-group">
                            <input type="text" data-error="image_urls[{{ $loop->index }}]" name="image_urls[{{ $loop->index }}]" class="form-control" placeholder="Ссылка" value="{{ $image->pivot->target_url }}" />
                        </div>

                    </div>

                @endforeach

{{--                    <div class="image relative mb-5 copy d-flex flex-column d-none">--}}

{{--                        <button type="button" class="right-remove" onclick="{{ $class }}.removeImage(this);">--}}
{{--                            <i class="fa fa-trash" aria-hidden="true"></i>--}}
{{--                        </button>--}}

{{--                        <img src=""  alt=""/>--}}

{{--                        <input type="text" style="width: 125px;" placeholder="Ссылка">--}}
{{--                    </div>--}}

{{--                    @if($shop)--}}
{{--                        @foreach($shop->sliderImages as $image)--}}

{{--                            <div class="image relative mb-5 d-flex flex-column">--}}

{{--                                <img data-index="{{ $loop->index }}" src="{{ $image->url }}"  alt="" />--}}

{{--                                <input type="text" data-error="image_urls[{{ $loop->index }}]" name="image_urls[{{ $loop->index }}]" class="form-control" style="width: 125px;" placeholder="Ссылка" value="{{ $image->pivot->target_url }}" />--}}
{{--                            </div>--}}

{{--                        @endforeach--}}
{{--                    @endif--}}

            </div>

        </div>
    </div>

</div>
