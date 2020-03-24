let arr = [];

let i = 0;
class PizzaCard {
    constructor() {
        this.name = products[i].name;
        this.ingredients = products[i].ingredients;
        this.parameters = parametersCalculation(this.ingredients);
        this.price = this.parameters[0];
        this.calories = this.parameters[1];
        this.canvasCode = this.parameters[2];

        arr.push(this);
        i++;
    }

    createProductCard() {

        const article = document.createElement('article');
        root.appendChild(article);

        const canvas = document.createElement("CANVAS");
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

        const description = document.createElement('p');
        const ingredientsStr = 'Ingredients: ' + this.ingredients.join(', ') + '.';
        description.innerHTML = ingredientsStr;
        article.appendChild(description);

        const description2 = document.createElement('p');
        const caloriesStr = 'Calories: ' + this.calories + ' kcal';
        description2.innerHTML = caloriesStr;
        article.appendChild(description2);

        const description3 = document.createElement('span');
        const priceStr = 'Price: ' + this.price;
        description3.innerHTML = priceStr;
        article.appendChild(description3);
    }
}

//View changing part
gridViewBtn.onclick = function gridView() {
    if (gridViewBtn.className == "switch-button") {
        gridViewBtn.className = "switch-button on";
        listViewBtn.className = "switch-button";
        const labledStyle = document.getElementById("delete_lable");
        labledStyle.remove();
    }
};

listViewBtn.onclick = function listView() {
    if (listViewBtn.className == "switch-button") {
        gridViewBtn.className = "switch-button";
        listViewBtn.className = "switch-button on";

        const style = document.createElement('style');
        style.id = "delete_lable";
        style.innerHTML = listStyle;
        document.head.appendChild(style);
    }
};

//Filter part
nameFilterBtn.onclick = function nameFilter() {
    if (nameFilterBtn.className == "switch-filter") {
        nameFilterBtn.className = "switch-filter on";
        priseFilterBtn.className = "switch-filter";

        let filtredByName = coppyArrey(arr).sort((a, b) => {

            const nameA = a.name.toLowerCase(); 
            const nameB = b.name.toLowerCase();

            if (nameA < nameB) { return -1; }
            if (nameA > nameB) { return 1; }
            return 0;

        });

        root.innerHTML = '';
        filtredByName.forEach(pizza => pizza.createProductCard());

    } else {
        nameFilterBtn.className = "switch-filter";
        root.innerHTML = '';
        drowProducts();
    }
};

priseFilterBtn.onclick = function priseFilter() {
    if (priseFilterBtn.className == "switch-filter") {
        priseFilterBtn.className = "switch-filter on";
        nameFilterBtn.className = "switch-filter";

        let filtredByPrice = coppyArrey(arr).sort((a, b) => {

            const priceA = a.price;
            const priceB = b.price;

            return priceA - priceB;

        });
        console.log('filtred By price\n', filtredByPrice);
        root.innerHTML = '';
        filtredByPrice.forEach(pizza => pizza.createProductCard());

    } else {
        priseFilterBtn.className = "switch-filter";
        root.innerHTML = '';
        drowProducts();
    }
};

// search by ingredients Form
searchForm.onsubmit = function () {
    const searchRequest = headerSearchInp.value;
    console.log('search req', searchRequest);
    headerSearchInp.value = '';
    root.innerHTML = '';
    rootMainPage.innerHTML = '';

    let filtredBySearch = [];
    coppyArrey(arr).forEach((element) => {

        if (element.ingredients.reduce(function (result, name) {
            const searchLower = searchRequest.toLowerCase();
            const elementName = name.toLowerCase();
            const check = elementName.indexOf(searchLower) + 1;

            return result + check;
        }, 0)
        ) {
            filtredBySearch.push(element);
            console.log(element);
        }
    });

    if (nameFilterBtn.className == "switch-filter on") {

        filtredBySearch.sort((a, b) => {
            const getA = a.name;
            const getB = b.name;
            if (getA[0] < getB[0]) { return -1; }
            if (getA[0] > getB[0]) { return 1; }
            return 0;
        });
    }
    if (priseFilterBtn.className == "switch-filter on") {

        filtredBySearch.sort((a, b) => {
            const priceA = a.price;
            const priceB = b.price;
            return priceA - priceB;
        });
    }

    root.innerHTML = '';
    filtredBySearch.forEach(pizza => pizza.createProductCard());
};