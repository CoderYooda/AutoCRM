<div
    @if(isset($Ddsarticle) && $Ddsarticle->id != NULL)
        id="editDdsarticle{{$Ddsarticle->id}}"
    @else
        id="createDdsarticle"
    @endif
    class="dialog" style="width:500px;">
    @if(isset($Ddsarticle) && $Ddsarticle->id != NULL)
        <div class="titlebar">Редактирование '{{ $Ddsarticle->name }}'</div>
    @else
        <div class="titlebar">Добавление статьи ддс</div>
    @endif

    <button class="btn_close" onclick="closeDialog(event)">×</button>
    <form action="{{ route('StoreDdsarticle') }}" method="POST">
        @csrf
        <div class="box mb-0">
            <div class="box-body">
                @if(isset($Ddsarticle) && $Ddsarticle->id != NULL)
                    <input type="hidden" name="id" value="{{ $Ddsarticle->id }}">
                @endif
                <input class="category_select" type="hidden" name="category_id" value="@if(isset($Ddsarticle)){{ $Ddsarticle->category()->first()->id }}@else 4 @endif">
                <div class="no-gutters align-items-stretch">
                    <div class="form-group">
                        <label for="category_id">В категории</label>
                        <div class="input-group mb-3">
                            <select name="category_id" disabled class="category_select form-control input-c noarrow fake-disabled" readonly>
                                @if(isset($category))
                                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                                @elseif(isset($Ddsarticle))
                                    <option value="{{ $Ddsarticle->category()->first()->id }}">{{ $Ddsarticle->category()->first()->name }}</option>
                                @else
                                    <option>Корневая директория</option>
                                @endif
                            </select>
                            <div class="input-group-append">
                                <button onclick="openDialog('selectCategory', @if(isset($Ddsarticle))'&selected_category_id={{ $Ddsarticle->category_id }}'@else'&selected_category_id=4'@endif);"
                                        class="btn white" type="button"><i class="fa fa-bars"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Вид статьи</label>
                        <select name="dds_types_id" class="form-control input-c">
                            @foreach($ddstypes as $ddstype)
                            <option value="{{ $ddstype->id }}" @if(isset($Ddsarticle) && $Ddsarticle->dds_types_id == $ddstype->id) selected @endif>{{ $ddstype->name }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group mb-0">
                        <label for="category_id">Название</label>
                        <input type="text"
                               @if(isset($Ddsarticle))
                               value="{{ $Ddsarticle->name }}"
                               @endif
                               name="name" class="form-control" placeholder="Наименование (не более 255 символов)" autofocus>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn success" onclick="axform.send(this)">Сохранить</button>
        </div>
        <div class="system_message"></div>
    </form>
</div>
