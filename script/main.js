const root = document.getElementById('root');
const cartRoot = document.getElementById('cart_root');
const customRoot = document.getElementById('custom_root');
const customName = document.getElementById('custom_name');
const customCalories = document.getElementById('custom_calories');
const customPrice = document.getElementById('custom_price');

let arr = [];
let customerCartArr = [];

const fillProductsArr = () => {

    for (let i = 0; i < products.length; i++) {
        const pizza = new PizzaCard(products[i]);
        arr.push(pizza);
    }
};

const renderPizza = arr => arr.forEach(pizza => pizza.createProductCard());

const parametersCalculation = ingredients => {
    // pizza dough price & calories
    let countedPrice = 5;
    let countedCalories = 250;

    ingredients.forEach(ingredient => {

        ingredientsData.forEach((element) => {
            if (element.name == ingredient) {
                countedPrice += element.price;
                countedCalories += element.calories;
            }
        })
    })
    return { countedPrice, countedCalories };
};

class PizzaCard {
    constructor({ name, ingredients, amount = 1, id = arr.length }) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        const { countedPrice, countedCalories } = parametersCalculation(this.ingredients);
        this.price = countedPrice;
        this.calories = countedCalories;
        this.amount = amount;
    }

    backgroundStyle() {
        const reverseArr = [...this.ingredients].reverse();
        let bgStyle = '';
        reverseArr.forEach(element => {
            bgStyle += `url(./img/${element.replace(' ', '_')}.svg) no-repeat center, `;
        });
        return bgStyle;
    }

    createBasicChar(articleFront) {
        const header = document.createElement('h3');
        header.innerHTML = this.name;
        articleFront.appendChild(header);

        const description = document.createElement('ul');
        articleFront.appendChild(description);

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

    createProductCard() {
        const cardWrap = document.createElement('div');
        cardWrap.className = 'card_wrapper';
        cardWrap.id = this.id;
        root.appendChild(cardWrap);

        // front
        const articleFront = document.createElement('article');
        articleFront.className = 'front';
        cardWrap.appendChild(articleFront);

        const listImg = document.createElement("img");
        listImg.className = 'list_icon';
        articleFront.appendChild(listImg);

        this.createBasicChar(articleFront);

        const editBtn = document.createElement('button');
        editBtn.classList = 'edit_button';
        editBtn.innerHTML = 'Edit';
        articleFront.appendChild(editBtn);

        const addBtn = document.createElement('button');
        addBtn.classList = 'add_button';
        addBtn.innerHTML = 'Add to cart';
        articleFront.appendChild(addBtn);

        //back
        const articicleBack = document.createElement('article');
        articicleBack.className = 'back';

        const backStyle = `background: ${this.backgroundStyle()}url(./img/base.svg) no-repeat center;`;

        articicleBack.style = backStyle;
        cardWrap.appendChild(articicleBack);
    }

    renderControlGroup(controlContainer, obj) {
        const deleteBtn = document.createElement('button');
        deleteBtn.classList = 'delete_button';
        deleteBtn.innerHTML = '-';
        controlContainer.appendChild(deleteBtn);

        const ammount = document.createElement('span');
        ammount.innerHTML = obj.amount;
        controlContainer.appendChild(ammount);

        const plussBtn = document.createElement('button');
        plussBtn.classList = 'pluss_button';
        plussBtn.innerHTML = '+';
        controlContainer.appendChild(plussBtn);
    }

    createCartCard() {
        const itemArticle = document.createElement('article');
        itemArticle.className = 'cart_item';
        itemArticle.id = this.id;
        cartRoot.appendChild(itemArticle);

        this.createBasicChar(itemArticle);

        const controlGroup = document.createElement('div');
        controlGroup.className = 'item_cart_control';
        itemArticle.appendChild(controlGroup);

        this.renderControlGroup(controlGroup, this);
    }

    getIngredientsAmount() {
        const mappedCopiedData = [...ingredientsData].map(element => ({ ...element, amount: 0 }));

        this.ingredients.forEach(ingredient => {
            let idexIngr;
            mappedCopiedData.forEach(obj => {
                if (obj.name == ingredient) { idexIngr = mappedCopiedData.indexOf(obj); }
            });
            mappedCopiedData[idexIngr].amount += 1;
        });
        return mappedCopiedData;
    }

    renderChooseGroup() {

        customName.innerHTML = this.name;
        customCalories.innerHTML = this.calories;
        customPrice.innerHTML = this.price;
        customRoot.innerHTML = '';

        const ingredientsList = document.createElement('ul');
        ingredientsList.className = 'choose_group';
        ingredientsList.id = this.id;
        customRoot.appendChild(ingredientsList);

        const amountOfIngredients = this.getIngredientsAmount();

        amountOfIngredients.forEach(element => {

            const liElement = document.createElement('li');
            const liClassName = element.name.toLocaleLowerCase();
            const liName = element.name.charAt(0).toUpperCase() + element.name.slice(1);
            liElement.className = `${liClassName.replace(' ', '_')}`;

            this.renderControlGroup(liElement, element)

            const nameSpan = document.createElement('span');
            nameSpan.innerHTML = liName;
            liElement.appendChild(nameSpan);

            ingredientsList.appendChild(liElement);
        });

    }
}

