<div id="search_results">

    <ul class="nav select-list-modal categories_list m-0">
        @foreach($companies as $company)
            <li onclick="{{ $class }}.selectCompany({{ $company->id }})" id="company_{{ $company->id }}" class="pointer d-flex " >
                <div class="list-title">
                    [{{ $company->id }}] {{ $company->name ?? 'Новая компания' }}
                </div>
            </li>
        @endforeach
    </ul>

</div>
