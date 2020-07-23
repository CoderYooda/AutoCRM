<div id="barcodeDialog" class="dialog warrant_dialog" style="width:500px;">
    <div class="titlebar">Операция сканирования</div>
    <button class="btn_minus" onclick="window.alerts.hideDialog('barcodeDialog')">_</button>
    <button class="btn_close" onclick="window.barcodeDialog.finitaLaComedia()">×</button>


    <div class="form-group p-3 white mb-0 b-b-accent">
        <img style="width: 100%" src="data:image/png;base64,{!! \App\Http\Controllers\BarcodeController::getBarCodePNG($request['upc']) !!}" alt="barcode"   />
        <span>{{ $request['upc'] }}</span>
    </div>

    <div class="white">
        <h4 class="pl-3 pr-3">Товары</h4>
        <div class="list box mb-0">
            @foreach($articles as $article)
                <div class="list-item " data-id="item-5">
                    <i class="fa fa-cogs" style="font-size: 22px;"></i>
                    <div class="w-280 list-body b-r pr-2" style="max-height: 38px;overflow: hidden;flex: 2;">
                        <a onclick="openDialog('productDialog', '&product_id={{ $article->id }}' )" class="item-title _500" >{{ $article->name }}</a>
                    </div>
                    <div class="list-body">
                        <div class="item-except text-sm text-muted h-1x">
                            <span class="badge badge-pill primary">Арт</span> {{ $article->article }}
                        </div>
                        <div class="item-except text-sm text-muted h-1x">
                            <span class="badge badge-pill primary">Произв.</span> {{ $article->supplier->name }}
                        </div>
                    </div>
                    @if($request['refer'] != null)
                        <button onclick="{{$request['refer']}}.addProduct({{ $product->id }})" class="btn btn-icon white float-right">
                            <i class="fa fa-plus"></i>
                        </button>
                    @else

                    @endif

                </div>
            @endforeach
        </div>
    </div>

</div>
