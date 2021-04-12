<button onclick="window.location.href='/store?active_tab=catalogue'">Назад</button>
<div id="cat_box" class="">
    <div class="cat_item_container">
        @foreach($models as $model)
            <div onclick="store.model.getModifications({{$model->id}})" class="box model_item">
                <img src="{{ $model->image ?? asset('images/no_image.png') }}" alt="">
                {{ $model->name }}
            </div>
        @endforeach
    </div>
</div>