fillProductsArr();

let copiedArray = [...arr];

//Products view changing
const gridViewBtn = document.getElementById('grid_button');
const listViewBtn = document.getElementById('list_button');

const switchViewType = () => {
    gridViewBtn.classList.toggle('on');
    listViewBtn.classList.toggle('on');
};

const gridView = () => {
    if (gridViewBtn.className == "switch-button") {
        switchViewType();
        root.classList.remove('list_view');
    }
};

const listView = (e) => {
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
const productsWrap = document.getElementById('products_wrap');

let firstView = true;

const productsOn = () => {
    startContent.classList.add('hidden');
    productsWrap.classList.remove('hidden');
    customerCartSection.classList.add('hidden');
    productsManuBtn.classList.add('on');
    mainManuBtn.classList = '';
    shoppingCartBtn.className = '';
};

const productsCall = () => {

    if (firstView) {
        contentChoose.classList.remove('hidden');
        productsOn();
        firstView = false;
    } else {
        if (mainManuBtn.classList == 'on' || shoppingCartBtn.classList == 'on') {
            productsOn();
        }
    }
};
mainImgBtn.addEventListener('click', productsCall);
productsManuBtn.addEventListener('click', productsCall);

const mainCall = () => {
    if (mainManuBtn.className == '') {
        mainManuBtn.className = 'on';
        productsManuBtn.className = '';
        shoppingCartBtn.className = '';
        customerCartSection.classList.add('hidden');
        startContent.classList.remove('hidden');
        productsWrap.classList.add('hidden');
    }
};
mainManuBtn.addEventListener('click', mainCall);

const chooseGridBtn = document.getElementById('choose_grid');
const chooseListBtn = document.getElementById('choose_list');

const chooseGrid = () => {
    contentChoose.classList.add('hidden');
    contentProductsControl.classList.remove('hidden');
    root.innerHTML = '';
    renderPizza(arr);
};

const chooseList = () => {
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



const filtredByName = () => {
    const filtr = [...copiedArray].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
    });
    return filtr;
};

const filtredByPrice = () => [...copiedArray].sort((a, b) => a.price - b.price);

const filterFunc = function (btn, filter) {
    const buttonOn = btn;
    const buttonOff = btn === nameFilterBtn ? priceFilterBtn : nameFilterBtn;
    root.innerHTML = '';

    if (buttonOn.className == 'switch-filter') {
        buttonOn.classList.add('on');
        buttonOff.classList.remove('on');
        const filtredArr = filter();
        renderPizza(filtredArr);
    } else {
        buttonOn.classList.remove('on');
        renderPizza(copiedArray);
    }
};
const filterFuncName = () => { filterFunc(nameFilterBtn, filtredByName); };
const filterFuncPrice = () => { filterFunc(priceFilterBtn, filtredByPrice); };

priceFilterBtn.addEventListener('click', filterFuncPrice);
nameFilterBtn.addEventListener('click', filterFuncName);

// search by ingredients Form
const productsSearchInp = document.getElementById('products_search');
const searchForm = document.getElementById('search_form');
const errorMessage = document.getElementById("error");

