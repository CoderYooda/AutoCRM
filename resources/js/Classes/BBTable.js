class Table {

    constructor(options){
        this.elem = document.getElementById(options.container);
        this.data = options.data;
        this.header = options.header;
        this.isSelectable = true;
        this.draw();
        this.insertElems();
        this.bodyContainer;
    }

    draw(){
        if(this.elem){
            let container = document.createElement('div');
            container.className = 'bbtable-container';
            container.appendChild(this.drawHeader());
            container.appendChild(this.drawBody());
            this.elem.appendChild(container);
        } else {
            console.log("Не указан контейнер");
        }
    }

    insertElems(){
        this.data.data.forEach((elem) => {
            let bodyElem = document.createElement('div');
            bodyElem.className = 'body-elem';
            bodyElem.setAttribute('id', 'line_' + elem.id);
            bodyElem.setAttribute('onclick', 'alert(123)');
            bodyElem.setAttribute('data-id', elem.id);

            if(this.isSelectable) {
                let cell = document.createElement('div');
                cell.className = 'cell checkbox';
                    let checkbox = document.createElement('input');
                    checkbox.setAttribute('type', 'checkbox');
                    cell.appendChild(checkbox);
                bodyElem.appendChild(cell);
            }

            let count = 0;
            for (const [key, value] of Object.entries(elem)) {
                let cell = document.createElement('div');
                cell.className = 'cell';
                 if(this.header[count].width == 'auto'){
                    cell.style.flex = 1;
                } else {
                    cell.style.width = this.header[count].width + 'px';
                }
                if(this.header[count].min_with){
                    cell.style.minWidth = this.header[count].min_with + 'px';
                }

                let title = document.createElement('div');
                title.className = 'title';
                title.innerText = value;
                cell.appendChild(title);
                bodyElem.appendChild(cell);
                count++;
            }


            this.bodyContainer.appendChild(bodyElem);
        })
    }

    drawHeader(){
        let header = document.createElement('div');
        header.className = 'bbtable-header';

        if(this.isSelectable){
            let header_elem = document.createElement('div');
            header_elem.className = 'header-elem checkbox';
            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            header_elem.appendChild(checkbox);
            header.appendChild(header_elem);
        }

        this.header.forEach((elem) =>{
            let header_elem = document.createElement('div');
            header_elem.className = 'header-elem';

            let title = document.createElement('div');
            title.className = 'title';
            title.innerText = elem.name;

            if(elem.width == 'auto'){
                header_elem.style.flex = 1;
            } else {
                header_elem.style.width = elem.width + 'px';
            }
            if(elem.min_with){
                header_elem.style.minWidth = elem.min_with + 'px';
            }



            header_elem.appendChild(title);

            let arrow = document.createElement('div');
            arrow.className = 'arrow up';
            header_elem.appendChild(arrow);

            header.appendChild(header_elem);
        });


        return header;
    }

    drawBody(){
        this.bodyContainer = document.createElement('div');
        this.bodyContainer.className = 'bbtable-body';
        return this.bodyContainer;
    }

}
class TableItem {

    constructor(elem){
        this.elem = elem;
    }

    draw(){

    }

}
export {Table, TableItem};
