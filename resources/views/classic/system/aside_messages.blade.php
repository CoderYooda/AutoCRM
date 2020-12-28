@php
$messages = [];
@endphp
{{--data-backdrop="true" aria-hidden="true"--}}
<div class="modal fade" id="notifications">
    <div class="modal-dialog modal-right w-xl white b-l">
        <div class="d-flex flex-column h-100">
            <div class="p-15 b-b d-flex no-shrink">
                <h5 class="h5 m-0">Системные сообщения</h5>
                <a onclick="systemMessages.modal.hide()" class="close_but ml-auto">
                    <span class="text-lg l-h-1x">&times;</span>
                </a>
            </div>
            <div data-simplebar style="max-height: calc(100vh - 55px); width: 370px">
                <div class="prl-10" id="system_messages">
                    @include(get_template() . '.system.messages_list')
                </div>
            </div>
        </div>
    </div>
</div>