const filterForSearch = () => {
    if (nameFilterBtn.className == 'switch-filter on') {
        nameFilterBtn.classList.remove('on');
        filterFuncName();
    } else if (priceFilterBtn.className == 'switch-filter on') {
        priceFilterBtn.classList.remove('on');
        filterFuncPrice();
    } else {
        renderPizza(copiedArray);
    }
};

const condition = ({ingredients}) => {
    const searchRequest = productsSearchInp.value.toLowerCase();
    return ingredients.some(name => name.match(searchRequest));
};

const searchFunc = () => {

    if (mainManuBtn.className == 'on') { productsCall(); }
    if (errorMessage.classList == "error") { errorMessage.classList.add("hidden"); }

    root.innerHTML = '';
    copiedArray = [];
    const productsArr = [...arr];

    productsArr.forEach((element) => {
        if (condition(element)) { copiedArray.push(element); }
    });

    if (copiedArray.length) {
        filterForSearch();
    } else {
        errorMessage.classList.remove("hidden");
    }
};
searchForm.addEventListener('submit', searchFunc, productsCall);

productsSearchInp.addEventListener('input', evt => searchFunc());

// reset search
const resetBtn = document.getElementById('reset_button');

const resetSearchItems = () => {
    copiedArray = [...arr];
    root.innerHTML = '';
    nameFilterBtn.className = 'switch-filter';
    priceFilterBtn.className = 'switch-filter';
    renderPizza(copiedArray);
};
resetBtn.addEventListener('click', resetSearchItems);

// product card & cart
const productsCartCounter = document.getElementById('cart-count');
const shoppingCartBtn = document.getElementById('shopping_cart_button');
const customerCartSection = document.getElementById('customer_cart');
const totalPrice = document.getElementById('total_price');
const customPizzaBlock = document.getElementById('custom_pizza');
const customCloseBtn = document.getElementById('custom_close_button');
const customControle = document.getElementById('custom_controle');

const saveCartLocal = () => {
    localStorage.setItem('customerCart', JSON.stringify(customerCartArr));
}

const cartCharCounter = () => {
    productsCartCounter.innerHTML = customerCartArr.length;
    totalPrice.innerHTML = customerCartArr.reduce((result, { price, amount }) => result + price * amount, 0);
};

const findIndex = (id) => {
    let index;
    copiedArray.forEach(element => {
        if (element.id == id) {
            index = copiedArray.indexOf(element);
        }
    });
    return index;
};

const addCartItem = (id) => {

    if (customerCartArr.length > 0) {

        const checkSameId = customerCartArr.find((pizzaObj) => {
            return pizzaObj.id == id;
        });
        checkSameId ? ++checkSameId.amount : customerCartArr.push(copiedArray[findIndex(id)]);

    } else {
        customerCartArr.push(copiedArray[findIndex(id)]);
    }
    saveCartLocal();
    cartCharCounter();
};

const editCall = div => {
    customPizzaBlock.classList.remove('hidden');
    const selectedOdj = copiedArray[findIndex(div.id)];
    selectedOdj.renderChooseGroup();
    customName.className = div.id;
};

root.onclick = event => {
    const div = event.target.closest('div');
    if (event.target.className == 'edit_button') {
        editCall(div);
        return;
    }
    if (event.target.className == 'add_button') {
        addCartItem(div.id);
        return;
    }
    if (div.tagName == 'DIV') {
        div.classList.toggle('clicked');
    }
};

const clearCartRoot = () => {
    cartRoot.innerHTML = '';
};

const cartRender = () => {
    clearCartRoot();
    cartCharCounter();
    customerCartArr.forEach(pizza => {
        const obj = new PizzaCard(pizza);
        obj.createCartCard(customerCartArr);
    });
};

const printEmpty = () => {
    clearCartRoot();
    cartRoot.innerHTML = 'Сart is empty';
};

const cartCall = () => {
    if (shoppingCartBtn.className == '') {
        shoppingCartBtn.className = 'on';
        mainManuBtn.classList = '';
        productsManuBtn.className = '';
        productsWrap.classList.add('hidden');
        startContent.classList.add('hidden');
        customerCartSection.classList.remove('hidden');

        customerCartArr.length ? cartRender() : printEmpty();
    }
};
shoppingCartBtn.addEventListener('click', cartCall);

