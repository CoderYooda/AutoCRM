class Helper {

    triggerClick(element) {

        if(event.target.classList.contains('favour') || event.target.classList.contains('info')) {
            return;
        }

        element.querySelector('.redirect_link').click();
    }

    togglePreloader(element, status) {
        let classList = element.classList;
        if(!classList.contains('preloader-block')) classList.add('preloader-block');
        status ? classList.add('active') : classList.remove('active');
    };

    removeElementsByClass(className){
        let elements = document.getElementsByClassName(className);
        while(elements.length > 0)elements[0].parentNode.removeChild(elements[0]);
    }

    removeClassesByClass(className){
        let elements = document.getElementsByClassName(className);
        while(elements.length) elements[0].classList.remove(className);
    }

    debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
}

export default Helper;
