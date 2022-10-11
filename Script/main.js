//general Array deploy
let designs = [];
let likedList= [];
let countDesigns = 0;
//Primera Carga
bringInfo()

//funciones
async function bringInfo(){
    const infoBase = await fetch(`./Script/designs.json`)
    const infoBaseJson = await infoBase.json()
    await infoBaseJson.forEach(e => {
        designs.push(e);
    })
    await firstLoad();
}

async function firstLoad(){
    //revisar memoria ultima navegacion
    if(memoryBack !== null){
        console.log("estoy en recuerdo")
        await load.cards(memoryBack);
        memoryFilter = filteringShop.options[4].selected = `selected`;
        memoryFilter = filteringStyle.options[4].selected = `selected`;
        Toastify({
            text: "Welcomeback!!",
            className: "info",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();
    }else{
        await load.cards(designs);
        Toastify({
            text: "Welcome to my shops seeker",
            className: "info",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();
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

function checkShops(shop,icon){
    let link;
    if(shop !== ""){
        link =`
            <a href="${shop}" class="btn"><img src="${icon}" class="iconList" alt="${shop}"></a>
            `
            console.log(`estamos en la shop ${shop}`);
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

function removeLastSession(fil){
    memoryFilterShop = filteringShop.length;
    memoryFilterStyle = filteringStyle.length;
    if (memoryFilterShop === 5 || memoryFilterStyle === 5) {
        removeOptionShop = filteringShop.options[4];
        removeOptionStyle = filteringStyle.options[4];
        removeOptionShop.remove();
        removeOptionStyle.remove();
    }else{
        console.log("Error");
    } 
}

//Metodos
const load = {
    addButtons(arr){
        arr.forEach((des)=>{
        const btn = document.getElementById(`add${des.id}`)
        btn.addEventListener(`click`,()=>{
            addToList(des.id);
        })
    })
    },
    cardsModal(fil) {
        fil.forEach(e => {
            deploy.listModal(e);
            deploy.shops(e);
        })
    },
    cards(fil) {
        fil.forEach(e => {
            deploy.designs(e);
            deploy.shops(e);
        });
        load.addButtons(fil);
        memoryManage.saveNav(fil);
    }
}

const deploy = {
    designs(fil){
        const card =`
        <div id="card" class="col">
                <div class="card h-100 text-center">
                    <img src=${fil.photo} class="card-img-top designImage" alt="${fil.title}">
                    <div class="card-Body">
                        <h5 class="card-title pt-2">${fil.title}</h5>
                        <p class="card-text">${fil.text}</p>
                        <p class="card-text">${fil.style}</p>
                        <button id="add${fil.id}" class="btn btn-primary">add to List</button>
                        <div id="shopList${fil.id}" class="d-flex justify-content-center">
                        </div>
                    </div>
                </div>
            </div>
        `
        const groupCards = document.getElementById (`groupCards`);
        groupCards.innerHTML += card;  
    },
    shops(fil){
        let iconRed = "./assets/Icons/redbubble.png"
        let iconSoc = "./assets/Icons/society6_icon.png"
        let iconDis = "./assets/Icons/displate.png"
        let shop1Ava = checkShops(fil.shop1,iconRed);
        let shop2Ava = checkShops(fil.shop2,iconSoc);
        let shop3Ava = checkShops(fil.shop3,iconDis);
        const shops =`
            ${shop1Ava}
            ${shop2Ava}
            ${shop3Ava}
        `
        const shopList = document.getElementById(`shopList${fil.id}`);
        shopList.innerHTML += shops;
    },
    listModal(fil) {
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
}

const filters = {
    styles(element,item){
        let eFiltrado = designs.filter(e => e[item] == `${element}`);
        console.log(eFiltrado);
        return eFiltrado;    
    },
    shops(element,item){
        let eFiltrado = designs.filter(e => e[item] !== `${element}`);
        console.log(eFiltrado);
        return eFiltrado;    
    }
}

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

//Traer Dom
let filteringShop = document.getElementById(`shopSelect`);
let filteringStyle = document.getElementById(`styleSelect`);
let btnCheckList = document.getElementById(`listDesign`);
let btnCheckListClear = document.getElementById(`listDesignClear`);
let btnClearFilter = document.getElementById(`clearFilter`)

//trabajar DOM
btnClearFilter.onclick = () => {
    rebuildGroupCards();
    load.cards(designs);
    memoryFilter = filteringShop.options[0].selected = `selected`;
    memoryFilter = filteringStyle.options[0].selected = `selected`;
    Toastify({
        text: "All Shops Loaded",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
}

btnCheckList.onclick = async() => {
    if(likedList == ""){
        Swal.fire({
            text:`Please add a design to your list`,
            icon:`warning`
        })
    }else{
        await rebuildGroupCardsModal();
        await load.cardsModal(likedList);
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
            removeLastSession();
            load.cards(designs);
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
            removeLastSession();
            memoryFilter = filteringStyle.options[0].selected = `selected`;
            let filteredShopsRed = filters.shops("","shop1");
            console.log(filteredShopsRed);
            load.cards(filteredShopsRed);
            Toastify({
                text: "Redbubble Shop Loaded",
                className: "info",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
            break;
        case "2":
            rebuildGroupCards();
            removeLastSession(filteringShop);
            memoryFilter = filteringStyle.options[0].selected = `selected`;
            let filteredShopsSoc = filters.shops("","shop2");
            console.log(filteredShopsSoc);
            load.cards(filteredShopsSoc);
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
            removeLastSession();
            memoryFilter = filteringStyle.options[0].selected = `selected`;
            let filteredShopsDis = filters.shops("","shop3");
            load.cards(filteredShopsDis);
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
            removeLastSession();
            load.cards(designs);
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
            removeLastSession();
            filteringShop.options[0].selected = `selected`;
            let filteredByStyleDigital = filters.styles("Digital","style");
            load.cards(filteredByStyleDigital);
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
            removeLastSession();
            filteringShop.options[0].selected = `selected`;
            let filteredByStyleTraditional = filters.styles("Traditional","style");
            load.cards(filteredByStyleTraditional);
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
            removeLastSession();
            filteringShop.options[0].selected = `selected`;
            let filteredByStylePhoto = filters.styles("Photography","style");
            load.cards(filteredByStylePhoto);
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

//TRABAJO EN LOCALSTORAGE
let memoryBack =  JSON.parse(localStorage.getItem("Design"));
let memoryListBack = JSON.parse(localStorage.getItem("designList"));
let memoryListCountBack = JSON.parse(localStorage.getItem("designListCount"))