const setCartItem = (article, btn) => {

    const selectedObj = customerCartArr.find((pizzaObj) => {
        return pizzaObj.id == article.id;
    });

    const selectedObjIdex = customerCartArr.indexOf(selectedObj);
    if (btn == 'delete') {
        if (selectedObj.amount == 1) {
            customerCartArr.splice(selectedObjIdex, 1)
        } else {
            selectedObj.amount--;
        }
    } else {
        selectedObj.amount++;
    }
    saveCartLocal();
};

cartRoot.onclick = event => {
    const article = event.target.closest('article');
    if (event.target.className == 'delete_button') {
        setCartItem(article, 'delete');
        cartRender();
        return;
    } else if (event.target.className == 'pluss_button') {
        setCartItem(article, 'plus');
        cartRender();
        return;
    } else return;
};

const createUniqId = () => Math.round(Math.random() * 1000000);

const closeCustom = () => {
    customPizzaBlock.classList.add('hidden');

    if (customControle.classList == 'custom_controle hidden') {
        const currentId = customName.className;
        const changedObj = new PizzaCard(copiedArray[findIndex(currentId)]);

        changedObj.id = createUniqId();
        copiedArray[findIndex(currentId)] = changedObj;

        root.innerHTML = '';
        renderPizza(copiedArray);
    } else if (customControle.classList == 'custom_controle') {
        customControle.classList.add('hidden');
    }
};
customCloseBtn.addEventListener('click', closeCustom);

const localStorageCheck = () => {
    if (localStorage.getItem('customerCart')) {
        customerCartArr = JSON.parse(localStorage.getItem('customerCart'));
        cartCharCounter();
    }
};
localStorageCheck();

// pizza customize
const customWindowBtn = document.getElementById('custom_window_btn');
const customPizzaBody = document.getElementById('custom_pizza');

const changeIngredients = (btn) => {
    const list = event.target.closest('ul');
    const listItem = event.target.closest('li');
    const selectedIngredient = listItem.className.replace('_', ' ');
    const itemIngredients = copiedArray[findIndex(list.id)].ingredients;

    if (btn == 'delete_button') {
        const searchIndex = itemIngredients.indexOf(selectedIngredient);
        if (searchIndex >= 0) { itemIngredients.splice(searchIndex, 1) }
    } else if (btn == 'pluss_button') {
        itemIngredients.push(selectedIngredient);
    }

    const changedObj = new PizzaCard(copiedArray[findIndex(list.id)]);
    changedObj.renderChooseGroup();
    copiedArray[findIndex(list.id)] = changedObj;
    root.innerHTML = '';
    renderPizza(copiedArray);
};

customPizzaBody.onclick = event => {
    if (event.target.className == 'delete_button') { changeIngredients('delete_button'); }
    else if (event.target.className == 'pluss_button') { changeIngredients('pluss_button'); }
    else if (event.target.className == 'custom_add_button') {
        addCartItem(copiedArray[copiedArray.length - 1].id);
        cartRender();
        closeCustom();
        return;
    } else return;
}

let customPizzaArr = [];

const createCustomPizza = () => {

    if (customPizzaBlock.classList == 'custom_pizza hidden') {

        customPizzaBlock.classList.remove('hidden');
        customControle.classList.remove('hidden');

        const newPizzaObj = {
            id: createUniqId(),
            name: `Custom pizza ${customPizzaArr.length + 1}`,
            ingredients: [],
        };

        const newPizza = new PizzaCard(newPizzaObj);
        newPizza.renderChooseGroup();
        customPizzaArr.push(newPizza);
        copiedArray.push(newPizza);
    }
};
customWindowBtn.addEventListener('click', createCustomPizza);

// BUY BTN
const cartSubmitBtn = document.getElementById('cart_submit_button');

const buyItems = () => {
    if (confirm('Confirm your purchase')) {
    customerCartArr = [];
    cartRender();
    printEmpty();
    localStorage.clear();
    }
};
cartSubmitBtn.addEventListener('click', buyItems);