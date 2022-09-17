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
        <div class="col">
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

let design1 = new Design(`001`,`"/assets/Img/Flamingo.jpg"`,`Flamingo`,`love flamingos`,`Traditional`,`redbubble.com`,`society6.com`,``);
let design2 = new Design(`002`,`"/assets/Img/Flamingo.jpg"`,`Flamingo`,`love flamingos`,`Digital`,`redbubble.com`,``,`displate.com`);
let design3 = new Design(`003`,`"/assets/Img/Flamingo.jpg"`,`Flamingo`,`love flamingos`,`Digital`,``,`society6.com`,``);

designs.push(design1,design2,design3);

designs.forEach(e => {
    e.deployDesigns();
    e.deployShops();
});

//agregamos filtros

//formulario de busqueda
//Traer Dom
let filteringShop = document.getElementById(`shopSelect`);
let filteringStyle = document.getElementById(`styleSelect`);
//trabajar DOM
filteringShop.onchange = () =>{
    alert(`cambio a opcion ${filteringShop.value}`);
}
filteringStyle.onchange = () =>{
    alert(`cambio style ${filteringStyle.value}`);
}
//filtros de array por shop

function filterShop(){
    const result = designs.filter(designs => Design.style == Digital)
    console.log(result);
}
filtershop();