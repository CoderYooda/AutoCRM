<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public static function selectTransactionDialog($request)
    {
        $class = 'selectTransactionDialog';
        $shipments = ShipmentsController::getShipments($request);
        $client_orders = ClientOrdersController::getClientOrders($request);

        $transactions = $shipments->merge($client_orders);

        return response()->json([
            'tag' => 'selectTransactionDialog',
            'html' => view(env('DEFAULT_THEME', 'classic') . '.transactions.dialog.select_transaction', compact('transactions', 'class', 'request'))->render()
        ]);
    }
}
