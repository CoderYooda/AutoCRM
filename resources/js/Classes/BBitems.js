class Items {
    constructor(object, container, form_name, header){
        this.container = document.getElementById(container);

        if(!form_name)
            throw new Error('Не указано имя формы');

        if(!this.container)
            throw new Error('Не указан контейнер');

        if(!this.container.hasAttribute('data-items'))
            throw new Error('Не передан параметр items');

        this.form_name = form_name;
        this.header = header;
        this.parent_object = object;

        if(this.container.dataset.prefs){
            this.prefs = JSON.parse(this.container.dataset.prefs);
            this.container.removeAttribute('data-prefs');
        }

        this.items = JSON.parse(this.container.dataset.items);

        if(this.prefs && this.prefs.use_nds !== null){
            this.use_nds = this.prefs.use_nds;
        } else {
            this.use_nds = null;
        }

        if(this.prefs && this.prefs.freeze !== null){
            this.freeze = this.prefs.freeze;
        } else {
            this.freeze = null;
        }

        if(this.prefs && this.prefs.can_add_items !== null){
            this.can_add_items = this.prefs.can_add_items;
        } else {
            this.can_add_items = false;
        }

        if(this.prefs && this.prefs.nds_included !== null){
            this.nds_included = this.prefs.nds_included;
        } else {
            this.nds_included = null;
        }

        if(this.prefs && this.prefs.nds !== null){
            this.nds = this.prefs.nds;
        } else {
            this.nds = null;
        }

        this.container.removeAttribute('data-items');

        this.nds_input = null;
        this.nds_included_input = null;


        this.inpercents = this.parent_object.inpercents;
        this.discount = this.parent_object.discount;

        this.init();

        this.draw();
    }

    init(){
        let fn = window.helper.debounce(e => {
            if(this.items){
                this.recalculateTotal();
            }
        }, 300);

        let discount = this.parent_object.root_dialog.querySelector('input[name=discount]');
        if(discount){
            this.discount =  discount;
            discount.addEventListener("keyup", fn);
            discount.addEventListener("paste", fn);
            discount.addEventListener("delete", fn);
            discount.addEventListener("change", fn);
        }

        let inpercents = this.parent_object.root_dialog.querySelector('input[name=inpercents]');
        if(inpercents){
            this.inpercents = inpercents;
            inpercents.addEventListener("change", fn);
        }
        console.log("Лист загружен");
    }

    setItems(items){
        this.items = items;
        this.draw();
    }

    draw(){

        this.container.innerHTML = '';
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

            // let nds_title =  document.createElement('div');
            // nds_title.classList.add('nds_title');
            // nds_title.innerText = 'НДС:';
            // nds_container.appendChild(nds_title);

            let name = document.createElement('label');
            name.classList.add('checkbox-title');
            name.setAttribute('for', 'nds');
            name.innerText = 'НДС:';
            nds_container.appendChild(name);

            let checkbox = document.createElement('div');
            checkbox.classList.add('checkbox');
            checkbox.addEventListener('click', ()=> {
                this.ndsCnabged();
            });
            nds_container.appendChild(checkbox);

            this.nds_input = document.createElement('input');
            this.nds_input.name = 'nds';
            this.nds_input.id = 'nds';
            this.nds_input.type = 'checkbox';
            this.nds_input.checked = this.nds;
            checkbox.appendChild(this.nds_input);

            let label = document.createElement('label');
            label.setAttribute('for', 'nds');
            checkbox.appendChild(label);

            //
            name = document.createElement('label');
            name.setAttribute('for', 'nds_included');
            name.classList.add('checkbox-title');
            name.innerText = 'включен в стоимость';
            nds_container.appendChild(name);

            checkbox = document.createElement('div');
            checkbox.classList.add('checkbox');
            checkbox.addEventListener('click', ()=> {
                this.ndsIncludedCnanged();
            });
            nds_container.appendChild(checkbox);

            this.nds_included_input = document.createElement('input');
            this.nds_included_input.name = 'nds_included';
            this.nds_included_input.id = 'nds_included';
            this.nds_included_input.type = 'checkbox';
            this.nds_included_input.checked = this.nds_included;
            if(this.freeze){
                this.nds_included_input.disable();
            }
            checkbox.appendChild(this.nds_included_input);

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

        if(this.can_add_items){
            let add_button = document.createElement('button');
            add_button.setAttribute('type', 'button');
            add_button.name = 'products';
            add_button.classList.add('button');
            add_button.classList.add('list-add-button');
            add_button.innerText = 'Добавить позицию';
            add_button.setAttribute('onclick', this.parent_object.current_dialog.id + '.openProductmodal()');
            bottom.appendChild(add_button);
        }

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

    ndsCnabged(){
        if(this.nds_input.value){
            if(this.nds_input.checked === false) {
                this.nds_input.checked = true;
            }
            else {
                if(this.nds_input.checked === true) {
                    this.nds_input.checked = false;
                    this.nds_included_input.checked = false;
                }
            }
        }
        this.items.forEach((elem)=>{
            this.recalculateItem(elem.id);
        })
    }

    ndsIncludedCnanged(){
        if(this.nds_included_input.value){
            if(this.nds_included_input.checked === false) {
                this.nds_included_input.checked = true;
            }
            else {
                if(this.nds_included_input.checked === true) {
                    this.nds_included_input.checked = false;
                }
            }
        }

        this.items.forEach((elem)=>{
            this.recalculateItem(elem.id);
        })
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

            if(!this.freeze){

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
            }

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
                        if(this.freeze){input.disabled = true;}
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
                        if(this.freeze){price.disabled = true;}
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
                        if(this.freeze){passive.disabled = true;}
                        title.appendChild(passive);
                        break;
                    case 'passive-count':
                        let passive_count = document.createElement("input");

                        if(!this.use_nds && (item.table_name === 'nds' || item.table_name === 'nds_percent')){
                            passive_count.value = Number(0).toFixed(2);
                        } else {
                            passive_count.value = Number(cell_item[item.table_name]);
                        }

                        passive_count.setAttribute('type', 'number');
                        passive_count.disabled = true;
                        passive_count.name = this.form_name + '[' + cell_item.id + '][' + item.table_name + ']';
                        if(this.freeze){passive_count.disabled = true;}
                        title.appendChild(passive_count);
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

        let vcount = count ? Number(count.value) : 0;
        let vprice = price ? Number(price.value) : 0;
        let vnds_percent = nds_percent ? Number(nds_percent.value) : 0;
        let vnds = nds ? Number(nds.value) : 0;
        let vtotal = total ? Number(total.value) : 0;


        if(this.use_nds && this.nds_input.checked && !this.nds_included_input.checked){
            vnds_percent = 20;
            vtotal = vprice * vcount;
            vnds = vtotal / 100 * vnds_percent;
            vtotal = vnds + vtotal;
        } else if(this.use_nds && this.nds_input.checked && this.nds_included_input.checked){
            vnds_percent = 20;
            vtotal = vprice * vcount;
            vnds = vtotal / ( 100 + vnds_percent ) * vnds_percent;
        } else {
            vtotal = vprice * vcount;
            vnds = 0.00;
            vnds_percent = 0;
        }
        if(nds_percent)
            nds_percent.value = vnds_percent ? vnds_percent.toFixed(2) : 0;
        if(nds)
            nds.value = vnds ? vnds.toFixed(2) : 0;
        if(total)
            total.value = vtotal ? vtotal.toFixed(2) : 0;

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
        let itogo = 0;

        this.items.map(function(e){
            total_price = total_price + Number(e.total);
            total_count = total_count + Number(e.count);
        });



        if(this.inpercents){
            if(this.inpercents && parseInt(this.inpercents.value) === 1){
                itogo = total_price - (total_price / 100 * Number(this.discount.value).toFixed(2));
            } else {
                itogo = total_price - Number(this.discount.value).toFixed(2);
            }

            if(parseInt(this.inpercents.value) && (parseInt(this.discount.value) >= 100)){
                this.discount.value = 100;
            }
            let discount_val = this.discount.value + (parseInt(this.inpercents.value) ? ' %' : ' р');

            if (typeof this.parent_object.setDiscount === "function") {
                this.parent_object.setDiscount(discount_val);
            }
        } else {
            itogo = total_price;
        }

        if (typeof this.parent_object.setTotalPrice === "function") {
            this.parent_object.setTotalPrice(total_price);
        }
        if (typeof this.parent_object.setTotal === "function") {
            this.parent_object.setTotal(itogo);
        }

        //this.parent_object.setTotalPrice(total_price);
    }

}
export default Items
