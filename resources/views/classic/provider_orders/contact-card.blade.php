<div><span style="font-weight: 500;">ID заявки: </span>{{ $providerorder->id }}</div>
<div><span style="font-weight: 500;">Дата оформления: </span>{{ $providerorder->created_at->format('m.d.Y') }}</div>
<div><span style="font-weight: 500;">Сумма заявки: </span>{{ $providerorder->itogo }} р.</div>
<div><span style="font-weight: 500;">Поставщик: </span>{{ $providerorder->partner()->first()->outputName() }}</div>
<div><span style="font-weight: 500;">Телефон поставщика: </span>{{ $providerorder->partner()->first()->firstActivePhoneNumber() }}</div>
<hr>
<div><span style="font-weight: 500;">Ответственный: </span>{{ $providerorder->manager()->first()->outputName() }}</div>
<div><span style="font-weight: 500;">Телефон ответственного: </span>{{ $providerorder->manager()->first()->firstActivePhoneNumber() }}</div>
{{--<div><i class="fa fa-phone muted-icon pr-8" aria-hidden="true"></i>{{ $partner->firstActivePhoneNumber() }}</div>--}}
