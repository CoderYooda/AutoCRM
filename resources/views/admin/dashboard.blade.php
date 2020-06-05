@extends($request['view_as'] == 'json' ? 'classic.layouts.XHR' : 'classic.layouts.main')

@section('content')
    @role('Суперадмин')
    фцв
    @endrole
@endsection

