import Page from "../Page/Page";

class storecatalogsPage extends Page{

    constructor(){
        super('ajax-table-catalog');
        console.log('страница каталогов инициализировано');
        this.defines();
    }

    defines(){
        this.active = true;
        this.active_tab = 'catalogue';

        this.marksPage = document.getElementById('marksPage');
        this.tabsCont = document.getElementById('tabs-cont');
        this.marks = [];
        this.marks_elems = [];
        this.tabs = [];
        this.searches = document.querySelectorAll('.search_link');
        this.search_array = [];
        this.search_container = document.getElementById('search_dd');
        this.search_butt = document.getElementById('search_butt');
        this.favour_block = document.getElementById('favour-block');
        this.vin_block = document.getElementById('vin_dd');
        this.vin_searcher = document.getElementById('vin_searcher');
        this.favour_button = document.getElementById('favour_button');

        this.imgareaContainer = document.getElementById('imageArea');
        this.imageLayout = document.getElementById('imageLayout');

        this.levels = document.querySelectorAll('.level');
        this.init();
    }

    addFavour(elem){
        event.preventDefault();
        let link = elem.closest('.search_link');
        window.axios({
            method: 'post',
            url: '/store/catalogs/add_favour',
            data: {
                name: link.dataset.search_name,
                search: link.dataset.search_name.toLowerCase().replace(/\s/g, ''),
                link: link.querySelector('a').getAttribute('href'),
                img_link: link.querySelector('img').getAttribute('src'),
            }
        }).then(function (resp) {
            console.log(resp);
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    }

    toggleFavour(){
        this.favour_block.classList.toggle('hide');
        this.favour_button.classList.toggle('active');
    }

    unsearch(){
        setTimeout(()=>{
            this.search_container.classList.add('hide');
        }, 250);

    }

    getByVin(form, event){
        event.preventDefault();
        event.stopPropagation();
        let data = new FormData(form);
        window.axios({
            method: 'post',
            url: '/store/catalogs/getByVin',
            data: data
        }).then( (resp) => {
            this.vin_block.innerHTML = resp.data.html;
            this.vin_block.classList.remove('hide');
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            window.isXHRloading = false;
        });
    }
    searchFocus(){
        this.search_container.classList.remove('hide');
    }
    searchOnPage(text){
        let results = this.search_array.filter(
            x => x.search.indexOf(text.toLowerCase().replace(/\s/g, '')) + 1
        );
        let ol = this.search_container.querySelector('ol');
        this.search_container.classList.remove('hide');

        ol.innerHTML = '';
        results.forEach((item)=>{
            let li = document.createElement('li');
            li.classList.add('search');
            let a = document.createElement('a');
            a.innerText = item.name;
            a.setAttribute('href', item.link);
            li.appendChild(a);
            ol.appendChild(li);
        });
        console.log(results);
    }

    initMarks(){
        if(this.marksPage){
            this.marksPage.querySelectorAll('.mark_type').forEach((item)=>{
                this.marks_elems.push(item);
                item.classList.add('hide');
                this.marks.push({
                    type: item.dataset.type,
                    name: item.dataset.name,
                })
            });
            if(this.tabsCont){
                this.marks.forEach((item) => {
                    let tab = document.createElement('a');
                    tab.addEventListener('click', (e)=>{
                        this.showTab(e.target, item.type);
                    });
                    tab.innerText = item.name;
                    this.tabs.push(tab);
                    this.tabsCont.appendChild(tab);
                })
            }
            this.tabs[0].click();
        }
        if(this.searches){
            this.searches.forEach((link)=>{
                this.search_array.push({
                    name: link.dataset.search_name,
                    search: link.dataset.search_name.toLowerCase().replace(/\s/g, ''),
                    link: link.querySelector('a').getAttribute('href'),
                })
            })
        }
    }
    showTab(tab, type)  {
        this.tabs.forEach((item) => {
            item.classList.remove('active');
        });
        this.marks_elems.forEach((elem) => {
            elem.classList.remove('active');
        });
        tab.classList.add('active');
        document.querySelector('[data-type=' + type + ']').classList.add('active');
    }
    init(){
        this.initMarks();

        if(this.imgareaContainer){
            this.initImage()
        }

        window.addEventListener('click',  (e) => {
            if(this.favour_block){
                if (!this.favour_block.contains(e.target) && !this.favour_button.contains(e.target)) {
                    this.favour_block.classList.add('hide');
                }
            }
            if(this.favour_button) {
                if (!this.favour_button.contains(e.target)) {
                    this.favour_button.classList.remove('active');
                }
            }
        });

        window.addEventListener('click',  (e) => {
            if (!this.search_container.contains(e.target) && !this.search_butt.contains(e.target)) {
                this.search_container.classList.add('hide');

            }
        });

        window.addEventListener('click',  (e) => {
            if (!this.vin_block.contains(e.target) && !this.vin_searcher.contains(e.target)) {
                this.vin_block.classList.add('hide');
            }
        });

        this.initLevels();
    }

    initImage(){

        this.tmpImg = new Image();
        this.tmpImg.src = this.imageLayout.querySelector('img').getAttribute('src');

        console.log(this.imgareaContainer);

        this.imgAreaWidth = parseInt(this.imgareaContainer.offsetWidth);
        this.imgAreaHeight = parseInt(this.imgareaContainer.offsetHeight);

        this.tmpImg.onload =  (e) => {



            let tmpImgWidth = parseInt(this.tmpImg.width);
            let tmpImgHeight = parseInt(this.tmpImg.height);

            console.log(this.imgAreaWidth , tmpImgWidth);

            let scaleX = this.imgAreaWidth / tmpImgWidth;
            let scaleY = this.imgAreaHeight / tmpImgHeight;

            let zoom = Math.min.apply(null, [scaleX, scaleY]) * 1;


            let origin = Math.min.apply(null, [scaleX, scaleY]) * 1;
            let left = (this.imgAreaWidth - tmpImgWidth) / 2;
            let top = (this.imgAreaHeight - tmpImgHeight) / 2;



            this.imageLayout.style.transform = 'scale(' + zoom + ', ' + zoom + ')';
            this.imageLayout.style.top = top + 'px';
            this.imageLayout.style.left = left + 'px';

            this.imageLayout.classList.remove('hide');
        };







        // let zoom = Math.min.apply(null, [scaleX, scaleY]) * 1;
        // left = (imgAreaWidth - tmpImgWidth) / 2;
        // top = (imgAreaHeight - tmpImgHeight) / 2;

        // console.log(1);
    }

    initLevels(){
        this.levels.forEach((level)=>{
            level.querySelector('.push').addEventListener('click', (el)=>{
                level.querySelector('.dropdown').classList.toggle('hide');
            })
        })
    }

    linked(){ //Состояние Linked - когда экземпляр класса уже был загружен, и находится в памяти. (Возвращение на страницу)
        this.defines();
    }
}
export default storecatalogsPage;
