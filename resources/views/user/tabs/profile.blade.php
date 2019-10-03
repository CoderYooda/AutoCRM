@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'layouts.TabXHR' : 'user.index')
@php $user = \App\Http\Controllers\UserController::getUser($request) @endphp
@section('tab')
    <div class="row mb-2">
        <div class="col-6">
            <div class="row mb-2">
                <div class="col-6">
                    <small class="text-muted">Категория</small>
                    <div class="_500">{{ $user->category()->first()->name }}</div>
                </div>
                <div class="col-6">
                    <small class="text-muted">Номера телефонов</small>
                    @forelse($user->phones()->get() as $phone)
                        <div class="_500">{{ $phone->phone }}</div>
                    @empty
                        <div class="_500">Телефоны не указаны</div>
                    @endforelse
                </div>
                <div class="col-6">
                    <small class="text-muted">Дата рождения</small>
                    <div class="_500">{{ $user->birthday }}</div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="padding">
                <h5 class="_600">
                    <span>{{ $user->balance }}</span>
                </h5>
                <div class="text-muted mb-4">Баланс</div>
                <div class="py-3 b-b">
                    <span class="float-right text-md text-primary">45 <i class="fa fa-caret-up"></i></span>
                    <span class="_600 d-block">542</span>
                    <small class="text-muted">Продажи</small>
                </div>
                <div class="py-3">
                    <span class="float-right text-md text-warning">25 <i class="fa fa-caret-down"></i></span>
                    <span class="_600 d-block">235</span>
                    <small class="text-muted">Заказы</small>
                </div>
            </div>
        </div>
    </div>
@endsection