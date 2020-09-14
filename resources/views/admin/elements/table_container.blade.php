@php $class = 'admin' @endphp

<div class="box-lister" style="width: 1px!important;">

    <div class="search-panel box mb-15">
        <div class="search-field-container w-100">
            <input onclick="{{ $class }}.search()" id="search" name="search" placeholder="Поиск по складу" class="input w-100" value="{{ request('search') }}" type="text">
            <div class="box" onmouseleave="this.style.display = 'none';">
                <div class="store-title">
                    Выберите производителя:
                </div>
                <div id="store-list" class="store-list">

                </div>
            </div>
        </div>
    </div>

    <div class="box h-100">
        <div class="box-header" id="breadcrumbs-nav"></div>
        <div id="table-container" class="box-content h-100">
            <div id="companies-table"></div>
        </div>
    </div>
</div>
