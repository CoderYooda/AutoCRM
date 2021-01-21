<div class="tab-pane p-3" id="{{$class}}_tab_delivery">

    <div class="form-group">

        <label>Гарантия и способы возврата</label>
        <div>
            <div id="delivery_editor" class="editor">{!! $shop->delivery_desc ?? '' !!}</div>
        </div>

    </div>

    <div class="form-group">

        <label>SEO Заголовок</label>
        <div class="input-group">
            <textarea class="form-control resize-none" rows="4">{{ $shop->seo_delivery_title ?? '' }}</textarea>
        </div>

    </div>

    <div class="form-group">

        <label>SEO Описание</label>
        <div class="input-group">
            <textarea class="form-control resize-none" rows="4">{{ $shop->seo_delivery_desc ?? '' }}</textarea>
        </div>

    </div>

</div>
