class statisticPage {

    constructor() {
        console.log('страница статистики инициализировано');

        this.chart = null;

        this.graph_data = null;

        this.start_date = new Date();
        this.start_date.setDate(this.start_date.getDate() - 30); // На 30 дней назад

        this.end_date = new Date();

        this.entity_names = [
            'Заявки поставщикам',
            'Поступления',
            'Возвраты',
            'Продажи',
            'Заказы клиентов',
            'Приходные ордера',
            'Расходные ордера',
            'Перемещения',
            'Маржа',
            'Долги поставщикам',
            'Недоплаты по заказам клиентов',
            'Недоплаты по продажам',
            'Ежедневный остаток в кассах',
            'Валовая прибыль'
        ];

        this.init();
    }

    linked() {
        this.init();
    }

    init() {

        this.checkActive();

        //Date selector

        this.initRangeSelector();

        this.initTippies();

    }

    initTippies() {
        let tippy_descriptions = [
            'Заявки поставщикам',
            'Поступления',
            'Возвраты',
            'Продажи',
            'Заказы клиентов',
            'Приходные ордера',
            'Расходные ордера',
            'Перемещения',
            'Маржа',
            'Долги поставщикам',
            'Недоплаты по заказам клиентов',
            'Недоплаты по продажам',
            'Ежедневный остаток в кассах',
            'Валовая прибыль',
            'ROI'
        ];

        let elements = document.getElementsByClassName('statistic-question');

        elements.forEach((element, index) => {
            tippy(element.firstElementChild, {
                content: tippy_descriptions[index],
                placement: 'bottom',
                theme: 'light'
            });
        });
    }

    removeFilter(filter_element) {
        filter_element = filter_element.parentElement;

        let entity_name = filter_element.innerText;

        filter_element.remove();

        let elements = document.getElementsByName('entities[]');

        elements.forEach(element => {

            if(element.value === entity_name) {
                element.checked = false;
            }
        });

        console.log(document.getElementsByClassName('filter-item').length);

        if(!document.getElementsByClassName('filter-item').length) {
            document.getElementsByClassName('filter-list')[0].innerHTML = 'Результатов нет.';
        }

        document.getElementById('select_all').checked = false;
    }

    toggleFilter(element) {

        let input = element.querySelector('input');

        input.checked = !input.checked;

        let item_count = document.getElementsByClassName('filter-item').length;

        let list_element = document.getElementsByClassName('filter-list')[0];

        if(input.checked) {

            if(!item_count) {
                list_element.innerHTML = '';
            }

            let html = '<div class="filter-item">\n' +
                '           ' + input.value + '\n' +
                '           <button type="button" onclick="statistic.removeFilter(this)" class="right-remove pr-10"><i class="fa fa-remove"></i></button>\n' +
                '       </div>';

            list_element.append(helper.createElementFromHTML(html));
        }
        else {
            let elements = document.getElementsByClassName('filter-item');

            elements.forEach(element => {
                if(element.innerText === input.value) {
                    element.remove();
                }
            });

            if(item_count - 1 <= 0) {
                list_element.innerHTML = 'Результатов нет.';
            }
        }

        document.getElementById('select_all').checked = document.getElementsByClassName('filter-item').length === 15;
    }

    toggleFilters(current_element) {

        let input = current_element.querySelector('input');

        input.checked = !input.checked;

        let elements = document.getElementsByName('entities[]');

        elements.forEach(element => {
            element.checked = input.checked;
        });

        let list_element = document.getElementsByClassName('filter-list')[0];

        if(input.checked) {

            list_element.innerHTML = '';

            this.entity_names.forEach(name => {
                let html = '<div class="filter-item">\n' +
                    '           ' + name + '\n' +
                    '           <button type="button" onclick="statistic.removeFilter(this)" class="right-remove pr-10"><i class="fa fa-remove"></i></button>\n' +
                    '       </div>';

                list_element.append(helper.createElementFromHTML(html));
            });
        }
        else {
            list_element.innerHTML = 'Результатов нет.';
        }
    }

