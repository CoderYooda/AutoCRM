<div
    @if(isset($ddsarticle) && $ddsarticle->id != NULL)
        @php $class = 'ddsarticleDialog' . $ddsarticle->id @endphp
        id="ddsarticleDialog{{$ddsarticle->id}}"
    @else
        @php $class = 'ddsarticleDialog' @endphp
        id="ddsarticleDialog"
    @endif
    class="dialog" style="width:300px;">
    @if(isset($ddsarticle) && $ddsarticle->id != NULL)
        <div class="titlebar">Редактирование '{{ $ddsarticle->name }}'</div>
    @else
        <div class="titlebar">Добавление статьи</div>
    @endif

    <button class="btn_close" onclick="closeDialog(event)">×</button>
    <form action="{{ route('StoreDdsarticle') }}" method="POST">
        @csrf
        <div class="box mb-0">
            <div class="box-body">
                @if(isset($ddsarticle) && $ddsarticle->id != NULL)
                    <input type="hidden" name="id" value="{{ $ddsarticle->id }}">
                @endif
                <input class="category_select" type="hidden" name="category_id" value="@if(isset($ddsarticle)){{ $ddsarticle->category()->first()->id }}@else 4 @endif">
                <div class="no-gutters align-items-stretch">
                    <div class="form-group">
                        <label for="category_id">В категории</label>
                        <div class="input-group mb-3">
                            <select custom_select name="category_id" disabled class="category_select form-control input-c noarrow fake-disabled" readonly>
                                @if(isset($category))
                                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                                @elseif(isset($Ddsarticle))
                                    <option value="{{ $ddsarticle->category()->first()->id }}">{{ $ddsarticle->category()->first()->name }}</option>
                                @else
                                    <option>Корневая директория</option>
                                @endif
                            </select>
                            <div class="input-group-append">
                                <button onclick="openDialog('selectCategory', @if(isset($ddsarticle))'&selected_category_id={{ $ddsarticle->category_id }}'@else'&selected_category_id=4'@endif);"
                                        class="btn white" type="button"><i class="fa fa-bars"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Вид статьи</label>
                        <select custom_select name="dds_types_id" class="form-control input-c">
                            @foreach($ddstypes as $ddstype)
                            <option value="{{ $ddstype->id }}" @if(isset($ddsarticle) && $ddsarticle->dds_types_id == $ddstype->id) selected @endif>{{ $ddstype->name }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group mb-0">
                        <label for="category_id">Название</label>
                        <input type="text"
                               @if(isset($ddsarticle))
                               value="{{ $ddsarticle->name }}"
                               @endif
                               name="name" class="form-control" placeholder="Наименование (не более 255 символов)" autofocus>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn success" onclick="window.{{ $class }}.save(this)">Сохранить</button>
        </div>
        <div class="system_message"></div>
    </form>
</div>
