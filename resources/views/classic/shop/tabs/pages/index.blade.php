<div class="tab-pane p-3 active" id="{{$class}}_tab_index">

    <div class="form-group">
        <label>Фотографии</label>

        <div class="d-flex">

            <div class="mr-15">

                <div class="upload" onclick="{{ $class }}.selectFiles(this);">
                    <input type="file" class="d-none" onchange="{{ $class }}.uploadFiles(this);" multiple accept="image/jpeg,image/png,image/gif">
                </div>

            </div>

            <div class="sliders">

                <div class="slide copy d-none">

                    <span class="remove" onclick="{{ $class }}.removeImage(this);"></span>

                    <img class="image" src="" />

                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Ссылка" value="" />
                    </div>

                </div>

                @if($shop)
                    @foreach($shop->sliderImages as $image)

                        <div class="slide">

                            <span class="remove" onclick="{{ $class }}.removeImage(this);"></span>

                            <img class="image" data-index="{{ $loop->index }}" src="{{ $image->url }}" />

                            <div class="input-group">
                                <input type="text" data-error="image_urls[{{ $loop->index }}]" name="image_urls[{{ $loop->index }}]" class="form-control" placeholder="Ссылка" value="{{ $image->pivot->target_url }}" />
                            </div>

                        </div>

                    @endforeach
                @endif

{{--                    <div class="image relative mb-5 copy d-flex flex-column d-none">--}}


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
