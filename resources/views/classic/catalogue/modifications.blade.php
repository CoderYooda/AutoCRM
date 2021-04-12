<button onclick="store.model.getModels({{ $model->mark()->first()->id }})">Назад</button>
<div id="cat_box" class="">
    @foreach($modifications as $modification)
        <div class="box modification_item">
            <div class="text">{{ $modification->name }}</div>
            <div class="text">{{ $modification->region }}</div>
            <div class="text">{{ $modification->year }}</div>
            <div class="text">{{ $modification->description }}</div>
        </div>
    @endforeach
    {{ $modifications->links() }}
</div>
