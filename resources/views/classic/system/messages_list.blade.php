<div class="list-group no-radius no-borders">
    @forelse($messages as $message)
        <div class="box-color {{ $message->type }} aside_message w-350 mb-10 p-10">
            <button class="btn_close" onclick="window.systemMessages.readMessage({{ $message->id }})">×</button>
            <div class="box-header">
                {{--<h3 class="mt-0">Box Header</h3>--}}
                <small>{{ $message->link }}</small>
            </div>
            <div class="box-body mb-10">
                <p class="m-0 text-muted">{{ $message->message }}</p>
            </div>
        </div>
    @empty
        <div class="w-100 p-10" style="margin-top: calc(50vh - 43%);">
            <div class="mess-flat"></div>
            <span class="undermess_text">Системных сообщений нет</span>
        </div>
    @endforelse
</div>
