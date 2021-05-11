<div id="{{ $class }}" class="dialog form_price_dialog" style="width:600px;">
    <div class="titlebar">{{ $price ? ("Редактирование наценки '" . $price->name . "'") : ('Добавление наценки') }}</div>

    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>

    <form action="{{ route('StorePrice') }}" method="POST">

        @isset($price)
            <input type="hidden" name="price_id" value="{{ $price->id }}">
        @endisset

        @csrf

        <div class="m-15">

            <div class="form-group">
                <label>Название:</label>
                <div class="input-group">
                    <input type="text" name="name" placeholder="Розничная" value="{{ $price->name ?? '' }}" />
                </div>
            </div>

            <div class="form-group">

                <label>Диапазоны:</label>

                <div class="table">

                    <div class="header">
                        <div class="field">
                            <span>От (руб.)</span>
                        </div>
                        <div class="field">
                            <span>До (руб.)</span>
                        </div>
                        <div class="field">
                            <span>Наценка (%)</span>
                        </div>
                    </div>

                    <div class="body">

                        @forelse($types as $index => $type)

                            <div class="position">
                                <div class="field">
                                    <input type="number" name="prices[{{ $index }}][from]" placeholder="0" value="{{ $type['from'] }}" />
                                </div>
                                <div class="field">
                                    <input type="number" name="prices[{{ $index }}][to]" placeholder="1000" value="{{ $type['to'] }}" />
                                </div>
                                <div class="field">
                                    <input type="number" name="prices[{{ $index }}][percent]" placeholder="100" value="{{ $type['percent'] }}" />
                                </div>
                                <div class="delete_button" onclick="{{ $class }}.removeField(this);"></div>
                            </div>

                        @empty

                                <div class="position">
                                    <div class="field">
                                        <input type="number" name="prices[0][from]" placeholder="0" />
                                    </div>
                                    <div class="field">
                                        <input type="number" name="prices[0][to]" placeholder="1000" />
                                    </div>
                                    <div class="field">
                                        <input type="number" name="prices[0][percent]" placeholder="100" />
                                    </div>
                                    <div class="delete_button" onclick="{{ $class }}.removeField(this);"></div>
                                </div>

                        @endforelse

                    </div>

                </div>

                <div class="form-group info mt-10">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    <span class="info-hover">Если цена товара не попадает в какой-либо диапазон, то будет использоваться последний.</span>
                </div>

                <div class="form-group mt-10">
                    <button class="button primary w-100" type="button" onclick="{{ $class }}.addField(this);">Добавить диапазон</button>
                </div>

            </div>

        </div>

        <div class="modal-footer">
            <button type="submit" onclick="{{ $class }}.finitaLaComedia()" class="button white">Закрыть</button>
            <button type="submit" onclick="{{ $class }}.saveAndClose(this)" class="button primary pull-right">Сохранить</button>
        </div>
        <div class="system_message">

        </div>
    </form>
</div>
