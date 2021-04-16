import TextEditor from '@artemminos/ckeditor';
import '@artemminos/ckeditor/build/ru';
import uploadAdapterPlugin from './CkEditor/plugin';
class Information{

    constructor(){
        this.container =  document.querySelector("#information_list");
        this.init();
        console.log('Окно информации подключено');
        this.source = null;
    }

    init() {
        let modal_html = document.getElementById('information');

        let user_view = this.container.querySelector('#user_view');
        let admin_view = this.container.querySelector('#admin_view');

        let options = {
            backdrop: true,
            keyboard: true,
        };
        if(modal_html){
            this.modal = new bootstrap.Modal(modal_html, options);
        }

    }
    initTextEditor() {

        const config = {
            uploadAdapterPlugin: {
                url: 'info/upload_image',
            },
            link: {
                decorators: {
                    isExternal: {
                        mode: 'automatic',
                        callback: url => !url.includes(window.location.host),
                        attributes: {
                            target: '_blank',
                            rel: 'noopener noreferrer nofollow',
                            class: 'external'
                        }
                    },
                    isDownloadable: {
                        mode: 'manual',
                        label: 'загрузка',
                        attributes: {
                            download: 'file.png'
                        }
                    }
                }
            },
            toolbar: {
                items: [
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'imageUpload',
                    'ImageResize',
                    'heading',
                    'mediaEmbed'
                ]
            },
            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                    { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                    { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                    { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                ]
            },
            table: {
                contentToolbar: [
                    'tableColumn',
                    'tableRow',
                    'mergeTableCells'
                ]
            },
            extraPlugins: [uploadAdapterPlugin],
            language: 'ru',
            mediaEmbed: {
                previewsInData: true
            }
        };

        let editor_element = this.container.querySelector('#editor');
        if (editor_element) {
            TextEditor.create(editor_element, config)
                .then(newEditor => {
                    this.texteditor = newEditor
                    window.texteditor = this.texteditor
                });
        }
    }

    loadInfo(source) {
        let object = this
        this.source = source;
        axios({
            method: 'get',
            url: '/info/get_info_by_' + source
        }).then((resp) => {
            object.container.innerHTML = resp.data.html;
            object.modal.show();
            this.initTextEditor();
        }).catch(function (error) {
            console.warn(error);
        });
    }

    editInfo(){
        user_view.classList.add('hide');
        admin_view.classList.remove('hide');
    }

    saveInfo(element){
        let data = {
            info: this.texteditor.getData(),
            source:this.source
    };
        axform.send(element, response => {
            if (response.status == 200) {
                this.loadInfo(this.source);
                admin_view.classList.add('hide');
                user_view.classList.remove('hide');
            }
        }, null, data);
    }

}
export default Information;
