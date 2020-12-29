<ol class="breadcrumb nav m-0">

    @forelse($parentCategories as $index => $parentCategory)

        @continue($parentCategory->id == 1)

        @if(!$index)
            <li class="breadcrumb-item">
                <span class="ajax-nav">{{ $parentCategory->name }}</span>
            </li>
        @else
            <li class="breadcrumb-item">
                <a class="ajax-nav" onclick="window.store.loadCategory('{{ $parentCategory->id }}', true, true)">{{ $parentCategory->name }}</a>
            </li>
        @endif

    @empty

        <ol class="breadcrumb nav m-0"><li>Поиск по складу</li></ol>

    @endforelse

 </ol>
