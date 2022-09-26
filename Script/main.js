//general Array deploy
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
}

let design1 = new Design(`001`,`"./assets/Img/Flamingo.jpg"`,`Flamingo`,`love flamingos`,`Traditional`,`redbubble.com`,`society6.com`,``);
let design2 = new Design(`002`,`"./assets/Img/Flamingo.jpg"`,`Bird`,`love Birds`,`Digital`,`redbubble.com`,``,`displate.com`);
let design3 = new Design(`003`,`"./assets/Img/Flamingo.jpg"`,`Dragon`,`love Dragons`,`Digital`,``,`society6.com`,``);
let design4 = new Design(`004`,`"./assets/Img/Flamingo.jpg"`,`Nigth photo chia`,`love night Photography`,`Photography`,``,``,`displate.com`);
let design5 = new Design(`005`,`"./assets/Img/Flamingo.jpg"`,`Flamingo2`,`love flamingos`,`Traditional`,`redbubble.com`,`society6.com`,``);
let design6 = new Design(`006`,`"./assets/Img/Flamingo.jpg"`,`Bird2`,`love Birds`,`Digital`,`redbubble.com`,``,`displate.com`);
let design7 = new Design(`007`,`"./assets/Img/Flamingo.jpg"`,`Dragon2`,`love Dragons`,`Digital`,``,`society6.com`,``);
let design8 = new Design(`008`,`"./assets/Img/Flamingo.jpg"`,`Nigth photo chia2`,`love night Photography`,`Photography`,``,``,`displate.com`);

designs.push(design1,design2,design3,design4,design5,design6,design7,design8);

//funciones
function loadCards(fil) {
    fil.forEach(e => {
        deployDesigns(e);
        deployShops(e);
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

function deployShops(fil){
    let shop1Ava = checkShops(fil.shop1);
    let shop2Ava = checkShops(fil.shop2);
    let shop3Ava = checkShops(fil.shop3);
    const shops =`
        ${shop1Ava}
        ${shop2Ava}
        ${shop3Ava}
    `
    const shopList = document.getElementById(`shopList${fil.id}`);
    shopList.innerHTML += shops;
}

function deployDesigns(fil){
    const card =`
    <div id="card" class="col">
            <div class="card h-100">
                <img src=${fil.photo} class="card-img-top designImage">
                <div class="card-Body">
                    <h5 class="card-title">${fil.title}</h5>
                    <p class="card-text">${fil.text}</p>
                    <p class="card-text">${fil.style}</p>
                    <button id="add${fil.id}" class="btn btn-primary">add to List</button>
                    <div id="shopList${fil.id}">
                    </div>
                </div>
            </div>
        </div>
    `
    const groupCards = document.getElementById (`groupCards`);
    groupCards.innerHTML += card;  
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
       saveMemList(likedList);
    }
    
}

function saveMem(arr){
    console.log(arr);
    localStorage.setItem("Design",JSON.stringify(arr));
}

function saveMemList(arr){
    console.log(arr);
    localStorage.setItem("designList",JSON.stringify(arr));
    localStorage.setItem("designListCount",JSON.stringify(countDesigns));
}

function firstLoad(){
    //revisar memoria ultima navegacion
    if(memoryBack !== null){
        console.log("estoy en recuerdo")
        loadCards(memoryBack);
    }else{
        loadCards(designs);
        console.log("estoy en primera vez");
    }
    //revisar memoria ultima lista
    if(memoryListBack !== null){
        console.log("recuerdo list");
        likedList = memoryListBack;
        countDesigns = memoryListCountBack;
        addCounterNum()
    }else{
        console.log("lista vacia");
    }
}

let countDesigns = 0;

//Traer Dom
let filteringShop = document.getElementById(`shopSelect`);
let filteringStyle = document.getElementById(`styleSelect`);
let btnCheckList = document.getElementById(`listDesign`);
let btnCheckListClear = document.getElementById(`listDesignClear`);

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

btnCheckListClear.onclick = () =>{
    likedList = [];
    countDesigns = 0
    addCounterNum();
    localStorage.removeItem("designList");
    localStorage.removeItem("designListCount")
}

btnCheckList.onclick = () =>{
    if(likedList == ""){
        alert(`Please add a design to your list`)
    }else{
        rebuildGroupCards();
        loadCards(likedList);
    }
    
}

//filtros de array por shop
let filteredShopsRed = filtrarGeneralShop("","shop1");
let filteredShopsSoc = filtrarGeneralShop("","shop2");
let filteredShopsDis = filtrarGeneralShop("","shop3");
//filtros array por style
let filteredByStyleDigital = filtrarGeneral("Digital","style");
let filteredByStyleTraditional = filtrarGeneral("Traditional","style");
let filteredByStylePhoto = filtrarGeneral("Photography","style");

//funcion cargar TRABAJO EN LOCALSTORAGE
let memoryBack =  JSON.parse(localStorage.getItem("Design"));
let memoryListBack = JSON.parse(localStorage.getItem("designList"));
let memoryListCountBack = JSON.parse(localStorage.getItem("designListCount"))
console.log(memoryBack);

//CARGAS DE INICIO

firstLoad();