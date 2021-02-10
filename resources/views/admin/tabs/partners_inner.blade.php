@foreach($partners as $partner)
    <div class="box p-15">
        <label for="">Партнёр: </label>
        {{ $partner->referal->name }} |
    </div>
@endforeach
