<div class="tab-pane p-3" id="{{$class}}_tab_about">

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

</div>
