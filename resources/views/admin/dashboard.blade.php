@extends($request['view_as'] == 'json' ? 'classic.layouts.XHR' : 'classic.layouts.main')

@section('content')
    @can('Суперадмин')
        <div class="box-lister box">
            <div class="row">
                <div class="col-sm-6">
                    <div class="p-15">
                        <div class="form-group row">
                            <div for="partner_id" class="col-sm-3 no-pr col-form-label">
                                <select class="form-control text-left button_select" name="message_to" id="message_to">
                                    @foreach(\App\Http\Controllers\DashboardController::getAllUsers() as $user)
                                        <option value="{{ $user->id }}">ID_{{ $user->id }} {{ $user->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-sm-6 no-pr">
                                <textarea class="form-control" name="" id="message" cols="30" rows="10"></textarea>
                            </div>
                            <div class="col-sm-3">
                                <button class="button primary">Отправить</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">Empty</div>
            </div>
        </div>
    @else
        Шпион, уходи!
    @endcan
@endsection

