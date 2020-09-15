<?php

namespace App\Http\Controllers\Admin;

use App\Events\SystemMessage;
use App\Http\Requests\Admin\Users\UpdateRequest;
use App\Models\SystemMessage as SM;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public static function dialog(Request $request)
    {
        $user = User::find($request->user_id);

        $class = 'userDialog' . ($user->id ?? '');

        $view = view('admin.dialogs.form_user', compact('request', 'class', 'user'));

        return response()->json([
            'tag'  => $class,
            'html' => $view->render(),
            'user' => $user
        ]);
    }

    public static function tableData(Request $request)
    {
        $users = User::when(strlen($request->search), function (Builder $q) use ($request) {
            $q->where('id', 'like', "%{$request->search}%")
                ->orWhere('name', 'like', "%{$request->search}%")
                ->orWhere('phone', 'like', "%{$request->search}%");
        })
            ->when($request->has('company_id'), function (Builder $query) use ($request) {
                $query->where('company_id', $request->company_id);
            })
            ->paginate($request->size);

        return response()->json([
            'data' => $users
        ]);
    }

    public function update(UpdateRequest $request, User $user)
    {
        $params = [];

        if (strlen($request['password'])) $params['password'] = bcrypt($request->password);
        $params['banned_at'] = $request->has('banned_at') ? Carbon::now() : null;

        $user->update($params);

        return response()->json([
            'type'    => 'success',
            'message' => 'Пользователь успешно сохранен.'
        ]);
    }

    public function sendSystemMessageTo(Request $request)
    {
        $system_message = SM::create([
            'user_id'     => 1,
            'reciever_id' => $request->user_id,
            'type'        => 'test',
            'message'     => $request->message
        ]);

        event(new SystemMessage($system_message));

        return response()->json([
            'type'    => 'success',
            'message' => 'Сообщение отправлено'
        ]);
    }
}
