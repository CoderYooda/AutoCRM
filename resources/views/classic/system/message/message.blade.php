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