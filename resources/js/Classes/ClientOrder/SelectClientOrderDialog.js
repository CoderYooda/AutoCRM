import Modal from "../Modal/Modal";

class selectClientOrderDialog extends Modal {

    constructor(dialog) {
        super(dialog);
        console.log('Окно выбора заказа клиента инициализировано');
        this.init();
    }

    init() {

        this.debounceSearch = window.helper.debounce(() => {
            this.search();
        }, 400);

        let input_search = this.current_dialog.querySelector('[name="search"]');

        input_search.addEventListener('keyup', () => {
            this.debounceSearch();
        });

        document.addEventListener('ClientOrderSelected', event => {
            this.finitaLaComedia(true);
        });
    }

    search(page = null) {

        let search_input = this.current_dialog.querySelector('[name="search"]');
        let refer_input = this.current_dialog.querySelector('[name="refer"]');

        let url = page == null ? '/clientorders' : page;

        axios.get(url, {
            params: {
                search: search_input.value,
                refer: refer_input.value
            }
        })
            .then(response => {
                let data = response.data;

                let list_element = this.current_dialog.querySelector('#search_client_order_results');

                list_element.innerHTML = data.html;
            });

    }
}

export default selectClientOrderDialog;
