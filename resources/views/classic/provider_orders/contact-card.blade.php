<div class="d-flex">

    <div class="flex-1">

        <div class="mb-15">
            <div><span style="font-weight: 500;">ID заявки: </span></div>
            <div><span style="font-weight: 500;">Дата оформления: </span></div>
            <div><span style="font-weight: 500;">Сумма заявки: </span></div>
        </div>

        <div class="mb-15">
            <div><span style="font-weight: 500;">Поставщик: </span></div>
            <div><span style="font-weight: 500;">Телефон поставщика: </span></div>
        </div>

        <div class="mb-15">
            <div><span style="font-weight: 500;">Ответственный: </span></div>
            <div><span style="font-weight: 500;">Телефон ответственного: </span></div>
        </div>

    </div>

    <div class="flex-1">

        <div class="mb-15">
            <div>{{ $providerorder->id }}</div>
            <div>{{ $providerorder->created_at }}</div>
            <div>{{ $providerorder->itogo }} р.</div>
        </div>

        <div class="mb-15">
            <div>{{ $providerorder->partner->outputName() }}</div>
            <div>{{ $providerorder->partner->firstActivePhoneNumber() }}</div>
        </div>

        <div class="mb-15">
            <div>{{ $providerorder->manager->outputName() }}</div>
            <div>{{ $providerorder->manager->firstActivePhoneNumber() }}</div>
        </div>

    </div>

</div>

{{--<div>--}}
{{--    <div><span style="font-weight: 500;">ID заявки: </span>{{ $providerorder->id }}</div>--}}
{{--    <div><span style="font-weight: 500;">Дата оформления: </span>{{ $providerorder->created_at->format('m.d.Y') }}</div>--}}
{{--    <div><span style="font-weight: 500;">Сумма заявки: </span>{{ $providerorder->itogo }} р.</div>--}}
{{--</div>--}}

{{--<div class="mt-15">--}}
{{--    <div><span style="font-weight: 500;">Поставщик: </span>{{ $providerorder->partner()->first()->outputName() }}</div>--}}
{{--    <div><span style="font-weight: 500;">Телефон поставщика: </span>{{ $providerorder->partner()->first()->firstActivePhoneNumber() }}</div>--}}
{{--</div>--}}

{{--<div class="mt-15" style="margin-bottom: 30px;">--}}
{{--    <div><span style="font-weight: 500;">Ответственный: </span>{{ $providerorder->manager()->first()->outputName() }}</div>--}}
{{--    <div><span style="font-weight: 500;">Телефон ответственного: </span>{{ $providerorder->manager()->first()->firstActivePhoneNumber() }}</div>--}}
{{--</div>--}}
