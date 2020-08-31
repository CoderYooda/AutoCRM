<div id="documentDialog" class="dialog" style="width:300px;">
    <div class="titlebar">Создание документа</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>
    <form action="{{ route('DocumentStore') }}" method="post">

        @csrf

        <div class="form-group p-10 d-flex mb-0">
            <input class="form-control" type="text" name="search" placeholder="Название документа">
            <img class="absolute" style="right: 20px; top: 57px;" src="{{ asset('/images/icons/input-search.svg') }}" />
        </div>

        <div class="p-10">
            @foreach($documents as  $document)
                <div onclick="{{ $class }}.select(this)" class="form-group focuseable pointer mb-0 p-10">
                    <span>{{ ($loop->index + 1) }}. {{ $document->name }}</span>
                    <input class="d-none" type="radio" name="document_type" value="{{ $loop->index }}" />
                </div>
            @endforeach
        </div>

        <div class="modal-footer">
            <button type="button" class="button white" onclick="window.{{ $class }}.finitaLaComedia()">Закрыть</button>
{{--            <button type="button" class="button primary pull-right" onclick="{{$class}}.save(this)">Создать</button>--}}
        </div>

        <div class="system_message">
        </div>
    </form>
</div>
