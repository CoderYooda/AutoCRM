@if ($breadcrumbs)
    @php
        $hrefPrefix = route('CatalogueMarks')
    @endphp
    <div class="breadcrumbs">
        @foreach ($breadcrumbs as $index => $breadcrumb)
            @if ($index != (count($breadcrumbs)-1))
                @if ($index > 0)
                    @php
                        $breadcrumbUrl = "{$hrefPrefix}/";
                        $i = 1;
                    @endphp
                    @while ($i < ($index+1))
                        @php
                            $breadcrumbUrl .= $breadcrumbs[$i]->url."/";
                            $i++;
                        @endphp
                    @endwhile
                    @php($breadcrumbUrl = preg_replace("/\/$/", "", $breadcrumbUrl))
                    @php($breadcrumbUrl = preg_replace("/^\/\//", "/", $breadcrumbUrl))
                    <a href="{{ $breadcrumbUrl }}?active_tab=catalogue">{{ $breadcrumb->name }}</a>
                @else
                    @php($breadcrumbUrl = "{$hrefPrefix}/" . preg_replace("/^\//", "", $breadcrumb->url))
                    <a href="{{$breadcrumbUrl}}?active_tab=catalogue">{{ $breadcrumb->name }}</a>
                @endif
            @else
            <span class="breadcrumbs_current">{{ $breadcrumb->name }}</span>
            @endif
        @endforeach
    </div>
@endif
