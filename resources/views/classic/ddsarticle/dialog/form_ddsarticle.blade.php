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
        <div class="box-body">
            @if(isset($ddsarticle) && $ddsarticle->id != NULL)
                <input type="hidden" name="id" value="{{ $ddsarticle->id }}">
            @endif
            <input class="category_select" type="hidden" name="category_id" value="@if(isset($ddsarticle)){{ $ddsarticle->category()->first()->id }}@else 4 @endif">

            <div class="form-group">
                <label for="category_id">В категории</label>
                <div class="input-group mb-3">
                    <button onclick="{{ $class }}.openSelectCategoryDialog(@if(isset($ddsarticle)){{ $ddsarticle->category_id }}@elseif(isset($category)){{ $category->id }}@endif)" type="button" name="category_id" class="category_select form-control text-left button_select">
                        @if(isset($parent))
                            {{ $parent->name }}
                        @elseif(isset($category))
                            {{ $category->name }}
                        @endif
                    </button>
                </div>
            </div>

            <div class="form-group">
                <label>Вид статьи</label>
                <select name="dds_types_id" class="form-control input-c">
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
        <div class="modal-footer">
            <button class="button white" onclick="closeDialog(event)">Закрыть</button>
            <button class="button pull-right" onclick="window.{{ $class }}.save(this)">Сохранить</button>
        </div>
        <div class="system_message"></div>
    </form>
</div>
