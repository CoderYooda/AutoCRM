<div class="tab-pane p-3" id="{{$class}}_tab_warranty">

    <div class="form-group">

        <label>Способы оплаты и доставки</label>
        <div>
            <div id="delivery_editor" class="editor">{!! $shop->warranty_desc ?? '' !!}</div>
        </div>

    </div>

    <div class="form-group">

        <label>SEO Заголовок</label>
        <div class="input-group">
            <textarea class="form-control resize-none" rows="4">{{ $shop->seo_warranty_title ?? '' }}</textarea>
        </div>

    </div>

    <div class="form-group">

        <label>SEO Описание</label>
        <div class="input-group">
            <textarea class="form-control resize-none" rows="4">{{ $shop->seo_warranty_desc ?? '' }}</textarea>
        </div>

    </div>

</div>
