<div id="{{ $class }}" class="dialog category_dialog" style="width:380px;">
    @if(isset($category))
        <div class="titlebar">Редактирование "{{ $category->name }}"</div>
    @else
        <div class="titlebar">Новая категория</div>
    @endif
    <button class="btn_minus" onclick="window.alerts.hideDialog('{{ $class }}')">_</button>
    <button class="btn_close" onclick="window.{{ $class }}.finitaLaComedia()">×</button>
    <form action="{{ route('StoreCategory') }}" method="post">
        <div class="">
            <div class="box-body">
                @csrf
                    <input class="category_select" type="hidden" name="category_id" value="@if(isset($parent)){{ $parent->id }}@elseif(isset($category)){{ $category->category_id }}@else 2 @endif">
                @if(isset($category))
                    <input type="hidden" name="id" value="{{ $category->id }}">
                @endif
                <div class="form-group">
                    <label for="category_id">В категории</label>
                    <div class="input-group mb-3">
                        <button onclick="{{ $class }}.openSelectCategoryDialog(@if(isset($parent)){{ $parent->id }}@elseif(isset($category)){{ $category->id }}@endif)" type="button" name="category_id" class="category_select form-control text-left button_select">
                            @if(isset($parent))
                                {{ $parent->name }}
                            @elseif(isset($category))
                                {{ $category->parent()->first()->name }}
                            @endif
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="category_id">Наименование</label>
                    <input type="text" id="category_dialog_focused" value="{{ $category->name ?? '' }}" name="name" class="form-control" placeholder="Наименование (не более 255 символов)" autofocus>
                </div>
                <div class="form-group mb-0">
                    <label class="mb-5">Основное фото</label>
                    <div style="width: 110px; height: 110px;">
                        <img class="h-100 w-100 image" src="{{ $category->image_path ?? asset('/images/product-placeholder.svg') }}" />
                    </div>
                    <label class="upload_file pointer" for="shop[image]">Выберите файл<div></div></label>
                    <input type="file" id="shop[image]" onchange="{{ $class }}.changeFile(this);" accept="image/jpeg,image/png,image/gif" hidden/>
                    <input type="hidden" name="image_id" value="{{ $product->image->id ?? null }}" />
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="button white" onclick="window.{{ $class }}.finitaLaComedia()">Закрыть</button>
            <button class="button primary pull-right" onclick="{{$class}}.save(this)">Сохранить</button>
        </div>
        <div class="system_message">
        </div>
    </form>
</div>
