class Helper {

    toggleCheckbox(element) {

        event.preventDefault();

        let target_element = element.parentElement.querySelector('input');

        console.log(target_element, target_element.checked, !target_element.checked);

        target_element.checked = !target_element.checked;
    }

    triggerClick(element) {

        if(event.target.classList.contains('favour') || event.target.classList.contains('info')) {
            return;
        }

        element.querySelector('.redirect_link').click();
    }

    createElementFromHTML(htmlString) {
        let div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }

    togglePreloader(element, status) {

        if(element.tagName.toLowerCase() == 'input') {
            element = element.closest('div');
        }

        let classList = element.classList;

        status ? classList.add('preloader') : classList.remove('preloader');
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