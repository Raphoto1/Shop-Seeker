//general Array deploy
let designs = [];
let likedList= [];

async function bringInfo(){
const infoBase = await fetch(`./Script/designs.json`)
const infoBaseJson = await infoBase.json()
await infoBaseJson.forEach(e => {
    designs.push(e);
})
await firstLoad();
}

bringInfo()

//funciones
function loadCards(fil) {
    fil.forEach(e => {
        deployDesigns(e);
        deployShops(e);
    });
    loadAddButtons(fil);
    memoryManage.saveNav(fil);
}

function loadCardsModal(fil) {
    fil.forEach(e => {
        deployListModal(e);
        deployShops(e);
    })
}

function deployListModal(fil) {
    console.log(fil);
    const card =`
    <div id="card" class="col">
            <div class="card h-100">
                <img src=${fil.photo} class="card-img-top designImage">
                <div class="card-Body">
                    <h5 class="card-title">${fil.title}</h5>
                    <p class="card-text">${fil.text}</p>
                    <p class="card-text">${fil.style}</p>
                    <div id="shopList${fil.id}">
                    </div>
                </div>
            </div>
        </div>
    `
    const groupCardsModal = document.getElementById (`shopResume`);
    groupCardsModal.innerHTML += card;
}

function rebuildGroupCardsModal(){
    const cardsRemove = document.getElementById("shopResume");
    cardsRemove.remove()
    const cardHolder =`
    <div id="shopResume" class="row row-cols-1 row-cols-md-2 g-2">
    </div>
        `
        const groupCards = document.getElementById (`modalGroup`);
        groupCards.innerHTML += cardHolder;  
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

async function filterGeneral(element,item){
        let eFiltrado = await designs.filter(e => e[item] == `${element}`);
        await console.log(eFiltrado);
        return await eFiltrado;    
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
        Swal.fire({
            text:`${findForList.title} has been already added to your list`,
            icon:`warning`
        })
    }else{
       likedList.push(findForList); 
       countDesigns++;
       addCounterNum();
       memoryManage.saveList(likedList);
       Toastify({
        text: `${findForList.title} Added to list`,
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
    }
    
}

//Metodo manejo de memoria
const memoryManage ={
    async saveNav(arr){
    await console.log(arr);
    await localStorage.setItem("Design",JSON.stringify(arr));
    const testVuelta = JSON.parse(localStorage.getItem("Design"))
    await console.log(testVuelta);
},
    async saveList(arr){
    await console.log(arr);
    await localStorage.setItem("designList",JSON.stringify(arr));
    localStorage.setItem("designListCount",JSON.stringify(countDesigns));
}
}

async function firstLoad(){
    //revisar memoria ultima navegacion
    if(memoryBack !== null){
        console.log("estoy en recuerdo")
        await loadCards(memoryBack);
    }else{
        await loadCards(designs);
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
let triggerList = document.getElementById(`triggerList`);

//trabajar DOM
btnCheckList.onclick = async() => {
    if(likedList == ""){
        Swal.fire({
            text:`Please add a design to your list`,
            icon:`warning`
        })
    }else{
        await rebuildGroupCardsModal();
        await loadCardsModal(likedList);
        Toastify({
            text: "List loaded",
            className: "info",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();
    }
}

filteringShop.onchange = async() =>{
    const selectedShop = filteringShop.value;
    switch (selectedShop) {
        case "0":
            rebuildGroupCards();
            loadCards(designs);
            Toastify({
                text: "All Shops Loaded",
                className: "info",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
            break;
        case "1":
            rebuildGroupCards();
            let filteredShopsRed = await filterGeneral("","shop1");
            await loadCards(filteredShopsRed);
            Toastify({
                text: "Shop1 Loaded",
                className: "info",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
            break;
        case "2":
            rebuildGroupCards();
            let filteredShopsSoc = await filterGeneral("","shop2");
            loadCards(filteredShopsSoc);
            Toastify({
                text: "Shop2 Loaded",
                className: "info",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
            break;
        case "3":
            rebuildGroupCards();
            let filteredShopsDis = await filterGeneral("","shop3");
            loadCards(filteredShopsDis);
            Toastify({
                text: "Shop3 Loaded",
                className: "info",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
            break;
        default:
            console.log(`selecciono default${selectedShop}`);
            break;
    }
    
}

filteringStyle.onchange = async() =>{
    const selectedStyle = filteringStyle.value;
    switch (selectedStyle) {
        case "0":
            rebuildGroupCards();
            loadCards(designs);
            Toastify({
                text: "All Styles Loaded",
                className: "info",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
            break;
        case "1":
            rebuildGroupCards();
            let filteredByStyleDigital = await filterGeneral("Digital","style");
            loadCards(filteredByStyleDigital);
            Toastify({
                text: "digital loaded",
                className: "info",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
            break;
        case "2":
            rebuildGroupCards();
            let filteredByStyleTraditional = await filterGeneral("Traditional","style");
            loadCards(filteredByStyleTraditional);
            Toastify({
                text: "Traditional Loaded",
                className: "info",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
            break;
        case "3":
            rebuildGroupCards();
            let filteredByStylePhoto = await filterGeneral("Photography","style");
            loadCards(filteredByStylePhoto);
            Toastify({
                text: "Photography Loaded",
                className: "info",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
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
    localStorage.removeItem("designListCount");
    Toastify({
        text: "List Cleared",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
}


//funcion cargar TRABAJO EN LOCALSTORAGE
let memoryBack =  JSON.parse(localStorage.getItem("Design"));
let memoryListBack = JSON.parse(localStorage.getItem("designList"));
let memoryListCountBack = JSON.parse(localStorage.getItem("designListCount"))

