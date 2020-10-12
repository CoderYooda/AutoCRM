class Helper {

    togglePreloader(element, status) {
        let classList = element.classList;
        if(!classList.contains('preloader-block')) classList.add('preloader-block');
        status ? classList.add('active') : classList.remove('active');
    };

    removeElementsByClass(className){
        let elements = document.getElementsByClassName(className);
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    removeClassesByClass(className){
        let elements = document.getElementsByClassName(className);
        while(elements.length > 0){
            elements[0].classList.remove(className);
        }
    }
}

export default Helper;
