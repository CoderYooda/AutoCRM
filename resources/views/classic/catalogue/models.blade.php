@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'classic.layouts.metaXHR' : 'classic.catalogue.index')

@section('meta')

    <div style="overflow: auto" class="box-lister catalogue">
        <div id="ajax-table-store" class="">
            <div id="cat_box" class="">
                <div class="cat_item_container">
                    @foreach($models as $model)
                        <a href="{{ route('CatalogueModifications', ['type' => $type, 'mark' => $mark, 'model' => $model->model]) }}">
                            <div onclick="store.model.getModifications({{$model->id}})" class="box model_item">
                                <img src="{{ $model->image ?? asset('images/no_image.png') }}" alt="">
                                {{ $model->name }}
                            </div>
                        </a>
                    @endforeach
                </div>
            </div>
        </div>
    </div>

@endsection
