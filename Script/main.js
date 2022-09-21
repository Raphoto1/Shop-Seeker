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
                        <button id="add${this.id}" class="btn btn-primary">add to List</button>
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

let design1 = new Design(`001`,`"/assets/Img/Flamingo.jpg"`,`Flamingo`,`love flamingos`,`Traditional`,`redbubble.com`,`society6.com`,``);
let design2 = new Design(`002`,`"/assets/Img/Flamingo.jpg"`,`Flamingo`,`love flamingos`,`Digital`,`redbubble.com`,``,`displate.com`);
let design3 = new Design(`003`,`"/assets/Img/Flamingo.jpg"`,`Flamingo`,`love flamingos`,`Digital`,``,`society6.com`,``);

designs.push(design1,design2,design3);

//agregar guardado en memoria para que cargue la sesion anterior PENDIENTE
function loadCards(fil) {
    fil.forEach(e => {
        e.deployDesigns();
        e.deployShops();
    });
    loadAddButtons(fil);
    saveMem(fil);
}

function addCounterNum(){
    btnCheckList.innerHTML = `Check List (${countDesigns})`
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

function rebuildGroupCards(){
    const cardsRemove = document.getElementById("groupCards");
    cardsRemove.remove()
    const cardHolder =`
    <div id="groupCards" class="row row-cols-1 row-cols-md-4 g-4">
    </div>
        `
        const groupCards = document.getElementById (`designCards`);
        groupCards.innerHTML += cardHolder;  
}


function filtrarGeneral(elemento,item){
    let eFiltrado = designs.filter(e => e[item] == `${elemento}`);
    return eFiltrado;
}

function filtrarGeneralShop(elemento,item){
    let eFiltrado = designs.filter(e => e[item] !== `${elemento}`);
    return eFiltrado;
}

function loadAddButtons(arr){
    arr.forEach((des)=>{
    const btn = document.getElementById(`add${des.id}`)
    btn.addEventListener(`click`,()=>{
        addToList(des.id);
    })
})
}

const addToList = (desId)=>{
    const findForList = designs.find((desi) => desi.id === desId);
    const checkList = likedList.find((desi) => desi.id === desId);
    
    if(findForList == checkList){
        alert(`${findForList.title} has been already added to your list`)
    }else{
       likedList.push(findForList); 
       countDesigns++;
       addCounterNum();
    }
    
}

let countDesigns = 0;
//formulario de busqueda
//Traer Dom
let filteringShop = document.getElementById(`shopSelect`);
let filteringStyle = document.getElementById(`styleSelect`);
let btnCheckList = document.getElementById(`listDesign`);

//trabajar DOM
filteringShop.onchange = () =>{
    const selectedShop = filteringShop.value;
    switch (selectedShop) {
        case "0":
            rebuildGroupCards();
            loadCards(designs);
            break;
        case "1":
            rebuildGroupCards();
            loadCards(filteredShopsRed);
            break;
        case "2":
            rebuildGroupCards();
            loadCards(filteredShopsSoc);
            break;
        case "3":
            rebuildGroupCards();
            loadCards(filteredShopsDis);
            break;
        default:
            console.log(`selecciono default${selectedShop}`);
            break;
    }
    
}

filteringStyle.onchange = () =>{
    const selectedStyle = filteringStyle.value;
    switch (selectedStyle) {
        case "0":
            rebuildGroupCards();
            loadCards(designs);
            break;
        case "1":
            rebuildGroupCards();
            loadCards(filteredByStyleDigital);
            break;
        case "2":
            rebuildGroupCards();
            loadCards(filteredByStyleTraditional);
            break;
        case "3":
            rebuildGroupCards();
            loadCards(filteredByStylePhoto);
            break;
        default:
            console.log(`selecciono default${selectedStyle}`);
            break;
    }
}

btnCheckList.onclick = () =>{
    rebuildGroupCards();
    loadCards(likedList);
}
//filtros de array por shop
let filteredShopsRed = filtrarGeneralShop("","shop1");
let filteredShopsSoc = filtrarGeneralShop("","shop2");
let filteredShopsDis = filtrarGeneralShop("","shop3");
//filtros array por style
let filteredByStyleDigital = filtrarGeneral("Digital","style");
let filteredByStyleTraditional = filtrarGeneral("Traditional","style");
let filteredByStylePhoto = filtrarGeneral("Photo","style");

//funcion cargar TRABAJO EN LOCALSTORAGE
function saveMem(arr){
    console.log(arr);
    localStorage.setItem("Design",JSON.stringify(arr));
}

let memoryBack =  JSON.parse(localStorage.getItem("Design"))
console.log(memoryBack);

function firstLoad(){
    
    if(memoryBack !== null){
        console.log("estoy en recuerdo")
        loadCards(memoryBack);
    }else{
        loadCards(designs);
        console.log("estoy en primera vez");
    }
}
//CARGAS DE INICIO

firstLoad();
// loadCards(memoryBack);
// loadCards(designs);
