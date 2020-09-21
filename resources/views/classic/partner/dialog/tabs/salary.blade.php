
<div class="form-group fl ip ul">




        <label>Зарплатные настройки</label>
        <div>

        </div>
        <div data-simplebar style="max-height: 400px">
            <div class="schema_stored">
                @if($partner)
                    @foreach($partner->salarySchemas as $index => $schema)
                        @include(get_template() . '.partner.dialog.tabs.includes.salary_schema')
                    @endforeach
                @endif
            </div>
        </div>
        <button type="button" class="button mt-10" onclick="window.{{ $class }}.openSalarySchemaModal()">Добавить настройку</button>

</div>
