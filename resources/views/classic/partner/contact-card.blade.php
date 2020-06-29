<div>ID контакта {{ $request['id'] }}</div>
<div style="font-weight: 500;">{{ $partner->outputName() }}</div>
<div><i class="fa fa-phone muted-icon pr-8" aria-hidden="true"></i>{{ $partner->firstActivePhoneNumber() }}</div>
