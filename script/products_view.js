const choosingViewCall = function () {
    const styleCheck = document.getElementById('hide_main_section');
    if (styleCheck == null) {
    const style = document.createElement('style');
    style.id = 'hide_main_section';
    style.innerHTML = hideMainSectionStyle;
    document.head.appendChild(style);
    }
    const styleCheck2 = document.getElementById('delete_first_view');
    if (styleCheck2 == null) {
    const style = document.createElement('style');
    style.id = 'delete_first_view';
    style.innerHTML = choosingViewStyle;
    document.head.appendChild(style);
    }
};

mainImgBtn.onclick = function () {
    mainManuBtn.className = '';
    productsManuBtn.className = 'current';
    choosingViewCall();
};

productsManuBtn.onclick = function () {
    mainManuBtn.className = '';
    productsManuBtn.className = 'current';
    const styleCheck = document.getElementById('content_products_grop'); 
    if (styleCheck == null) {
       choosingViewCall(); 
    } 
};

mainManuBtn.onclick = function () {
    mainManuBtn.className = 'current';
    productsManuBtn.className = '';

    const hideStyle = document.getElementById('hide_main_section');
        if (hideStyle != null) {
            hideStyle.remove();
        }
    const labledStyle = document.getElementById('delete_first_view');
        if (labledStyle != null) {
            labledStyle.remove();
        }
    const labledStyle2 = document.getElementById('delete_lable');
        if (labledStyle2 != null) {
            labledStyle2.remove();
        }
    const labledStyle3 = document.getElementById('content_products_grop');
        if (labledStyle3 != null) {
            labledStyle3.remove();
        }
};

chooseGridBtn.onclick = function () {

    const labledStyle = document.getElementById('delete_first_view');
    if (labledStyle != null) {
        labledStyle.remove();
    }
    const styleCheck = document.getElementById('content_products_grop');
    if (styleCheck == null) {
        const style = document.createElement('style');
        style.id = 'content_products_grop';
        style.innerHTML = `
            .content_products_grop {
                display: block;
            }
        `;
        document.head.appendChild(style);
    }

    root.innerHTML = '';

    drowProducts();
};

chooseListBtn.onclick = function () {

    const labledStyle = document.getElementById('delete_first_view');
    if (labledStyle != null) {
        labledStyle.remove();
    }

    const styleCheck = document.getElementById('content_products_grop');
    if (styleCheck == null) {
        const style = document.createElement('style');
        style.id = 'content_products_grop';
        style.innerHTML = `
            .content_products_grop {
                display: block;
            }
        `;
        document.head.appendChild(style);
    }

    root.innerHTML = '';

    drowProducts();

    gridViewButton.className = "switch-button";
    listViewButton.className = "switch-button on";

    const styleCheck2 = document.getElementById('delete_lable')
    if (styleCheck2 == null) {
    const style = document.createElement('style');
    style.id = "delete_lable";
    style.innerHTML = listStyle;
    document.head.appendChild(style);
    }
};

