class Table {

    constructor(options){
        this.elem = document.getElementById(options.container);
        this.data = options.data;
        this.url = options.url;
        this.header = options.header;
        this.start_sort = options.start_sort;
        this.row_dblclick = options.row_dblclick;
        this.context_menu = options.context_menu;
        this.sorters = {};
        this.contexted = null;
        this.context_top = 0;
        this.body_scroll = 0;
        this.isSelectable = true;
        this.bodyContainer;
        this.last_selected = null;






        this.request = {};
        //dd(this.data);
    }

    setHeader(header){
        this.header = header;
        this.header.forEach((elem) =>{
            this.sorters[elem.table_name] = {
                field: elem.table_name,
                dir: this.start_sort,
                active: false
            }
        });
        return true;
    }
    setContextMenu(context_menu){
        this.context_menu = context_menu;
        return true;
    }
    setBblClick(row_dblclick){
        this.row_dblclick = row_dblclick;
        return true;
    }

    draw(elem = null, data = null){
        if(elem){
            this.elem = document.getElementById(elem);
        }
        if(data){
            this.data = data;
        }
        if(this.elem){
            this.elem.innerHTML = '';
            this.elem.style.height = '100%';
            this.total_height = this.elem.clientHeight;
            let container = document.createElement('div');
            container.className = 'bbtable-container';
            container.appendChild(this.drawHeader());
            let body = this.drawBody();
            container.appendChild(body);
            body.addEventListener('mouseleave', (e) => {
                this.elem.querySelector('.hover').style.top = '-60px';
            });
            body.style.height = this.total_height - 70 + 'px';
            container.appendChild(this.drawHover());
            container.appendChild(this.drawContext());
            container.appendChild(this.drawPaginator());
            this.elem.appendChild(container);
            this.insertElems();


            document.addEventListener('click', (e) => {
                let element = e.target;
                let close = true;
                do {
                    if (element.classList && element.classList.contains('context')) {
                        close = false;
                    }
                    element = element.parentNode;
                } while (element);
                if(close){
                    this.elem.querySelector('#context').style.left = '-300px';
                }

            });
        } else {
            console.log("Не указан контейнер");
        }
    }

    setRequest(key, value){
        this.request[key] = value;
        this.freshData();
    }

