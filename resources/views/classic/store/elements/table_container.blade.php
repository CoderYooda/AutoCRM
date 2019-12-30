@php $articles = \App\Http\Controllers\ProductController::getArticles($request) @endphp
@php $category = \App\Http\Controllers\CategoryController::getCategory($request, 2) @endphp
{{--{{ dd($category) }}--}}
{{--style="height: 100%;"--}}

<div class="content-menu box w-290">
    <div class="box-header">
        <a class="category-back-button" href="">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
            <span>Ходовая часть</span>
        </a>
    </div>
    <div class="box-content">
        <ul class="nav">
            <li>
                <a href="">
                    <i class="fa fa-folder-o" aria-hidden="true"></i>
                    <span>База товаров</span>
                </a>
            </li>
            <li>
                <a href="">
                    <i class="fa fa-folder-o" aria-hidden="true"></i>
                    <span>База товаров</span>
                </a>
            </li>
            <li>
                <a href="">
                    <i class="fa fa-folder-o" aria-hidden="true"></i>
                    <span>База товаров</span>
                </a>
            </li>
            <li>
                <a href="">
                    <i class="fa fa-folder-o" aria-hidden="true"></i>
                    <span>База товаров</span>
                </a>
            </li>
            <li>
                <a href="">
                    <i class="fa fa-folder-o" aria-hidden="true"></i>
                    <span>База товаров</span>
                </a>
            </li>
        </ul>
    </div>
</div>
<div class="box-lister box">
    <div class="box-header">
        <ol class="breadcrumb nav m-0">
            <li class="breadcrumb-item">
                <a class="ajax-nav" href="#">Номенклатуры</a>
            </li>
            <li class="breadcrumb-item">
                <a class="ajax-nav" href="#">Двигатель</a>
            </li>
            <li class="breadcrumb-item">
                <span>Система выпуска отработанных газов</span>
            </li>
        </ol>
    </div>
    <div id="store-table-container" class="box-content">
        <div id="store-table" ></div>
    </div>
</div>