    selectDdsarticle(id){
        var object = this;
        window.axios({
            method: 'post',
            url: 'ddsarticle/'+ id +'/select',
            data: {refer: 'statistic'}
        }).then(function (resp) {

            document.querySelector('input[name=dds_id]').value = resp.data.id;
            document.getElementById('dds_name').innerHTML = resp.data.name;

            window.notification.notify( 'success', 'Статья выбрана');
            document.dispatchEvent(new Event('DdsarticleSelected', {bubbles: true}));
            console.log("Событие DdsarticleSelected вызвано");
            //closeDialog(event);

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    };

    clearDdsarticle() {
        document.querySelector('input[name=dds_id]').value = '';
        document.getElementById('dds_name').innerText = 'Не выбрано';
    }

    openSelectManagerModal() {
        window.openDialog('selectPartner', '&refer=statistic&category_id=5&target=manager');
    }

    openSelectPartnerModal() {
        window.openDialog('selectPartner', '&refer=statistic&category_id=7&target=partner');
    }

    checkActive(){
        let className = window.location.pathname.substring(1);
        let link = document.getElementById('statistic_link');
        if(className === 'statistic'){
            link.classList.add('active');
            this.active = true;
        } else {
            link.classList.remove('active');
            this.active = false;
        }
    }

    resetBeginDate() {
        this.start_date = new Date();
        this.start_date.setDate(this.start_date.getDate() - 30); // На 30 дней назад

        let start_date = document.querySelector('input[name=begin_date]');
        start_date.value = this.start_date.getDate().toString().padStart(2, "0") + '.' + (this.start_date.getMonth() + 1).toString().padStart(2, "0") + '.' + this.start_date.getFullYear();
    }

    resetFinalDate() {
        this.end_date = new Date();

        let end_date = document.querySelector('input[name=final_date]');
        end_date.value = this.end_date.getDate().toString().padStart(2, "0") + '.' + ( this.end_date.getMonth() + 1 ).toString().padStart(2, "0") + '.' + this.end_date.getFullYear();
    }

    clearManager() {
        document.querySelector('input[name=manager_id]').value = '';
        document.getElementById('manager_name').innerText = 'Не выбрано';
    }

    clearPartner() {
        document.querySelector('input[name=partner_id]').value = '';
        document.getElementById('partner_name').innerText = 'Не выбрано';
    }

    selectPartner(id, type) {

        window.axios({
            method: 'post',
            url: 'partner/' + id + '/select',
            data: {refer: 'statistic'}
        }).then((resp) => {
            document.querySelector('input[name=' + type + '_id]').value = resp.data.id;
            document.getElementById(type + '_name').innerHTML = resp.data.name;

            window.notification.notify('success', 'Контакт выбран');
            document.dispatchEvent(new Event('PartnerSelected', {bubbles: true}));

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
        });
    }

    initRangeSelector(){
        let object = this;
        let start_date = document.querySelector('input[name=begin_date]');
        let end_date = document.querySelector('input[name=final_date]');
        start_date.value = this.start_date.getDate() + '.' + (this.start_date.getMonth() + 1) + '.' + this.start_date.getFullYear();
        end_date.value = this.end_date.getDate() + '.' + ( this.end_date.getMonth() + 1 ) + '.' + this.end_date.getFullYear();

        object.start_date_flatpkr = window.flatpickr("input[name=begin_date]", {
            allowInput: true,
            dateFormat: "d.m.Y",
        });
        object.end_date_flatpkr = window.flatpickr("input[name=final_date]", {
            allowInput: true,
            dateFormat: "d.m.Y",
        });

        object.start_date_mask = window.IMask(start_date, {
                mask: Date,
                min: new Date(1990, 0, 1),
                max: new Date(2030, 0, 1),
                lazy: false
            }
        );
        object.end_date_mask = window.IMask(end_date, {
                mask: Date,
                min: new Date(1990, 0, 1),
                max: new Date(2030, 0, 1),
                lazy: false
            }
        )
    }

    print(){

        let element = document.getElementById('statistic-chart');

        this.graph_data.image = element.toDataURL('image/png');

        window.helper.printDocument('statistic-result', null, JSON.stringify(this.graph_data));
    }
}

export default statisticPage;
