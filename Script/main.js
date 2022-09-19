//general deploy
let designs = [];
let likedList= [];

class Design{
    constructor(id,photo,title,text,style,shop1,shop2,shop3){
        this.id = id;
        this.photo = photo;
        this.title = title;
        this.text = text;
        this.style = style;
        this.shop1 = shop1;
        this.shop2 = shop2;
        this.shop3 = shop3;
    }

    deployDesigns(){
        const card =`
        <div id="card" class="col">
                <div class="card h-100">
                    <img src=${this.photo} class="card-img-top designImage">
                    <div class="card-Body">
                        <h5 class="card-title">${this.title}</h5>
                        <p class="card-text">${this.text}</p>
                        <p class="card-text">${this.style}</p>
                        <a href="#" id=add${this.id} class="btn btn-primary">add to List</a>
                        <div id="shopList${this.id}">
                        </div>
                    </div>
                </div>
            </div>
        `
        const groupCards = document.getElementById (`groupCards`);
        groupCards.innerHTML += card;  
    }
    
    deployShops(){
        let shop1Ava = checkShops(this.shop1);
        let shop2Ava = checkShops(this.shop2);
        let shop3Ava = checkShops(this.shop3);
        const shops =`
            ${shop1Ava}
            ${shop2Ava}
            ${shop3Ava}
        `
        const shopList = document.getElementById(`shopList${this.id}`);
        shopList.innerHTML += shops;
    }
}

function checkShops(shop){
    let link;
    if(shop !== ""){
        link =`
        <a href="${shop}" class="btn">shop cargada ${shop}</a>
        `
    }else{
        link = ``;
    }
    return link;
}
//agregar guardado en memoria para que cargue la sesion anterior PENDIENTE
function loadCards(fil) {
    fil.forEach(e => {
        e.deployDesigns();
        e.deployShops();
    });
}

function rebuildGroupCards(){
    const cardHolder =`
    <div id="groupCards" class="row row-cols-1 row-cols-md-4 g-4">
    </div>
        `
        const groupCards = document.getElementById (`designCards`);
        groupCards.innerHTML += cardHolder;  
}

let design1 = new Design(`001`,`"/assets/Img/Flamingo.jpg"`,`Flamingo`,`love flamingos`,`Traditional`,`redbubble.com`,`society6.com`,``);
let design2 = new Design(`002`,`"/assets/Img/Flamingo.jpg"`,`Flamingo`,`love flamingos`,`Digital`,`redbubble.com`,``,`displate.com`);
let design3 = new Design(`003`,`"/assets/Img/Flamingo.jpg"`,`Flamingo`,`love flamingos`,`Digital`,``,`society6.com`,``);

designs.push(design1,design2,design3);

//agregamos filtros

//formulario de busqueda
//Traer Dom
let filteringShop = document.getElementById(`shopSelect`);
let filteringStyle = document.getElementById(`styleSelect`);
//trabajar DOM
filteringShop.onchange = () =>{
    console.log(`cambio a opcion ${filteringShop.value}`);
    const selectedShop = filteringShop.value;
    console.log(selectedShop);
    switch (selectedShop) {
        case "0":
            console.log(`selecciono all${selectedShop}`);
            break;
        case "1":
            console.log(`selecciono shop1${selectedShop}`);
            break;
        case "2":
            console.log(`selecciono shop2${selectedShop}`);
            break;
        case "3":
            console.log(`selecciono shop3${selectedShop}`);
            break;
        default:
            console.log(`selecciono default${selectedShop}`);
            break;
    }
    
}
// let selectedShop = filteringShop.value;

filteringStyle.onchange = () =>{
    const selectedStyle = filteringStyle.value;
    switch (selectedStyle) {
        case "0":
            console.log(`selecciono all${selectedStyle}`);
            break;
        case "1":
            const cardsRemove = document.getElementById("groupCards")
            cardsRemove.remove()
            rebuildGroupCards();
            loadCards(filteredStyles);
            break;
        case "2":
            console.log(`selecciono Traditional${selectedStyle}`);
            loadCards(filteredStyles);
            break;
        case "3":
            console.log(`selecciono Photography${selectedStyle}`);
            break;
        default:
            console.log(`selecciono default${selectedStyle}`);
            break;
    }
}
//filtros de array por shop
let filteredShops = designs.filter(e => e.shop == "redBubble");
console.log(filteredShops);
console.log(designs);
//Aqui funciona, se unifica una funcion para filtrar stilos
function filtrarGeneralStyle(elemento){
    let eFiltrado = designs.filter(e => e.style == `${elemento}`);
    return eFiltrado;
}
let test = filtrarGeneralStyle("Traditional");
//test2
function filtrarGeneral(espacio,elemento){
    espacioInner = espacio
    let eFiltrado = designs.filter(e => e.espacioInner == `${elemento}`);
    return eFiltrado;
}
let test2 = filtrarGeneral(style,"Digital");
console.log(test2);

//filtros array por style
let filteredStyles = designs.filter(e => e.style == "Digital");
// console.log(filteredStyles);

//funcion cargar


loadCards(designs);