<div id="{{ $class }}" class="dialog form_price_dialog" style="width:600px;">
    @if(isset($product) && $product->id != NULL)
        <div class="titlebar">Редактирование ценообразования '{{ $price->name }}'</div>
    @else
        <div class="titlebar">Добавление ценообразования</div>
    @endif

    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>

    <form action="{{ route('StorePrice') }}" method="POST">

        @csrf

        <div class="m-15">

            <div class="form-group">
                <label>Название:</label>
                <div class="input-group">
                    <input type="text" name="name" />
                </div>
            </div>

            <div class="form-group">

                <label>Типы:</label>

                <table class="table">

                    <thead>
                        <th>От (руб.)</th>
                        <th>До (руб.)</th>
                        <th>Наценка (%)</th>
                    </thead>

                    <tbody>

                        <tr>
                            <td>
                                <input type="number" name="prices[from][0]" placeholder="0" />
                            </td>
                            <td>
                                <input type="number" name="prices[to][0]" placeholder="1000" />
                            </td>
                            <td>
                                <input type="number" name="prices[percent][0]" placeholder="100" />
                            </td>
                        </tr>

                    </tbody>

                </table>

                <div class="form-group mt-10">
                    <button class="button primary w-100" type="button">Добавить диапазон</button>
                </div>

            </div>

        </div>

        <div class="modal-footer">
            <button type="submit" onclick="{{ $class }}.finitaLaComedia()" class="button white">Закрыть</button>
            <button type="submit" onclick="{{ $class }}.save(this)" class="button primary pull-right">Сохранить</button>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
