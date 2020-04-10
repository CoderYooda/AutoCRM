<div class="row row-sm">
    <div class="col-sm-3 no-pr">
        @include(env('DEFAULT_THEME', 'classic') . '.category.modal_categories')
    </div>
    <div class="col-sm-9 no-pl">
        @if($ddsarticles->count() > 0)
            <div class="" data-simplebar style="max-height: 400px;">
                <div class="box-body">
                    <ul  class="nav select-list-modal ">
                        @foreach($ddsarticles as $ddsarticle)
                            <li id="ddsarticle_item_{{ $ddsarticle->id }}" onclick="try{window.{{$request['refer']}}.selectDdsarticle({{ $ddsarticle->id }})}catch (e) {}" class="pointer d-flex " >
                                <div class="ring-ico">
                                    <span class="first_letter"><i class="fa fa-newspaper-o" aria-hidden="true"></i></span>
                                </div>
                                <div class="list-title alone">
                                    {{ $ddsarticle->name }}
                                    <div class="secondary">{{ $ddsarticle->ddstype()->first()->name }}</div>
                                </div>
                                {{--<div class="list-body">--}}
                                {{--<div class="date">Дисконт: в разработке</div>--}}
                                {{--<div class="secondary">Тип: 2</div>--}}
                                {{--</div>--}}
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        @elseif($request && $request['string'] != null)
            <div class="padding text-center">
                <div>
                    <div class="out_of_search"></div>
                    <div class="mb-15">
                        Статей по запросу <b>{{ $request['string'] }}</b> не найдено
                    </div>

                </div>
                <button onclick="openDialog('ddsarticleDialog')" class="button success mb-15">Новая статья</button>
            </div>
        @else
            <div class="padding text-center">
                <div>
                    <div class="out_of_search"></div>
                    <div class="mb-15">
                        Статей в этой категории нет
                    </div>
                </div>
                <button onclick="openDialog('ddsarticleDialog')" class="button success mb-15">Новая статья</button>
            </div>
        @endif
    </div>
</div>
