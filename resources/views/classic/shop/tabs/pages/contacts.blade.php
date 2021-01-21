<div class="tab-pane p-3" id="{{$class}}_tab_contacts">

    <div class="form-group">

        <label>Описание</label>
        <div>
            <div id="contacts_editor" class="editor">{!! $shop->contacts_desc ?? '' !!}</div>
        </div>

    </div>

    <div class="form-group">

        <label>SEO Заголовок</label>
        <div class="input-group">
            <textarea class="form-control resize-none" rows="4">{{ $shop->seo_contacts_title ?? '' }}</textarea>
        </div>

    </div>

    <div class="form-group">

        <label>SEO Описание</label>
        <div class="input-group">
            <textarea class="form-control resize-none" rows="4">{{ $shop->seo_contacts_desc ?? '' }}</textarea>
        </div>

    </div>

</div>
