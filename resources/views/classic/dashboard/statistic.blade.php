@extends($request['view_as'] == 'json' ? env('DEFAULT_THEME', 'classic') . '.layouts.XHR' : env('DEFAULT_THEME', 'classic') . '.layouts.main')

@section('content')
   Статистика
@endsection

