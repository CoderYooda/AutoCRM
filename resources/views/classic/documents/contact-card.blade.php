<div>Документ № {{ $document->id }}</div>
<div>Штрихкод</div>
<div>
    <img class="w-100" src="data:image/png;base64,{!! getBarCodePNG($document->barcode) !!}" alt="barcode" />
</div>
<div style="font-weight: 500;">{{ $document->manager->fio }}</div>
<div><i class="fa fa-phone muted-icon pr-8" aria-hidden="true"></i>{{ $document->manager->firstActivePhoneNumber() }}</div>
