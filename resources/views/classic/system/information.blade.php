@php
    $information = null;
    $source = null;
@endphp
<div class="modal fade" id="information">
    <div class="modal-dialog modal-right w-xl white b-l">
        <div class="d-flex flex-column h-100">
            <div class="p-15 b-b d-flex no-shrink">
                <h5 class="h5 m-0">Информация</h5>
                @if(session()->has('auth_from_id'))
                    <a onclick="Information.editInfo()" class="close_but ml-auto">
                        <span class="text-lg l-h-1x">&#9997;</span>
                    </a>
                @endif
                <a onclick="Information.modal.hide()" class="close_but ml-auto">
                    <span class="text-lg l-h-1x">&times;</span>
                </a>
            </div>
            <div data-simplebar style="max-height: calc(100vh - 55px); width: 370px">
                <div class="prl-10" id="information_list">
                    @include(get_template() . '.system.information_list')
                </div>
            </div>
        </div>
    </div>
</div>

