@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? env('DEFAULT_THEME', 'classic') . '.layouts.TabXHR' : env('DEFAULT_THEME', 'classic') . '.user.index')

@section('tab')

    <div class="box mb-15">
        <div class="container tariff-container p-15 pl-10 pr-10">

            <div class="pl-15 pr-15">

                <div id="ajax-user-vehicles" class="row row-sm">
                    @include(get_template() . '.user.tabs.includes.vehicle-list', $vehicles)
                </div>
            </div>
        </div>
    </div>

@endsection
