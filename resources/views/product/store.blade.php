{{--@extends('product.layout.tabs')--}}

@extends($request['view_as'] == 'json' && $request['target'] == 'ajax-tab-content' ? 'layouts.TabXHR' : 'product.layout.tabs')

@section('tab')
<div class="d-flex flex-column flex" id="user-list">
    <div class="navbar white no-radius box-shadow pos-rlt">
        <form class="flex">
            <div class="input-group">
                <input type="text" class="form-control form-control-sm search" placeholder="Search" required="">
                <span class="input-group-append">
                    <button class="btn btn-default btn-sm no-shadow" type="button"><i class="fa fa-search"></i></button>
                </span>
            </div>
        </form>
        <span class="m-b btn-groups pl-1">
            <button class="btn btn-sm success mb-0">Новая категория</button>
            <button class="btn btn-sm success mb-0">Новый товар</button>
        </span>
    </div>
    <div class="d-flex flex scroll-y">
        <div class="d-flex flex-column flex white lt">
            <div class="box">
                <div class="box-header">
                    <h2>Striped rows</h2>
                    <small>
                        Use .table-striped to add zebra-striping to any table row within the &lt;tbody>.
                    </small>
                </div>
                <table class="table table-striped b-t">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="d-flex flex-column b-l" style="width: 50px">
            <div class="scrollable hover">
                <div class="text-center text-sm py-3 d-flex flex-column" id="filter">
                    <a href="#">A</a>
                    <a href="#">B</a>
                    <a href="#">C</a>
                    <a href="#">D</a>
                    <a href="#">E</a>
                    <a href="#">F</a>
                    <a href="#">G</a>
                    <a href="#">H</a>
                    <a href="#">I</a>
                    <a href="#">J</a>
                    <a href="#">K</a>
                    <a href="#">L</a>
                    <a href="#">M</a>
                    <a href="#">N</a>
                    <a href="#">O</a>
                    <a href="#">P</a>
                    <a href="#">Q</a>
                    <a href="#">R</a>
                    <a href="#">S</a>
                    <a href="#">T</a>
                    <a href="#">U</a>
                    <a href="#">V</a>
                    <a href="#">W</a>
                    <a href="#">X</a>
                    <a href="#">Y</a>
                    <a href="#">Z</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

