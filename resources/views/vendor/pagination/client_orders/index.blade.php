@if ($paginator->hasPages())

    <div class="d-flex all-center" role="navigation">
        {{-- Previous Page Link --}}
        @if ($paginator->onFirstPage())
            <div class="page-item disabled" aria-disabled="true">
                @lang('pagination.previous')
            </div>
        @else
            <div class="page-item">
                <a class="page-link" onclick="selectClientOrderDialog.search('{{ $paginator->previousPageUrl() }}')" href="#" rel="prev">
                    @lang('pagination.previous')
                </a>
            </div>
        @endif

        {{-- Pagination Elements --}}
        @foreach ($elements as $element)
            {{-- "Three Dots" Separator --}}
            @if (is_string($element))
                <div class="page-item disabled" aria-disabled="true"><span class="page-link">{{ $element }}</span></div>
            @endif

            {{-- Array Of Links --}}
            @if (is_array($element))
                @foreach ($element as $page => $url)
                    @if ($page == $paginator->currentPage())
                        <div class="page-item active" aria-current="page"><span class="page-link">{{ $page }}</span></div>
                    @else
                        <div class="page-item"><a onclick="selectClientOrderDialog.search('{{ $url }}')" class="page-link" href="#">{{ $page }}</a></div>
                    @endif
                @endforeach
            @endif
        @endforeach

        {{-- Next Page Link --}}
        @if ($paginator->hasMorePages())
            <div class="page-item">
                <a class="page-link" onclick="selectClientOrderDialog.search('{{ $paginator->nextPageUrl() }}')" href="#" rel="next">
                    @lang('pagination.next')
                </a>
            </div>
        @else
            <div class="page-item disabled" aria-disabled="true">
                @lang('pagination.next')
            </div>
        @endif
    </div>
@endif
