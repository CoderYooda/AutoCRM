import Modal from "../Modal/Modal";

class selectShipmentDialog extends Modal {

    constructor(dialog) {
        super(dialog);
        console.log('Окно штрихкода инициализировано');
        this.refer = dialog.querySelector("#refer").value;
        if (dialog.querySelector("#target")) {
            this.target = dialog.querySelector("#target").value;
        } else {
            this.target = null;
        }
        this.new_btn = dialog.querySelector("#new_btn");
        this.search_obj = dialog.querySelector("#selectshipment_search");
        this.search_str = null;
        this.select_shipment_cont = this.root_dialog.querySelector('.cont');
        this.select_shipment_container = this.root_dialog.querySelector('#select_shipment_container');

        this.active = true;
        this.init();
        //shipmentStored
    }

    init() {
        let object = this;
        this.searchInit();

        document.addEventListener("ShipmentSelected", function () {
            object.finitaLaComedia();
        });

        let focused = document.getElementById('select_shipment_dialog_focused');
        if (focused) focused.focus();

    }

    searchInit() {
        let object = this;
        let el = object.root_dialog.querySelector("#selectshipment_search");
        let searchFn = window.helper.debounce(function (e) {
            object.search(object);
        }, 400);
        if (el) {
            el.addEventListener("keydown", searchFn);
            el.addEventListener("paste", searchFn);
            el.addEventListener("delete", searchFn);
        }

        object.root_dialog.addEventListener("ShipmentStored", function () {
            object.search(object);
        });
    }

    search(object) {
        //var string = el.value;

        if (isXHRloading) return;

        window.isXHRloading = true;

        let data = {};
        data.inner = true;
        data.string = object.search_obj.value;
        data.category_id = object.category_id;
        if (object.refer) {
            data.refer = object.root_dialog.querySelector("#refer").value;
        }
        if (object.target) {
            data.target = object.root_dialog.querySelector("#target").value;
        }
        window.axios({
            method: 'post',
            url: 'shipment/dialog/search',
            data: data,
        }).then(function (resp) {

            var results_container = document.querySelector('#search_shipment_results');
            results_container.innerHTML = resp.data.html;

        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            window.isXHRloading = false;
            document.removeEventListener("shipmentStored", function () {
                console.warn(object.root_dialog.querySelector("#refer").value);
                object.search(object);
            });
        });
    }

    shipmentDescription(shipment) {

        this.select_shipment_container.classList.add('show');

        let html = '';

        Object.values(shipment.products).forEach(item => {
            let p_article = item.article;
            let p_count = item.pivot.count;
            let p_name = item.name;

            html += '<div class="tr_result">' +
                '<span class="article">' + p_name + '</span>' +
                '<span class="article">Кол-во: ' + p_count + '</span>' +
                '<span class="article">Артикул: ' + p_article + '</span>' +
                '</div>'
        });

        this.select_shipment_cont.innerHTML = html;

        let empty_desc = this.root_dialog.querySelector('.empty_desc');

        if(html.length) {
            empty_desc.classList.add('d-none');
        }
        else {
            empty_desc.classList.remove('d-none');
        }

    }
}

export default selectShipmentDialog;
