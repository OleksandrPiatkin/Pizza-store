const root = document.getElementById('root');
const rootMainPage = document.getElementById('root_main_page');
const gridViewBtn = document.getElementById('grid_button');
const listViewBtn = document.getElementById('list_button');
const mainManuBtn = document.getElementById('main_page_btn');
const productsManuBtn = document.getElementById('products_page_btn');
const mainImgBtn = document.getElementById('img_btn_main');
const chooseGridBtn = document.getElementById('choose_grid');
const chooseListBtn = document.getElementById('choose_list');
const nameFilterBtn = document.getElementById('name_filter_button');
const priseFilterBtn = document.getElementById('prise_filter_button');
const headerSearchInp = document.getElementById('header_search');
const searchForm = document.getElementById('search_form');

const listStyle = `
.content_products {
display: block;
}
.content_products article {
width: 60%;
min-width: 400px;
min-height: 100%;
margin-bottom: 1em;
}
.content_products article {
    display: flex;
    align-items: center;
    justify-content: left;
}

.content_products article h2,
.content_products article span {
    margin: 0 1em;
    display: inline-block;
}
.content_products article span {
    margin-left: auto;
}
.content_products article p {
    display: none;
}
.content_products article canvas {
    margin: 0.5em 0;
    width: 100px;
    height: 50px;
}
`;
const hideMainSectionStyle = `
    .content_start {
        display: none;
    }
    .search-bar {
        opacity: 1;
    }
    .content_products_grop {
        display: none;
    }
`;
const choosingViewStyle = `
    .content_choose {
        display: flex;
    }
`;

const drowProducts = function () {
    while (i < products.length) {
        new PizzaCard();
    }
    arr.forEach(pizza => pizza.createProductCard());
};
const parametersCalculation = function (ingredients) {

    // pizza dough price & calories
    let price = 5;
    let calories = 250;
    let canvasCode = [];

    if (ingredients.indexOf("Tomato sauce") >= 0) {
        price += 2;
        calories += 33;

        function tomatoSos() {
            ctx.beginPath();
            ctx.arc(100, 75, 65, 0, 2 * Math.PI, true);
            ctx.fillStyle = 'red';
            ctx.fill();
        }
        canvasCode.push(tomatoSos);
    }
    if (ingredients.indexOf("mozzarella") >= 0) {
        price += 4;
        calories += 242;
        canvasCode.push(2);
    }
    if (ingredients.indexOf("oregano") >= 0) {
        price += 2;
        calories += 10;
        canvasCode.push(3);
    }
    if (ingredients.indexOf("garlic") >= 0) {
        price += 1;
        calories += 10;
        canvasCode.push(4);
    }
    if (ingredients.indexOf("basil") >= 0) {
        price += 2;
        calories += 8;
        canvasCode.push(5);
    }
    if (ingredients.indexOf("mushrooms") >= 0) {
        price += 4;
        calories += 46;
        canvasCode.push(6);
    }
    if (ingredients.indexOf("ham") >= 0) {
        price += 6;
        calories += 270;
        canvasCode.push(7);
    }
    if (ingredients.indexOf("artichokes") >= 0) {
        price += 5;
        calories += 14;
        canvasCode.push(8);
    }
    if (ingredients.indexOf("olives") >= 0) {
        price += 3;
        calories += 21;
        canvasCode.push(9);
    }
    if (ingredients.indexOf("oregano") >= 0) {
        price += 4;
        calories += 7;
        canvasCode.push(10);
    }
    if (ingredients.indexOf("parmesan") >= 0) {
        price += 4;
        calories += 122;
        canvasCode.push(11);
    }
    if (ingredients.indexOf("eggs") >= 0) {
        price += 2;
        calories += 75;
        canvasCode.push(12);
    }
    if (ingredients.indexOf("bacon") >= 0) {
        price += 7;
        calories += 310;
        canvasCode.push(13);
    }
    if (ingredients.indexOf("seafood") >= 0) {
        price += 13;
        calories += 325;
        canvasCode.push(14);
    }
    if (ingredients.indexOf("gorgonzola") >= 0) {
        price += 8;
        calories += 190;
        canvasCode.push(15);
    }
    if (ingredients.indexOf("Parma ham") >= 0) {
        price += 12;
        calories += 310;
        canvasCode.push(16);
    }
    if (ingredients.indexOf("anchovies") >= 0) {
        price += 6;
        calories += 60;
        canvasCode.push(17);
    }
    if (ingredients.indexOf("onions") >= 0) {
        price += 1;
        calories += 21;
        canvasCode.push(18);
    }
    if (ingredients.indexOf("pepperoni") >= 0) {
        price += 4;
        calories += 7;
        canvasCode.push(19);
    }
    if (ingredients.indexOf("soft cheese") >= 0) {
        price += 11;
        calories += 190;
        canvasCode.push(20);
    }
    if (ingredients.indexOf("eggplant") >= 0) {
        price += 5;
        calories += 12;
        canvasCode.push(21);
    }
    if (ingredients.indexOf("boiled potatoes") >= 0) {
        price += 2;
        calories += 30;
        canvasCode.push(22);
    }
    if (ingredients.indexOf("sausage") >= 0) {
        price += 9;
        calories += 290;
        canvasCode.push(23);
    }
    if (ingredients.indexOf("capers") >= 0) {
        price += 4;
        calories += 5;
        canvasCode.push(24);
    }
    if (ingredients.indexOf("peppers") >= 0) {
        price += 4;
        calories += 7;
        canvasCode.push(25);
    }
    if (ingredients.indexOf("peas") >= 0) {
        price += 6;
        calories += 42;
        canvasCode.push(26);
    }
    if (ingredients.indexOf("porchetta") >= 0) {
        price += 9;
        calories += 210;
        canvasCode.push(27);
    }
    if (ingredients.indexOf("Olive oil") >= 0) {
        price += 3;
        calories += 70;
        canvasCode.push(28);
    }
    if (ingredients.indexOf("rosemary") >= 0) {
        price += 5;
        calories += 14;
        canvasCode.push(29);
    }
    return [price, calories, canvasCode];
};
const coppyArrey = function (arr) {
    return arr.slice();
};