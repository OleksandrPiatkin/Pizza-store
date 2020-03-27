const root = document.getElementById('root');

let arr = [];

const coppyArray = function (arr) {
    return arr.slice();
};

const fillProductsArr = function () {
    let i = 0;
    while (i < products.length) {
        const pizza = new PizzaCard(products[i], ingredientsData);
        i++;
        arr.push(pizza);
    }
};

const drowProducts = function () {
    arr.forEach(pizza => pizza.createProductCard());
};

const parametersCalculation = function (ingredients) {
    // pizza dough price & calories
    let countedPrice = 5;
    let countedCalories = 250;

    ingredients.forEach((item) => {
        const ingredient = item;

        ingredientsData.forEach((element) => {
            if (element.name == ingredient) {
                countedPrice += element.price;
                countedCalories += element.calories;
            }
        })
    })
    return [countedPrice, countedCalories];
};

class PizzaCard {
    constructor({ name, ingredients }, ingredientsData) {
        this.name = name;
        this.ingredients = ingredients;
        this.parameters = parametersCalculation(this.ingredients);
        this.price = this.parameters[0];
        this.calories = this.parameters[1];
    }

    createProductCard() {

        const article = document.createElement('article');
        root.appendChild(article);

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(100, 75, 75, 0, 2 * Math.PI, true);
        ctx.fillStyle = '#F57F17';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(100, 75, 70, 0, 2 * Math.PI, true);
        ctx.fillStyle = '#FBC02D';
        ctx.fill();
        article.appendChild(canvas);

        const header = document.createElement('h2');
        header.innerHTML = this.name;
        article.appendChild(header);

        const description = document.createElement('ul');
        article.appendChild(description);

        const ingredientsD = document.createElement('li');
        const ingredientsStr = `Ingredients: ${this.ingredients.join(', ')}.`;
        ingredientsD.innerHTML = ingredientsStr;
        description.appendChild(ingredientsD);

        const caloriesD = document.createElement('li');
        const caloriesStr = `Calories: ${this.calories} kcal`;
        caloriesD.innerHTML = caloriesStr;
        description.appendChild(caloriesD);

        const priceD = document.createElement('li');
        const priceStr = `Price: ${this.price}`;
        priceD.innerHTML = priceStr;
        description.appendChild(priceD);
    }
}

fillProductsArr();
let copiedArrey = coppyArray(arr);

//Products view changing
const gridViewBtn = document.getElementById('grid_button');
const listViewBtn = document.getElementById('list_button');

const switchViewType = function () {
    gridViewBtn.classList.toggle('on');
    listViewBtn.classList.toggle('on');
}

const gridView = function () {
    if (gridViewBtn.className == "switch-button") {
        switchViewType();
        root.classList.remove('list_view');
    }
};

const listView = function () {
    if (listViewBtn.className == "switch-button") {
        switchViewType();
        root.classList.add('list_view');
    }
};

listViewBtn.addEventListener('click', listView);
gridViewBtn.addEventListener('click', gridView);

//Products view
const mainManuBtn = document.getElementById('main_page_btn');
const productsManuBtn = document.getElementById('products_page_btn');
const mainImgBtn = document.getElementById('img_btn_main');
const startContent = document.getElementById('content_start');
const contentProductsControl = document.getElementById('content_products_control');
const contentChoose = document.getElementById('content_choose');
const h1 = document.getElementById('h_1');

let firstView = true;

const productsCall = function () {

    const productsOn = function () {
        startContent.classList.add('hidden');
        h1.classList.add('hidden');
        productsManuBtn.classList.add('on');
        mainManuBtn.classList.remove('on');
    };

    if (firstView) {
        contentChoose.classList.remove('hidden');
        productsOn();
        firstView = false;
    } else {
        if (mainManuBtn.classList == 'on') {
            root.classList.remove('hidden');
            productsOn();
            contentProductsControl.classList.remove('hidden');
        }
    }
};
mainImgBtn.addEventListener('click', productsCall);
productsManuBtn.addEventListener('click', productsCall);



