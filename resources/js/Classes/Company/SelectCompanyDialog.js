import Modal from "../Modal/Modal";

class selectCompanyDialog extends Modal {

    constructor(dialog, response) {
        super(dialog);
        console.log('Окно выбора компании инициализировано');
        this.init();

        this.companies = response.companies.data;
    }

    init() {
        this.debounceSearch = window.helper.debounce(() => {
            this.search();
        }, 400);

        document.addEventListener("CompanySelected", () => {
            this.finitaLaComedia();
        });
    }

    selectCompany(company_id) {

        let selected_company = null;

        Object.values(this.companies).forEach((company, index) => {
            if(company.id == company_id) selected_company = company;
        });

        let refer_element = this.current_dialog.querySelector('[name="refer"]');
        let referDialog = refer_element.value;

        window[referDialog].selectCompany(selected_company);
    }

    search() {
        let search_element = this.current_dialog.querySelector('[name="search"]');
        let refer_element = this.current_dialog.querySelector('[name="refer"]');

        axios.get('/admin/companies/search', {
            params: {
                inner: 1,
                refer: refer_element.value,
                search: search_element.value
            }
        })
        .then(response => {

            console.log(response);

            let data = response.data;

            let list_element = this.current_dialog.querySelector('#search_results');

            list_element.innerHTML = data.html;

            this.companies = data.companies.data;
        })
        .catch(response => {

        });
    }
}

export default selectCompanyDialog;
