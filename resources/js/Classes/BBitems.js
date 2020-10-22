class Items {
    constructor(object, container, form_name, header, use_nds = false){
        this.container = document.getElementById(container);
        if(!form_name)
            throw new Error('Не указано имя формы');
        this.form_name = form_name;
        this.use_nds = use_nds;
        this.header = header;
        this.parent_object = object;
        if(!this.container)
            throw new Error('Не указан контейнер');
        if(!this.container.hasAttribute('data-items'))
            throw new Error('Не передан параметр items');

        this.items = JSON.parse(this.container.dataset.items);

        this.nds = false;
        this.nds_included = false;

        this.container.removeAttribute('data-items');

       //////

        this.draw();
    }
    draw(){
        let container = document.createElement('div');
        container.classList.add('list-container');
        this.container.appendChild(container);

        let title_cont = document.createElement('div');
        title_cont.classList.add('title_cont');
        container.appendChild(title_cont);

        let title =  document.createElement('div');
        title.classList.add('header_title');
        title.innerText = "Список номенклатур";
        title_cont.appendChild(title);

        if(this.use_nds){
            let nds_container =  document.createElement('div');
            nds_container.classList.add('nds_container');
            title_cont.appendChild(nds_container);

            let nds_title =  document.createElement('div');
            nds_title.classList.add('nds_title');
            nds_title.innerText = 'НДС:';
            nds_container.appendChild(nds_title);

            let checkbox = document.createElement('div');
            checkbox.classList.add('checkbox');
            nds_container.appendChild(checkbox);

            let name = document.createElement('label');
            name.classList.add('checkbox-title');
            name.setAttribute('for', 'nds');
            name.innerText = 'наложен';
            checkbox.appendChild(name);

            let input = document.createElement('input');
            input.name = 'nds';
            input.id = 'nds';
            input.type = 'checkbox';
            checkbox.appendChild(input);

            let label = document.createElement('label');
            label.setAttribute('for', 'nds');
            checkbox.appendChild(label);

            //

            checkbox = document.createElement('div');
            checkbox.classList.add('checkbox');
            nds_container.appendChild(checkbox);

            name = document.createElement('label');
            name.setAttribute('for', 'nds_included');
            name.classList.add('checkbox-title');
            name.innerText = 'включен в стоимость';
            checkbox.appendChild(name);

            input = document.createElement('input');
            input.name = 'nds_included';
            input.id = 'nds_included';
            input.type = 'checkbox';
            checkbox.appendChild(input);

            label = document.createElement('label');
            label.setAttribute('for', 'nds_included');
            checkbox.appendChild(label);

        }
        //Header

        let header = document.createElement('div');
        header.classList.add('list-header');
        container.appendChild(header);

        this.header.forEach((item) => {
            let header_elem = document.createElement('div');
            header_elem.classList.add('header-elem');

            if(item.width === 'auto'){
                header_elem.style.flex = 1;
            } else {
                header_elem.style.width = item.width + 'px';
            }
            if(item.min_with){
                header_elem.style.minWidth = item.min_with + 'px';
            }


            header.appendChild(header_elem);

            let title = document.createElement('span');
            title.classList.add('head-title');
            title.innerText = item.name;
            header_elem.appendChild(title);
        });

        this.body = document.createElement('div');
        this.body.classList.add('list-body');
        container.appendChild(this.body);

        let bottom = document.createElement('div');
        bottom.classList.add('list-bottom');
        container.appendChild(bottom);

        let add_button = document.createElement('button');

        add_button.setAttribute('type', 'button');
        add_button.name = 'products';
        add_button.classList.add('button');
        add_button.classList.add('list-add-button');
        add_button.innerText = 'Добавить позицию';
        add_button.setAttribute('onclick', this.parent_object.current_dialog.id + '.openProductmodal()');
        bottom.appendChild(add_button);

        let placeholder = document.createElement('div');
        placeholder.classList.add('list-placeholder');
        this.body.appendChild(placeholder);

        for (let i = 10; i--; i< 0){
            let placeholder_item = document.createElement('div');
            placeholder_item.classList.add('list-placeholder_item');
            placeholder.appendChild(placeholder_item);
            this.header.forEach((item) => {
                let placeholder_cell= document.createElement('div');
                placeholder_cell.classList.add('list-placeholder_cell');
                if(item.width === 'auto'){
                    placeholder_cell.style.flex = 1;
                } else {
                    placeholder_cell.style.width = item.width + 'px';
                }
                if(item.min_with){
                    placeholder_cell.style.minWidth = item.min_with + 'px';
                }
                placeholder_item.appendChild(placeholder_cell);
            });
        }

        this.items.forEach((cell_item) => {
            this.insertProduct(cell_item, false);
        });

    }
    removeItem(id){
        event.preventDefault();
        let elem = this.body.querySelector('#' + this.form_name + '_' + id);
        elem.remove();
        this.items.splice(
            this.items.map(function(e){
                return e.id
            }).indexOf(id), 1
        );
        this.recalculateTotal();
    }


    insertProduct(cell_item, check_isset = true){

        let isset = this.items.map(function (e) {
            return e.id;
        }).indexOf(cell_item.id);


        if(isset >= 0 && check_isset){
            window.notification.notify('error', 'Товар уже в списке');
        } else {
            if(check_isset) this.items.push(cell_item);
            let body_elem = document.createElement('div');
            body_elem.classList.add('body-elem');
            body_elem.id = this.form_name + '_' + cell_item.id;
            this.body.prepend(body_elem);

            let actions = document.createElement('div');
            actions.classList.add('list-actions');
            body_elem.appendChild(actions);

            let remove = document.createElement('button');
            remove.classList.add('button');
            remove.classList.add('list-remove');
            remove.innerText = '✖';
            remove.addEventListener('click', ()=>{
                this.removeItem(cell_item.id);
            });
            actions.appendChild(remove);

            this.header.forEach((item) => {
                let cell = document.createElement('div');
                cell.classList.add('cell');

                if(item.width === 'auto'){
                    cell.style.flex = 1;
                } else {
                    cell.style.width = item.width + 'px';
                }
                if(item.min_with){
                    cell.style.minWidth = item.min_with + 'px';
                }

                let title = document.createElement('div');

                title.classList.add('list-title');
                title.classList.add('title-' + item.type);
                cell.appendChild(title);

                switch(item.type) {
                    case 'text':
                        title.innerText = cell_item[item.table_name];
                        break;
                    case 'counter':
                        let input = document.createElement("input");
                        let value = 1;
                        if(cell_item[item.table_name]){
                            value = cell_item[item.table_name];
                        }
                        input.value = value;
                        input.setAttribute('type', 'number');
                        input.setAttribute('min', '1');
                        input.name = this.form_name + '[' + cell_item.id + '][' + item.table_name + ']';
                        input.addEventListener('keyup', () => {
                            this.recalculateItem(cell_item.id);
                        });
                        input.addEventListener('change', () => {
                            this.recalculateItem(cell_item.id);
                        });
                        title.appendChild(input);
                        break;
                    case 'price':
                        let price = document.createElement("input");
                        price.value = Number(cell_item[item.table_name]).toFixed(2);
                        price.setAttribute('type', 'number');
                        price.setAttribute('min', '1');
                        price.setAttribute('step', '0.1');
                        price.name = this.form_name + '[' + cell_item.id + '][' + item.table_name + ']';
                        price.addEventListener('keyup',  () => {
                            this.recalculateItem(cell_item.id);
                        });
                        price.addEventListener('change',  () => {
                            this.recalculateItem(cell_item.id);
                        });
                        title.appendChild(price);
                        break;
                    case 'passive':
                        let passive = document.createElement("input");

                        if(!this.use_nds && (item.table_name === 'nds' || item.table_name === 'nds_percent')){
                            passive.value = Number(0).toFixed(2);
                        } else {
                            passive.value = Number(cell_item[item.table_name]).toFixed(2);
                        }

                        passive.setAttribute('type', 'number');
                        passive.disabled = true;
                        passive.name = this.form_name + '[' + cell_item.id + '][' + item.table_name + ']';
                        title.appendChild(passive);
                        break;
                    default:
                        throw new Error('Неверный тип данных');

                }
                body_elem.appendChild(cell);
            });

            this.recalculateItem(cell_item.id);
        }
    }

    add(elemWithData, refer){
        let cell_item = JSON.parse(elemWithData.dataset.product);
        this.insertProduct(cell_item);
    }

    recalculateItem(id){
        let object = this;
        let item = this.container.querySelector('#' + this.form_name + '_' + id);
        let total = item.querySelector("input[name='" + this.form_name + "[" + id + "][total]']");
        let count = item.querySelector("input[name='" + this.form_name + "[" + id + "][count]']");
        let price = item.querySelector("input[name='" + this.form_name + "[" + id + "][price]']");

        let nds_percent = item.querySelector("input[name='" + this.form_name + "[" + id + "][nds_percent]']");
        let nds = item.querySelector("input[name='" + this.form_name + "[" + id + "][nds]']");

        let vcount = Number(count.value);
        let vprice = Number(price.value);
        let vnds_percent = Number(nds_percent.value);
        let vnds = Number(nds.value);
        let vtotal = Number(total.value);

        if(this.use_nds && !object.nds_included){
            vnds_percent = 20;
            vtotal = vprice * vcount;
            vnds = vtotal / 100 * vnds_percent;
            vtotal = vnds + vtotal;
        } else if(this.use_nds && object.nds_included){
            vnds_percent = 20;
            vtotal = vprice * vcount;
            vnds = vtotal / ( 100 + vnds_percent ) * vnds_percent;
        } else {
            vtotal = vprice * vcount;
            vnds = 0.00;
            vnds_percent = 0;
        }

        nds_percent.value = vnds_percent.toFixed(2);
        nds.value = vnds.toFixed(2);
        total.value = vtotal.toFixed(2);

        object.items.map(function(e){
            if(e.id === id){
                e.total = vtotal;
                e.count = vcount;
                e.price = vprice;
            }
        });
        this.recalculateTotal();
    }

    recalculateTotal(){
        let total_price = 0;
        let total_count = 0;

        this.items.map(function(e){
            total_price = total_price + Number(e.total);
            total_count = total_count + Number(e.count);
        });
        this.parent_object.setTotalPrice(total_price);
    }

}
export default Items
