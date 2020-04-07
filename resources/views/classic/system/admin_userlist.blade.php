@foreach($users as $user)
    <a class="element" onclick="system.authByUser({{ $user->id }})">
        ID{{ $user->id }} {{ $user->name }} {{ $user->company()->first()->name }}
    </a>
@endforeach
