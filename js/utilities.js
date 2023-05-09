export function hide(element){
    element.classList.add('hide');
    
}

export function show(element){
    element.classList.remove('hide');

}

export function showDetail(element){
    element.classList.add('show');
}

export function hideDetail(element){
    element.classList.remove('show');
}

export function hideAll(elements){
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('hide');
    }
}

export function showAll(elements){
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('hide');
    }
}
export function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
}

// showing loading
export function displayLoading(loader) {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

// hiding loading 
export function hideLoading(loader) {
    loader.classList.remove("display");
}


export const noImage = "'images/no-image.png'";
export const apiKey = "30dd60f5";
