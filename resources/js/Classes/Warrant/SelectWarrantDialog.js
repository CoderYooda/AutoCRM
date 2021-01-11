import Modal from "../Modal/Modal";

class selectWarrantDialog extends Modal {

    constructor(dialog) {
        super(dialog);
        console.log('Окно выбора ордера инициализировано');
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

        document.addEventListener('WarrantSelected', () => {
            this.finitaLaComedia(true);
        });
    }

    search(page = null) {

        let search_input = this.current_dialog.querySelector('[name="search"]');
        let warrant_input = this.current_dialog.querySelector('[name="isIncoming"]');
        let refer_input = this.current_dialog.querySelector('[name="refer"]');

        let url = page == null ? '/warrants' : page;

        axios.get(url, {
            params: {
                search: search_input.value,
                isIncoming: warrant_input.value,
                refer: refer_input.value
            }
        })
            .then(response => {
                let data = response.data;

                let list_element = this.current_dialog.querySelector('#search_warrant_results');

                list_element.innerHTML = data.html;
            });

    }
}

export default selectWarrantDialog;
