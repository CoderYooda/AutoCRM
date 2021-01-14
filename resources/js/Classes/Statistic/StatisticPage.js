class statisticPage {

    constructor() {
        console.log('страница статистики инициализировано');

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

        //Включаем фильтры по дефолту\

        let element = document.querySelector('.statistic-select-all');

        this.toggleFilters(element);
    }

    initTippies() {
        let tippy_descriptions = [
            'Общая сумма затрат на приобретение товаров у поставщиков за период.',
            'Общая стоимость товаров, поступивших на склад за период.',
            'Общая стоимость товаров, возвращенных клиентами за период.',
            'Общая стоимость товаров от продаж за период.',
            'Общая стоимость товаров, заказанных клиентами за период.',
            'Общая сумма всех приходных операций в кассах за период.',
            'Общая сумма всех расходных операций в кассах за период.',
            'Общая сумма движения денежных средств между кассами за период.',
            'Сумма прибыли, полученная без учетом расходов за период.',
            'Общая сумма задолженностей поставщикам за период.',
            'Общая сумма задолженностей по заказам клиентов за период.',
            'Общая сумма задолженностей по продажам за период.',
            'Общая сумма денежных средств, оставшихся в кассе за период.',
            'Сумма прибыли, полученная с учета расходов за период.',
            'Общая сумма полученной прибыли, выраженная в процентах по отношение к расходам за период.'
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

    toggleFilter(element) {

        let input = element.querySelector('input');

        input.checked = !input.checked;

        let inputs = document.querySelectorAll('input[class="d-none"]');

        let count = 0;

        inputs.forEach(input => {
            if(input.checked) count++;
        });

        document.getElementById('select_all').checked = count === 15;
    }

    toggleFilters(current_element) {

        let input = current_element.querySelector('input');

        input.checked = !input.checked;

        let elements = document.getElementsByName('entities[]');

        elements.forEach(element => {
            element.checked = input.checked;
        });
    }

    selectDdsarticle(id){
        window.axios({
            method: 'post',
            url: 'ddsarticle/'+ id +'/select',
            data: {refer: 'statistic'}
        }).then((resp) => {

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
        let start_date = document.querySelector('input[name=begin_date]');
        let end_date = document.querySelector('input[name=final_date]');
        start_date.value = this.start_date.getDate() + '.' + (this.start_date.getMonth() + 1) + '.' + this.start_date.getFullYear();
        end_date.value = this.end_date.getDate() + '.' + ( this.end_date.getMonth() + 1 ) + '.' + this.end_date.getFullYear();

        this.start_date_flatpkr = window.flatpickr("input[name=begin_date]", {
            allowInput: true,
            dateFormat: "d.m.Y",
        });
        this.end_date_flatpkr = window.flatpickr("input[name=final_date]", {
            allowInput: true,
            dateFormat: "d.m.Y",
        });

        this.start_date_mask = window.IMask(start_date, {
                mask: Date,
                min: new Date(1990, 0, 1),
                max: new Date(2030, 0, 1),
                lazy: false
            }
        );
        this.end_date_mask = window.IMask(end_date, {
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

        helper.printDocument('statistic-result', null, JSON.stringify(this.graph_data));
    }

    showResults(form_element) {
        event.preventDefault();

        let formData = new FormData(form_element);

        let count_checked = 0;

        //fix checkboxes
        let checkboxes = document.getElementsByName('entities[]');
        checkboxes.forEach(element => {
            if(element.checked) {
                formData.append('entities[]', element.value);
                count_checked++;
            }
        });

        if(!count_checked) {
            document.querySelector('.statistic-select-all > .box').style.borderColor = 'red';
            return;
        }

        let query_string = new URLSearchParams(formData).toString();

        query_string += '&view_as=json';

        window.goto('/statistic/show?' + query_string);
    }
}

export default statisticPage;
