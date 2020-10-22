class Items {
    constructor(container, form_name, use_nds = false){
        this.container = document.getElementById(container);
        if(!form_name)
            throw new Error('Не указано имя формы');
        this.form_name = form_name;
        this.use_nds = use_nds;
        if(!this.container)
            throw new Error('Не указан контейнер');
        if(!this.container.hasAttribute('data-items'))
            throw new Error('Не передан параметр items');

        this.items = JSON.parse(this.container.dataset.items);

        this.nds = false;
        this.nds_included = false;

        this.container.removeAttribute('data-items');

        this.header = [
            // {min_with: 100, width: 'auto', name: 'Наименование',    table_name: 'name',     type:'counter'},
            // {min_with: 150, width: 200,    name: 'Артикул',         table_name: 'article',  type:'price'},
            // {min_with: 150, width: 200,    name: 'Бренд',           table_name: 'supplier', type:'text'},
            {min_with: 100, width: 'auto', name: 'Наименование',    table_name: 'name',     type:'text'},
            {min_with: 100, width: 100,    name: 'Артикул',         table_name: 'article',  type:'text'},
            {
                min_with: 60,
                width: 60,
                name: 'Кол-во',
                table_name: 'count',
                type: 'counter',
            },
            {
                min_with: 60,
                width: 60,
                name: 'Цена',
                table_name: 'price',
                type: 'price',
            },
            {
                min_with: 60,
                width: 60,
                name: 'НДС, %',
                table_name: 'nds_percent',
                type: 'passive',
            },
            {
                min_with: 60,
                width: 60,
                name: 'НДС',
                table_name: 'nds',
                type: 'passive',
            },
            {
                min_with: 100,
                width: 100,
                name: 'Итого',
                table_name: 'total',
                type: 'passive',
            },
        ];

        this.draw();
    }
    draw(){
        let container = document.createElement('div');
        container.classList.add('list-container');
        this.container.appendChild(container);

        let title_cont = document.createElement('div');
        title_cont.classList.add('title_cont');
        this.container.appendChild(title_cont);

        let title =  document.createElement('div');
        title.classList.add('header_title');
        title.innerText = "Список номенклатур";
        this.container.appendChild(title);
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

        let body = document.createElement('div');
        body.classList.add('list-body');
        container.appendChild(body);

        this.items.forEach((cell_item) => {

            let body_elem = document.createElement('div');
            body_elem.classList.add('body-elem');
            body_elem.id = this.form_name + '_' + cell_item.id;
            body.appendChild(body_elem);

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
                body_elem.appendChild(cell);

                let title = document.createElement('div');

                title.classList.add('list-title');
                title.classList.add('title-' + item.type);




                switch(item.type) {
                    case 'text':
                        title.innerText = cell_item[item.table_name];
                        break;
                    case 'counter':
                        let input = document.createElement("input");
                        input.value = cell_item[item.table_name];
                        input.setAttribute('type', 'number');
                        input.name = this.form_name + '[' + cell_item.id + '][' + item.table_name + ']';
                        input.addEventListener('keydown', () => {
                            this.recalculateItem(cell_item.id);
                        });
                        input.addEventListener('change', () => {
                            this.recalculateItem(cell_item.id);
                        });
                        title.appendChild(input);
                        break;
                    case 'price':
                        let price = document.createElement("input");
                        price.value = cell_item[item.table_name];
                        price.setAttribute('type', 'number');
                        price.name = this.form_name + '[' + cell_item.id + '][' + item.table_name + ']';
                        price.addEventListener('keydown',  () => {
                            this.recalculateItem(cell_item.id);
                        });
                        price.addEventListener('change',  () => {
                            this.recalculateItem(cell_item.id);
                        });
                        title.appendChild(price);
                        break;
                    case 'passive':
                        let passive = document.createElement("input");
                        passive.value = cell_item[item.table_name];
                        passive.setAttribute('type', 'number');
                        passive.disabled = true;
                        passive.name = this.form_name + '[' + cell_item.id + '][' + item.table_name + ']';
                        title.appendChild(passive);
                        break;
                    default:
                        throw new Error('Неверный тип данных');
                }
                cell.appendChild(title);
            });
        });
    }

    recalculateItem(id){
        let object = this;
        let item = this.container.querySelector('#' + this.form_name + '_' + id);
        let total = item.querySelector("input[name='" + this.form_name + "[" + id + "][total]']");
        let count = item.querySelector("input[name='" + this.form_name + "[" + id + "][count]']");
        let price = item.querySelector("input[name='" + this.form_name + "[" + id + "][price]']");

        let nds_percent = item.querySelector("input[name='" + this.form_name + "[" + id + "][nds_percent]']");
        let nds = item.querySelector("input[name='" + this.form_name + "[" + id + "][nds]']");

        dd(nds.value);

        let vcount = Number(count.value);
        let vprice = Number(price.value);
        let vnds_percent = Number(nds_percent.value);
        let vnds = Number(nds.value);
        let vtotal = Number(total.value);

        if(object.nds && !object.nds_included){
            vnds_percent = 20;
            vtotal = vprice * vcount;
            vnds = vtotal / 100 * vnds_percent;
            vtotal = vnds + vtotal;
        } else if(object.nds && object.nds_included){
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
    }
}
export default Items
