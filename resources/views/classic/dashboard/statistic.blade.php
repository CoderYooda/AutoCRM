@extends($request['view_as'] == 'json' ? get_template() . '.layouts.XHR' : get_template() . '.layouts.main')

@section('content')
   Статистика
@endsection

