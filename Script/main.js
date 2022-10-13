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
            position:"center",
            gravity:"bottom",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();
    }else{
        await load.cards(designs);
        Toastify({
            text: "Welcome to my shops seeker",
            className: "info",
            position:"center",
            gravity:"bottom",
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

function rebuildGroupCardsListModal(){
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
            <a href="${shop}" class="btn" target="_blank"><img src="${icon}" class="iconList" alt="${shop}"></a>
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

const addToList = (desId)=>{
    const findForList = designs.find((desi) => desi.id === desId);
    const checkList = likedList.find((desi) => desi.id === desId);

    if(findForList && checkList){
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
        position:"center",
        gravity:"bottom",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
    }
}

const remFromList = (desId) => {
    const checkListModal = likedList.find((desi) => desi.id === desId);
    const index = likedList.indexOf(checkListModal);
    likedList.splice(index,1);
    countDesigns--;
    addCounterNum();
    memoryManage.saveList(likedList);
    rebuildGroupCardsListModal();
    load.cardsListModal(likedList);
    Swal.fire({
        text:`${checkListModal.title} Design removed`,
        icon:`warning`
    })
}

function removeLastSession(fil){
    memoryFilterShop = filteringShop.length;
    memoryFilterStyle = filteringStyle.length;
    if (memoryFilterShop === 5 || memoryFilterStyle === 5) {
        removeOptionShop = filteringShop.options[4];
        removeOptionStyle = filteringStyle.options[4];
        removeOptionShop.remove();
        removeOptionStyle.remove();
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
    remButtons(arr){
        arr.forEach((des)=>{
            const btn = document.getElementById(`rem${des.id}`)
            btn.addEventListener(`click`,()=>{
                remFromList(des.id);
            })
        })
    },
    cardsListModal(fil) {
        fil.forEach(e => {
            deploy.listModal(e);
            deploy.shopsModal(e);
        })
        load.remButtons(fil);
    },
    async cards(fil) {
        await fil.forEach(e => {
            deploy.designs(e);
            deploy.shops(e);
            deploy.imgModals(e);
        });
        load.addButtons(fil);
        memoryManage.saveNav(fil);
    },
    cardsModal(fil) {
        fil.forEach(e => {
            deploy.imgModals(e);
        })
    }
}

const deploy = {
    designs(fil){
        const card =`
        <div id="card" class="col">
                <div class="card h-100 text-center">
                    <img src=./assets/Img/${fil.id}.jpg class="card-img-top designImage" data-bs-toggle="modal" data-bs-target="#mod${fil.id}" alt="${fil.title}">
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
    async shops(fil){
        let iconRed = "./assets/Icons/redbubble.png"
        let iconSoc = "./assets/Icons/society6_icon.png"
        let iconDis = "./assets/Icons/displate.png"
        let shop1Ava = await checkShops(fil.shop1,iconRed);
        let shop2Ava = await checkShops(fil.shop2,iconSoc);
        let shop3Ava = await checkShops(fil.shop3,iconDis);
        const shops =`
            ${shop1Ava}
            ${shop2Ava}
            ${shop3Ava}
        `
        const shopList = document.getElementById(`shopList${fil.id}`);
        shopList.innerHTML += shops;
    },
    async shopsModal(fil){
        let iconRed = "./assets/Icons/redbubble.png"
        let iconSoc = "./assets/Icons/society6_icon.png"
        let iconDis = "./assets/Icons/displate.png"
        let shop1Ava = await checkShops(fil.shop1,iconRed);
        let shop2Ava = await checkShops(fil.shop2,iconSoc);
        let shop3Ava = await checkShops(fil.shop3,iconDis);
        const shops =`
            ${shop1Ava}
            ${shop2Ava}
            ${shop3Ava}
        `
        const shopList = document.getElementById(`shopListModal${fil.id}`);
        shopList.innerHTML += shops;
    },
    imgModals(fil){
        const mod =`<div class="modal fade" id="mod${fil.id}" tabindex="-1" aria-labelledby="mod${fil.id}" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">${fil.title}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <img src=./assets/Img/${fil.id}.jpg alt="${fil.title}" class="w-100">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>`
        const modals = document.getElementById(`modalsGroup`);
        modals.innerHTML += mod;
    },
    listModal(fil) {
        console.log(fil);
        const card =`
        <div id="card" class="col">
                <div class="card h-100">
                    <img src=./assets/Img/${fil.id}.jpg class="card-img-top designImage">
                    <div class="card-Body">
                        <h5 class="card-title">${fil.title}</h5>
                        <p class="card-text">${fil.text}</p>
                        <p class="card-text">${fil.style}</p>
                        <div id="shopListModal${fil.id}">
                        </div>
                        <button id="rem${fil.id}" class="btn btn-warning">remove from List</button>
                    </div>
                </div>
            </div>
        `
        const groupCardsListModal = document.getElementById (`shopResume`);
        groupCardsListModal.innerHTML += card;
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
    await localStorage.setItem("Design",JSON.stringify(arr));
    const testVuelta = JSON.parse(localStorage.getItem("Design"))
},
    async saveList(arr){
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
btnClearFilter.onclick = async () => {
    await rebuildGroupCards();
    await load.cards(designs);
    memoryFilter = filteringShop.options[0].selected = `selected`;
    memoryFilter = filteringStyle.options[0].selected = `selected`;
    Toastify({
        text: "All Shops Loaded",
        className: "info",
        position:"center",
        gravity:"bottom",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)"
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
        await rebuildGroupCardsListModal();
        await load.cardsListModal(likedList);
        Toastify({
            text: "List loaded",
            className: "info",
            position:"center",
            gravity:"bottom",
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
                position:"center",
                gravity:"bottom",
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
                position:"center",
                gravity:"bottom",
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
                position:"center",
                gravity:"bottom",
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
                position:"center",
                gravity:"bottom",
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
                position:"center",
                gravity:"bottom",
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
                position:"center",
                gravity:"bottom",
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
                position:"center",
                gravity:"bottom",
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
                position:"center",
                gravity:"bottom",
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
    rebuildGroupCardsListModal()
    localStorage.removeItem("designList");
    localStorage.removeItem("designListCount");
    Toastify({
        text: "List Cleared",
        className: "info",
        position:"center",
        gravity:"bottom",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
}

//TRABAJO EN LOCALSTORAGE
let memoryBack =  JSON.parse(localStorage.getItem("Design"));
let memoryListBack = JSON.parse(localStorage.getItem("designList"));
let memoryListCountBack = JSON.parse(localStorage.getItem("designListCount"))

