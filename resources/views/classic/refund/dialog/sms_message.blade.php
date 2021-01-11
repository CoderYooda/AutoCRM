<div class="chat-item mb-2" data-class="null">
    <div class="ring-ico primary">
        <span class="first_letter">BB</span>
    </div>
    <div class="chat-body">
        <div class="chat-content success">
            {{ $smsMessage->message }}
        </div>
        <div class="chat-date">
            {{ $smsMessage->normalizedData() }}
        </div>
    </div>
</div>
