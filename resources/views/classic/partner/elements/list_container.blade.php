@php $partners = \App\Http\Controllers\PartnerController::getPartners($request) @endphp
@php $category = \App\Http\Controllers\CategoryController::getCategory($request, 3) @endphp
{!! \App\Http\Controllers\CategoryController::drawCrumbs($category, 2) !!}
<div class="scroll-y">
    @if( $partners->count() > 0)
        <div class="list">
            @foreach($partners as $partner)
                @include('partner.elements.list_element')
            @endforeach
        </div>
    @else
        <div class="no-result">
            <div class="p-4 text-center">
                По данным критериям ничего нет.
            </div>
        </div>
    @endif
</div>
<div class="p-3 b-t mt-auto">
    <div class="d-flex align-items-center">
        <div class="flex">
            {{ $partners->setPath(route('PartnerIndex'))->appends(request()->only(['active_tab', 'page', 'search', 'category_id']))->links() }}
        </div>
        <div>
            <span class="text-muted">Total:</span>
            <span id="count"></span>
        </div>
    </div>
</div>

