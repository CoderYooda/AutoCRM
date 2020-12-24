@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.TabXHR' : 'admin.layouts.tabs')

@section('tab')

    <div id="ajax-table-companies" class="bottom-container" style="height: calc(100% - 79px) !important;">
        <div class="box box-lister">
            @foreach($partners as $partner)
                {{ $partner->name }}
            @endforeach
        </div>
        <div class="content-rightside">
            <div class="box w-290 p-15 filter-panel">
                <button onclick="window.openDialog('referalPartnerDialog');" class="button primary w-100">Добавить партнёра</button>
            </div>
        </div>
    </div>

@endsection
