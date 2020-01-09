<div class="chat-item mb-2" data-class="null">
    <span class="w-40 avatar circle">
        <span class="w-40 avatar primary">BB</span>
    </span>
    <div class="chat-body">
        <div class="chat-content success rounded msg">
            {{ $smsMessage->message }}
        </div>
        <div class="chat-date date">
            {{ $smsMessage->normalizedData() }}
        </div>
    </div>
</div>