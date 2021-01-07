<form id="provider_order_form" action="">

    <input type="hidden" name="providerorder_id" value="{{ $providerorder->id }}">
    <div data-simplebar style="max-height: 400px;">
        @foreach($providerorder->products()->get() as $article)
            @php $count = $article->pivot->count - $providerorder->getArticleEntredCount($article->id) @endphp
            <div class="providerorder_article_elem list-item inblocked mini-list-element pointer" data-id="{{  $article->id }}">
                <div class="inblock">

                    {{--<i class="fa fa-cog" style="font-size: 16px;"></i>--}}
                    <div class="w-200 list-body b-r pr-2 compressed" style="max-height: 38px;overflow: hidden;flex: 2;">
                        <label class="md-check h-20 pr-2">
                            <input class="checked_field" id="article_provider_order_{{ $article->id }}" name="products[{{  $article->id }}][iclude]" type="checkbox" @if($count <= 0) @else checked @endif>
                            <i class="success"></i>
                        </label>
                        <span class="item-title _500" >
                            {{ $article->name }}
                        </span>
                    </div>
                    <div class="w-200 list-body b-r pr-2" style="flex: 0;">
                        <div class="item-title _500" style="width:100px;">
                            {{ $article->article }}
                        </div>
                    </div>
                    <div class="w-200 list-body b-r pr-2" style="flex: 0;">
                        <div class="item-title _500 compressed" style="width:100px;">
                            {{ $article->supplier()->first()->name }}
                        </div>
                    </div>
                    <div class="list-body" style="margin-top: -5px;margin-bottom: -5px; flex: 0;">
                        <input class="form-control form-control-sm count_item" style="width: 75px" type="number" step="1" name="products[{{  $article->id }}][count]" value="{{ $count }}">
                        {{--<div class="item-except text-sm text-muted h-1x" style="width: 100px!important; text-align: center">--}}
                           {{----}}
                        {{--</div>--}}
                    </div>
                    <div class="list-body"  style="flex: 0;">
                        <div class="item-except text-sm text-muted h-1x" style="width: 100px!important; text-align: center">
                           {{ $article->pivot->price }} р.\ед.
                        </div>
                    </div>
                    {{--@if($request['refer'] != null)--}}
                    {{--<button data-article_id="{{ $providerorder->id }}"  onclick="{{$request['refer']}}.selectProviderOrder({{ $providerorder->id }});" class="btn btn-icon white float-right select_btn">--}}
                    {{--<i class="not_selected fa fa-plus"></i>--}}
                    {{--<i class="selected fa fa-check"></i>--}}
                    {{--</button>--}}
                    {{--@endif--}}
                </div>
            </div>
        @endforeach
    </div>
</form>
