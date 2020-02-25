@php
$messages = \App\Http\Controllers\SystemMessageController::getMessagesAside();
@endphp

<div class="modal fade" id="user" data-backdrop="true" aria-hidden="true">
    <div class="modal-dialog modal-right w-xl white b-l">
        <div class="d-flex flex-column h-100">
            <div class="p-15 b-b d-flex no-shrink">
                <h5 class="h5 m-0">Системные сообщения</h5>
                <a data-dismiss="modal" class="close_but ml-auto">
                    <span class="text-lg l-h-1x">&times;</span>
                </a>
            </div>
            <div data-simplebar style="max-height: calc(100vh - 55px); width: 370px">
                <div class="prl-10">
                    <div class="list-group no-radius no-borders">
                        @foreach($messages as $message)
                            <div class="box-color {{ $message->type }} aside_message w-350 mb-10 p-10">
                                <button class="btn_close" onclick="window.productDialog1.finitaLaComedia()">×</button>
                                <div class="box-header">
                                    {{--<h3 class="mt-0">Box Header</h3>--}}
                                    <small>{{ $message->link }}</small>
                                </div>
                                <div class="box-body mb-10">
                                    <p class="m-0 text-muted">{{ $message->message }}</p>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
