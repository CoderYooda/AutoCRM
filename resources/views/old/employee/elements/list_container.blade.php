@php $employees = \App\Http\Controllers\EmployeeController::getEmployees($request) @endphp
{{--@php $category = \App\Http\Controllers\CategoryController::getCategory($request, 5) @endphp--}}
{{--{!! \App\Http\Controllers\CategoryController::drawCrumbs($category, 5) !!}--}}
<div class="scroll-y">
    @if( $employees->count() > 0)
        <div class="list">
            @foreach($employees as $employee)
                @include('employee.elements.list_element')
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
            {{ $employees->setPath(route('EmployeeIndex'))->appends(request()->only(['active_tab', 'page', 'search', 'category_id']))->links() }}
        </div>
        <div>
            <span class="text-muted">Total:</span>
            <span id="count"></span>
        </div>
    </div>
</div>
