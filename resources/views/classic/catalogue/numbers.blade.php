@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.metaXHR' : 'classic.catalogue.index')

@section('meta')
    <div style="overflow: auto" class="box-lister catalogue">
        <div id="ajax-table-store" class="">
            @if( isset($result->breadcrumbs))
                @include(get_template() . '.catalogue.breadcrumbs', ['breadcrumbs' => $result->breadcrumbs])
            @endif
            <div class="p-25 pt-0 pb-0">
                <h1>Запчасти {{ $result->model->name ?? 'Нет модели' }}</h1>
            </div>
            <div class="p-25 pt-0">
                <div class="box p-25">
                    <div class="main-image-area">
                        <div class="main-image imageArea" id="imageArea" >
                            <div class="imageLayout hide" id="imageLayout">
                                @if(isset($result->image_src) && $result->image_src && $result->image_src_header)
                                    <img rel="preload" src="{{ 'data:image/png;base64, ' . $result->image_src }}">
                                @elseif(isset($result->image) && $result->image)
                                    <img src="{{ $result->image }}">
                                @endif

                                @if (isset($result->labels) && count($result->labels) > 0)
                                    @foreach ($result->labels as $coordinate)
                                        <span class="ladel a2d"
                                              data-left="{{ $coordinate->coordinate->top->x }}"
                                              data-top="{{ $coordinate->coordinate->top->y }}"
                                              title="{{ $coordinate->number }}"
                                              data-index="{{ $coordinate->number }}"
                                              style="position:absolute; padding:1px 5px;
                                                  left: {{ $coordinate->coordinate->top->x }}px;
                                                  top: {{ $coordinate->coordinate->top->y }}px;
                                                  min-width: {{ $coordinate->coordinate->bottom->x - $coordinate->coordinate->top->x }}px;
                                                  min-height: {{ $coordinate->coordinate->bottom->y - $coordinate->coordinate->top->y }}px;
                                                  line-height:  {{ $coordinate->coordinate->bottom->y - $coordinate->coordinate->top->y }}px;
                                                  font-size:  {{ $coordinate->coordinate->bottom->y - $coordinate->coordinate->top->y - 2 }}px;"
                                        >{{ $coordinate->number }}</span>
                                    @endforeach

                                @else
                                    @if(isset($result->numbers))
                                        @foreach ($result->numbers as $number)
                                            @if(isset($number->coordinates))

                                                @foreach ($number->coordinates as $coordinate)
                                                    <span class="ladel a2d"
                                                          data-left="{{ $coordinate->top->x }}"
                                                          data-top="{{ $coordinate->top->y }}"
                                                          title="{{ $number->name }}"
                                                          data-index="{{ $number->index ?? 0 }}"
                                                          style="position:absolute; padding:1px 5px;
                                                              left: {{ $coordinate->top->x }}px;
                                                              top: {{ $coordinate->top->y }}px;
                                                              min-width: {{ $coordinate->bottom->x - $coordinate->top->x }}px;
                                                              min-height: {{ $coordinate->bottom->y - $coordinate->top->y }}px;
                                                              line-height:  {{ $coordinate->bottom->y - $coordinate->top->y }}px;
                                                              font-size:  {{ $coordinate->bottom->y - $coordinate->top->y - 2 }}px;"
                                                    >{{ $number->index ?? 0 }}</span>
                                                @endforeach
                                            @endif
                                        @endforeach
                                    @endif
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            @if(isset($result->numbers) && count($result->numbers) > 0)
                <div class="p-25">
                    <div id="cat_box" class="box" style="margin-top: 15px">
                        <table class="cattable" style="width: 100%;">
                            <tr class="table-row bottom-line a2s-numbers_header">
                                <th class="table-cell">№</th>
                                <th class="table-cell">&nbsp;</th>
                                <th class="table-cell">Номер</th>
                                <th class="table-cell">Наименование</th>
                            </tr>
                            <tbody class="table-body">
                            {{--@dd($result->numbers)--}}
                            @foreach ($result->numbers as $index1 => $numberGroup)
                                @if(isset($numberGroup->parts))
                                    @foreach ($numberGroup->parts as $index2 => $number)
                                        @php $ind = $number->positionNumber ? $number->positionNumber : ($number->number ? $number->number : $number->description) @endphp
                                        <tr class="table-row bottom-line to-image" data-index="{{ $ind }}">
                                            <td class="table-cell">{{ $number->positionNumber }}</td>
                                            <td class="table-cell number-info-cell" data-number-info="{{ $index1.$index2 }}">
                                                @if ( (property_exists($number, 'description') && $number->description) || (property_exists($number, 'notice') && $number->notice) )
                                                    <div class="modal-number-info">
                                                        <span class="modal-number-info-close"></span>
                                                        <div class="number-info">
                                                            @if (property_exists($number, 'notice') && $number->notice)
                                                                <div class="number-info-params">
                                                                    {!! $number->notice !!}
                                                                </div>
                                                            @endif
                                                            @if (property_exists($number, 'description') && $number->description)
                                                                <div class="number-info-params">
                                                                    @php
                                                                        $d1 = preg_replace("/\:[\s]{0,2}\n/", ': ', $number->description);
                                                                        $d2 = str_replace("<", "(", $d1);
                                                                        $d3 = str_replace(">", ")", $d2);
                                                                        $d4 = str_replace("\n", "<br>", $d3);
                                                                    @endphp
                                                                    {!! $d4 !!}
                                                                </div>
                                                            @endif
                                                        </div>
                                                    </div>
                                                @endif
                                            </td>

                                            <td class="table-cell">{{ $number->number }}</td>
                                            <td class="table-cell">
                                                @if ($number->name)
                                                    {{ $number->name . ($numberGroup->name && $numberGroup->name !== $number->name && $numberGroup->name !== $result->breadcrumbs[5]->name ? ' ('.$numberGroup->name.')':'') }}
                                                @else
                                                    {{ $numberGroup->name }}
                                                @endif
                                            </td>
                                        </tr>
                                    @endforeach

                                @else
                                    {{--@dd($numberGroup)--}}
                                    <tr class="table-row bottom-line to-image" data-index="">
                                        <td class="table-cell">{{ $numberGroup->index ?? $numberGroup->number ?? 'noindex' }}</td>
                                        <td class="table-cell number-info-cell" >
                                            @if ( (property_exists($number, 'description') && $number->description) || (property_exists($number, 'notice') && $number->notice) )
                                                <input id='input' type="checkbox">
                                                <label for='input'></label>
                                                <div class="modal-number-info">
                                                    <span class="modal-number-info-close"></span>
                                                    <div class="number-info">
                                                        @if (property_exists($number, 'notice') && $number->notice)
                                                            <div class="number-info-params">
                                                                {{ $number->notice }}
                                                            </div>
                                                        @endif
                                                        @if (property_exists($number, 'description') && $number->description)
                                                            <div class="number-info-params">
                                                                @php
                                                                    $d1 = preg_replace("/\:[\s]{0,2}\n/", ': ', $number->description);
                                                                    $d2 = str_replace("<", "(", $d1);
                                                                    $d3 = str_replace(">", ")", $d2);
                                                                    $d4 = str_replace("\n", "<br>", $d3);
                                                                @endphp
                                                                {{ $d4 }}
                                                            </div>
                                                        @endif
                                                    </div>
                                                </div>
                                            @else
                                                {{--@dd($number)--}}
                                                {{ $numberGroup->modification ?? '' }}
                                            @endif
                                        </td>
                                        <td class="table-cell">{{ $numberGroup->number }}</td>
                                        <td class="table-cell">
                                            {{ $numberGroup->name }}
                                            {{--@if ($number->name)--}}
                                            {{--{{ $number->name . ($numberGroup->name && $numberGroup->name !== $number->name && $numberGroup->name !== $result->breadcrumbs[5]->name ? ' ('.$numberGroup->name.')':'') }}--}}
                                            {{--@else--}}
                                            {{--{{ $numberGroup->name }}--}}
                                            {{--@endif--}}
                                        </td>
                                    </tr>
                                @endif
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            @endif
        </div>
    </div>
@endsection