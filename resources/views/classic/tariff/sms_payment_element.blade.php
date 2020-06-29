<div class="flex-1 p-id">{{ $payment->id }}</div>
<div class="flex-1 p-amount">{{ $payment->getAmount() }}</div>
<div class="flex-2 p-partner">{{ $payment->partner->outputName() }}</div>
<div class="flex-2 p-idn">{{ $payment->paymentId }}</div>
<div class="flex-1 p-status">{{ $payment->getStatus() }}</div>
<div class="flex-1 p-data">{{ $payment->getDate() }}</div>
<div class="flex-1 p-data"></div>
