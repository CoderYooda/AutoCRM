<div class="tab-pane p-3" id="{{$class}}_tab_about">

    <div class="form-group">

        <label>Описание компании</label>
        <div>
            <div id="about_editor" class="editor">{!! $shop->about_desc ?? '' !!}</div>
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

                <div class="select_images" onclick="{{ $class }}.selectFiles(this);">
                    <input type="file" class="d-none" onchange="{{ $class }}.uploadFiles(this);" multiple accept="image/jpeg,image/png,image/gif">
                </div>

            </div>

            <div class="sliders">

                <div class="slide upload copy d-none">

                    <span class="remove" onclick="{{ $class }}.removeImage(this);"></span>

                    <img class="image" src="" />

                </div>

                @if($shop)
                    @foreach($shop->aboutImages as $image)

                        <div class="slide">

                            <span class="remove" onclick="{{ $class }}.removeImage(this);"></span>

                            <img class="image" data-id="{{ $image->id }}" data-index="{{ $loop->index }}" src="{{ $image->url }}" />

                        </div>

                    @endforeach
                @endif

            </div>

        </div>
    </div>

</div>