const mainCall = function () {
    if (mainManuBtn.className == '') {
        mainManuBtn.className = 'on';
        productsManuBtn.className = '';
        startContent.classList.remove('hidden');
        h1.classList.remove('hidden');
        root.classList.add('hidden');
        contentProductsControl.classList.add('hidden');
    }

};
mainManuBtn.addEventListener('click', mainCall);

const chooseGridBtn = document.getElementById('choose_grid');
const chooseListBtn = document.getElementById('choose_list');

const chooseGrid = function () {
    contentChoose.classList.add('hidden');
    contentProductsControl.classList.remove('hidden');
    root.classList.remove('hidden');
    root.innerHTML = '';
    drowProducts();
};

const chooseList = function () {
    root.classList.add('list_view');
    chooseGrid();
    gridViewBtn.classList.remove('on');
    listViewBtn.classList.add('on');
};

chooseListBtn.addEventListener('click', chooseList);
chooseGridBtn.addEventListener('click', chooseGrid);

//Filter part ------>
const nameFilterBtn = document.getElementById('name_filter_button');
const priceFilterBtn = document.getElementById('prise_filter_button');


const filtredByName = function () {
    const filtr = coppyArray(copiedArrey).sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
    });
    return filtr;
}

const filtredByPrice = function () {
    const filtr = coppyArray(copiedArrey).sort((a, b) => {
        return a.price - b.price;
    });
    return filtr;
}

const filterFunc = function (buttonOn, buttonOff, filter) {

    if (buttonOn.className == 'switch-filter') {
        buttonOn.classList.add('on');
        buttonOff.classList.remove('on');
        root.innerHTML = '';
        filter().forEach(pizza => pizza.createProductCard());
    } else {
        root.innerHTML = '';
        buttonOn.classList.remove('on');
        copiedArrey.forEach(pizza => pizza.createProductCard());
    }
};
const filterFuncName = function () { filterFunc(nameFilterBtn, priceFilterBtn, filtredByName); };
const filterFuncPrice = function () { filterFunc(priceFilterBtn, nameFilterBtn, filtredByPrice); };

priceFilterBtn.addEventListener('click', filterFuncPrice);
nameFilterBtn.addEventListener('click', filterFuncName);

// search by ingredients Form
const headerSearchInp = document.getElementById('header_search');
const searchForm = document.getElementById('search_form');
const errorMessage = document.getElementById("error");

const filterForSearch = function () {
    if (nameFilterBtn.className == 'switch-filter on') {
        nameFilterBtn.className.remove('on');
        filterFuncName();
    } else if ( priceFilterBtn.className == 'switch-filter on') {
        priceFilterBtn.className.remove('on');
        filterFuncPrice();
    } else {
        copiedArrey.forEach(pizza => pizza.createProductCard());
    }
};

searchForm.onsubmit = function () {
    firstView = false;
    if (mainManuBtn.className == 'on') { productsCall(); }
    if (errorMessage.classList == "error") {
        errorMessage.classList.add("hidden");
    }
    const searchRequest = headerSearchInp.value;
    root.innerHTML = '';
    copiedArrey = [];

    coppyArray(arr).forEach((element) => {

        if (element.ingredients.reduce(function (result, name) {
            const searchLower = searchRequest.toLowerCase();
            const elementName = name.toLowerCase();
            const check = elementName.indexOf(searchLower) + 1;

            return result + check;
        }, 0)
        ) {
            copiedArrey.push(element);
        }
    });

    if (copiedArrey.length != 0) {
        filterForSearch();
    } else {
        errorMessage.classList.remove("hidden");
    }
};

// reset search
const resetBtn = document.getElementById('reset_button');
const resetSearchItems = function () {
    copiedArrey = coppyArray(arr);
    root.innerHTML = '';
    nameFilterBtn.className = 'switch-filter';
    priceFilterBtn.className = 'switch-filter';
    drowProducts();
}
resetBtn.addEventListener('click', resetSearchItems);