    freshData(){
        let object = this;
        window.axios({
            method: 'post',
            url: this.url,
            data: this.request,
        }).then(function (resp) {
           object.data = resp.data;
           object.draw();
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    }

    moveHoverTo(index){
        let row = this.elem.querySelector('[data-index="' + index + '"]');
        this.elem.querySelector('.hover').style.top = row.offsetTop - row.parentNode.scrollTop + 'px';
    }

    insertElems(){
        let index = 0;
        this.data.data.forEach((elem) => {
            let bodyElem = document.createElement('div');
            bodyElem.className = 'body-elem';
            bodyElem.setAttribute('id', 'line_' + elem.id);
            // bodyElem.setAttribute('onclick', 'alert(123)');
            bodyElem.setAttribute('data-id', elem.id);
            bodyElem.setAttribute('data-index', index);

            bodyElem.addEventListener('click', (e) => {
                this.selectItem(bodyElem.getAttribute('data-index'));
            });

            bodyElem.addEventListener('dblclick', (e) => {
                this.row_dblclick(elem.id);
            });

            bodyElem.addEventListener('mouseenter', (e) => {
                this.moveHoverTo(bodyElem.getAttribute('data-index'));
            });

            bodyElem.addEventListener('contextmenu', (e) => {
                this.contexted = parseInt(bodyElem.getAttribute('data-id'));
                e.preventDefault();
                let context = this.elem.querySelector('#context');

                if(!bodyElem.classList.contains('selected')){
                    this.unselectAll();
                    this.markAsSelect(bodyElem.getAttribute('data-index'));
                }

                let tableX = e.clientX - this.elem.getBoundingClientRect().left + window.scrollX;
                let tableY = e.clientY - this.elem.getBoundingClientRect().top + window.scrollY;
                this.context_top = tableY;

                if(context.offsetHeight + e.clientY + 100 >= window.innerHeight){
                    tableY -= context.offsetHeight;
                }

                this.body_scroll = this.bodyContainer.scrollTop;
                context.style.top = tableY + 'px';
                context.style.left = tableX + 'px';



                let selected = this.getSelectedIDs();



                let only_group = context.querySelectorAll('[data-group="true"]');
                only_group.forEach((elem) => {
                    if(selected.length <= 1){
                        elem.classList.add('hide');
                    } else {
                        elem.classList.remove('hide');
                    }
                });


            });


            if(this.isSelectable) {
                let cell = document.createElement('div');
                cell.className = 'cell checkbox';
                    let checkbox = document.createElement('input');
                    checkbox.setAttribute('type', 'checkbox');
                    checkbox.setAttribute('id', 'check_' + elem.id);
                    checkbox.setAttribute('data-id', elem.id);
                    checkbox.setAttribute('data-check_index', index);
                    checkbox.setAttribute('name', 'check_' + elem.id);

                    checkbox.addEventListener('change', (e) => {
                        index = parseInt(checkbox.getAttribute('data-check_index'));
                        if(!checkbox.checked){
                            this.markAsUnselect(index)
                        } else {
                            this.markAsSelect(index);
                        }
                    });

                    let label = document.createElement('label');
                    label.setAttribute('for', 'check_' + elem.id);
                    cell.appendChild(checkbox);
                    cell.appendChild(label);
                bodyElem.appendChild(cell);
            }

            let count = 0;
            for (const [key, value] of Object.entries(elem)) {
                let cell = document.createElement('div');
                cell.className = 'cell';
                 if(this.header[count].width === 'auto'){
                    cell.style.flex = 1;
                } else {
                    cell.style.width = this.header[count].width + 'px';
                }
                if(this.header[count].min_with){
                    cell.style.minWidth = this.header[count].min_with + 'px';
                }

                let title = document.createElement('div');
                title.className = 'title';
                title.innerText = value;
                cell.appendChild(title);
                bodyElem.appendChild(cell);
                count++;
            }
            index++;
            this.bodyContainer.appendChild(bodyElem);
        });

    }

    selectItem(index){
        index = parseInt(index);
        let row = this.bodyContainer.querySelector('[data-index="' + index + '"]');

        if(!window.ctrl_pressed && !window.shift_pressed){
            this.unselectAll();
        }

        if(window.ctrl_pressed){
            if(row.classList.contains('selected')){
                this.markAsUnselect(index)
            } else {
                this.markAsSelect(index);
            }
        } else {
            this.markAsSelect(index);
        }

        if(window.shift_pressed && this.last_selected != null){
            let indexes = [];

            let max = (this.last_selected > index) ? this.last_selected : index;
            let min = (this.last_selected < index) ? this.last_selected : index;

            for (let i = min; i <= max; i++) {
                indexes.push(parseInt(i));
            }


            indexes.forEach((i) => {
                this.markAsSelect(i);
            });
        }
        this.last_selected = parseInt(index);

    }

    markAsSelect(index){
        let row = this.elem.querySelector('[data-index="' + index + '"]');
        if(!row.classList.contains('selected')){
            row.classList.add('selected');
        }
        row.querySelector('.checkbox input').checked = true;
    }

    markAsUnselect(index){
        let row = this.bodyContainer.querySelector('[data-index="' + index + '"]');
        if(row.classList.contains('selected')){
            row.classList.remove('selected');
        }
        row.querySelector('.checkbox input').checked = false;
    }

    unselectAll(){
        let list = this.bodyContainer.querySelectorAll('.body-elem');
        list.forEach((elem) => {
            this.markAsUnselect(elem.getAttribute('data-index'));
        });
    }

    drawHeader(){
        let header = document.createElement('div');
        header.className = 'bbtable-header';

        if(this.isSelectable){
            let header_elem = document.createElement('div');
            header_elem.className = 'header-elem checkbox';

            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('id', 'check_all');
            checkbox.setAttribute('name', 'check_all');
            checkbox.addEventListener('change', (e) => {
                let checkboxes = this.elem.querySelectorAll('input[type="checkbox"]:not([name="check_all"])');
                [].forEach.call(checkboxes, function(checkbox_out){
                    checkbox_out.checked = checkbox.checked;
                    let evt = document.createEvent("HTMLEvents");
                    evt.initEvent("change", false, true);
                    checkbox_out.dispatchEvent(evt);
                });
            });


            let label = document.createElement('label');
            label.setAttribute('for', 'check_all');
            header_elem.appendChild(checkbox);
            header_elem.appendChild(label);

            header.appendChild(header_elem);
        }
        this.header.forEach((elem) =>{

            let header_elem = document.createElement('div');
            header_elem.className = 'header-elem';
            header_elem.setAttribute('data-field', elem.table_name);
            let title = document.createElement('div');

            header_elem.addEventListener('click', (e) => {

                let field = header_elem.getAttribute('data-field');

                if(this.sorters[field].dir === 'ASC'){
                    this.sorters[field].dir = 'DESC'
                } else {
                    this.sorters[field].dir = 'ASC'
                }
                this.sorters[field].active = true;
                this.request.sorters = [
                    {
                        field:field,
                        dir:this.sorters[field].dir
                    }
                ];
                for (const [key, value] of Object.entries(this.sorters)) {
                    if(key !== field){
                        this.sorters[key].active = false;
                        this.sorters[key].dir = this.start_sort;
                    }
                }
                this.freshData();
            });

            title.className = 'title';
            title.innerText = elem.name;

            if(elem.width === 'auto'){
                header_elem.style.flex = 1;
            } else {
                header_elem.style.width = elem.width + 'px';
            }
            if(elem.min_with){
                header_elem.style.minWidth = elem.min_with + 'px';
            }



            header_elem.appendChild(title);

            let arrow = document.createElement('div');
            arrow.className = 'arrow';

            if(this.sorters[elem.table_name].dir === "ASC"){
                arrow.classList.add('up');
            } else {
                arrow.classList.add('down');
            }

            if(this.sorters[elem.table_name].active === true){
                arrow.classList.add('active');
                header_elem.classList.add('active');
            }

            header_elem.appendChild(arrow);

            header.appendChild(header_elem);
        });


        return header;
    }

    drawPaginator(){
        let paginator = document.createElement('div');
        paginator.className = 'paginator';

            let firstButton = document.createElement('button');
            firstButton.innerText = 'Первая';
            firstButton.setAttribute('data-page', 1);
            if(this.data.current_page === 1){
                firstButton.classList.add('disabled');
            } else {
                firstButton.addEventListener('click', (e) => {
                    this.setRequest('page', firstButton.getAttribute('data-page'));
                });
            }

            let lastButton = document.createElement('button');
            lastButton.innerText = 'Последняя';
            lastButton.setAttribute('data-page', this.data.last_page);
            if(this.data.current_page === this.data.last_page){
                lastButton.classList.add('disabled');
            } else {
                lastButton.addEventListener('click', (e) => {
                    this.setRequest('page', lastButton.getAttribute('data-page'));
                });
            }

            let backButton = document.createElement('button');
            backButton.innerText = 'Назад';
            let backPage = this.data.current_page - 1;
            backButton.setAttribute('data-page', backPage);
            if(backPage <= 0){
                backButton.classList.add('disabled');
            } else {
                backButton.addEventListener('click', (e) => {
                    this.setRequest('page', backButton.getAttribute('data-page'));
                });
            }

            let forwardButton = document.createElement('button');
            forwardButton.innerText = 'Вперёд';
            let forwardPage = this.data.current_page + 1;
            forwardButton.setAttribute('data-page', forwardPage);
            if(forwardPage > this.data.last_page){
                forwardButton.classList.add('disabled');
            } else {
                forwardButton.addEventListener('click', (e) => {
                    this.setRequest('page', forwardButton.getAttribute('data-page'));
                });
            }


        paginator.appendChild(firstButton);
        paginator.appendChild(backButton);



        let paginate_array = [];

        let prev_array = [];
        for (let i = 1; i < 2; i++) {
            if(i > 0 && i <= this.data.last_page){
                prev_array.push(i);
            }
        }

        let pages_array = [];
        for (let i = this.data.current_page - 2; i < this.data.current_page + 2; i++) {
            if(i > 0 && i <= this.data.last_page){
                pages_array.push(i);
            }
        }
        let last_array = [];
        for (let i = this.data.last_page - 2; i < this.data.last_page; i++) {
            if(i > 0 && i <= this.data.last_page){
                last_array.push(i);
            }
        }

        paginate_array = paginate_array.concat(prev_array).unique();
        paginate_array = paginate_array.concat(pages_array).unique();
        paginate_array = paginate_array.concat(last_array).unique();


        paginate_array.forEach((page) => {
            let pageButt = document.createElement('button');
            pageButt.innerText = page;
            if(page === this.data.current_page){
                pageButt.classList.add('active');
            }
            pageButt.setAttribute('data-page', page);
            pageButt.addEventListener('click', (e) => {
                this.setRequest('page', pageButt.getAttribute('data-page'));
            });

            paginator.appendChild(pageButt);
        });

        paginator.appendChild(forwardButton);
        paginator.appendChild(lastButton);
        return paginator;
    }

    drawBody(){
        this.bodyContainer = document.createElement('div');
        this.bodyContainer.className = 'bbtable-body';
        this.bodyContainer.addEventListener('scroll', (e) => {

           let context = this.elem.querySelector('#context');

           context.style.top = this.context_top - this.bodyContainer.scrollTop + this.body_scroll + 'px';
        });
        return this.bodyContainer;
    }

    drawHover(){
        this.hover = document.createElement('div');
        this.hover.className = 'hover';
        return this.hover;
    }

    drawContext(){
        this.context = document.createElement('div');
        this.context.className = 'context';
        this.context.setAttribute('id', 'context');

        this.context_menu.forEach((item) => {
            let context_item = document.createElement('div');
            context_item.classList.add('context_item');

            if(item.only_group){
                context_item.setAttribute('data-group', 'true');
            }


            context_item.addEventListener('click', (e) => {
                let selects = this.getSelectedIDs();
                item.action({
                    contexted: this.contexted,
                    selected: selects
                });
                this.context.style.left = '-300px';
            });

            let title = document.createElement('div');
            title.classList.add('title');
            title.innerHTML = item.name;
            context_item.appendChild(title);
            this.context.appendChild(context_item);
        });

        return this.context;
    }

    getSelectedIDs(){
        let selected = this.elem.querySelectorAll('.body-elem.selected');
        let ids = [];

        selected.forEach((elem) => {
            ids.push(parseInt(elem.getAttribute('data-id')));
        });

        return ids;
    }

}
class TableItem {

    constructor(elem){
        this.elem = elem;
    }

    draw(){

    }

}
export {Table, TableItem};
