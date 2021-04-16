<div id="user_view" class="list-group no-radius no-borders">
    @if($information)
        <div class="w-100 p-10">
            <span>{!!$information->content!!}</span>
        </div>
    @else
        <div class="w-100 p-10">
            <span>Информация не добавлена</span>
        </div>
    @endif
</div>
<div id="admin_view" class="list-group no-radius no-borders hide">
    <form action="{{route('saveInfo')}}" method="POST" style="height: 100%;">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <div data-error="info_desc">
            <div id="editor">@if($information){!!$information->content ?? ''!!}@endif</div>
        </div>
        <button type="button" onclick="Information.saveInfo(this);" class="button primary">Сохранить</button>
    </form>
</div>

