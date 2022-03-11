
// let testData = [
//     {
//         "price": "15.00",
//         "Product_Name": "NutraBay Energy",
//         "ID": "4221105000000015011",
//         "type": "preworkout",
//         "Image": "/api/v2/buildsandbox/product-page/report/All_Products/4221105000000015011/Image/download?filepath=1646834118934_1.jpg"
//     },
//     {
//         "price": "30.00",
//         "Product_Name": "BigMuscel Energy",
//         "ID": "4221105000000015007",
//         "type": "preworkout",
//         "Image": "/api/v2/buildsandbox/product-page/report/All_Products/4221105000000015007/Image/download?filepath=1646834068904_3.jpg"
//     },
//     {
//         "price": "20.00",
//         "Product_Name": "Amino",
//         "ID": "4221105000000015003",
//         "type": "preworkout",
//         "Image": "/api/v2/buildsandbox/product-page/report/All_Products/4221105000000015003/Image/download?filepath=1646834027810_2.jpg"
//     }
// ];

let cartData = [];

let dummyImg = './1.jpg';

const cartHandler = (productName, productId, quantity) => {
    


    
    
    let checker = cartData.find((i) => i.id == productId);

   
    if (checker == undefined) {
        cartData.push({ name: productName, id: productId, quantity: quantity });
        
    } else if (checker.id == productId){ 
        
        cartData[cartData.indexOf(cartData.find((i) => i.id == productId))].quantity = quantity; 
       
    }
    console.log(cartData);

    cartData.map((i) => { 

        const parentsec = document.getElementsByClassName('cart-container');
        const cartCard = document.createElement("div");
        cartCard.className = "card-container";
        
        const cpname = document.createElement("div");
        cpname.innerHTML = i.productName;

        const cpquan = document.createElement("div");
        cpquan.innerHTML = i.quantity;

        cartCard.appendChild(cpname);
        cartCard.appendChild(cpquan);
        
        parentsec.appendChild();

    });
   
 }


const plus=(data,value)=>{


    let exquantity = value;
    let qantityIP = document.getElementsByClassName(data);
    newValue = parseInt(exquantity)  + 1; 
    qantityIP[0].setAttribute("value",newValue);


}


const minus=(data)=>{


    
    let qantityIP = document.getElementsByClassName(data)[0];

    if (qantityIP.value>0) {
        
        newValue = parseInt(qantityIP.value) - 1; 
        qantityIP.setAttribute("value",newValue);

    }
    

}


// testData.map((i) => {

//     let imgName = i.Image.split("=");
//     let imgURL = 'https://creatorexport.zoho.com/file/buildsandbox/product-page/All_Products/' + i.ID + '/Image/image-download?filepath=/' + imgName[1];
//     const parent = document.getElementById('product-display');
//     const child = document.createElement("div");
//     const subChild = document.createElement("div");
//     const childImage = document.createElement("img");
//     const childName = document.createElement("h3");
//     const childPrice = document.createElement("h4");
//     const childCheckout = document.createElement("button");
//     const childquantity = document.createElement("div");


//     childquantity.className="product-quantity";
//     const quanplus = document.createElement("span");
//     quanplus.className = "plus" + i.ID;
//     quanplus.innerHTML="+"
//     const quantity = document.createElement("input");
//     quantity.className = "quantity"+i.ID;
//     quantity.setAttribute("type", "text");
//     quantity.setAttribute("value", 0);
//     const quanminus = document.createElement("span");
//     quanminus.className = "minus"+i.ID;
//     quanminus.innerHTML = "-"

//     quanplus.addEventListener("click", () => { plus(quantity.className,quantity.value);} );
//     quanminus.addEventListener("click", () => { minus(quantity.className);});

//     childquantity.appendChild(quanplus);
//     childquantity.appendChild(quantity);
//     childquantity.appendChild(quanminus);

//     childCheckout.innerHTML = "Add to cart";
//     childCheckout.addEventListener("click",()=>{cartHandler(i.Product_Name,i.ID,quantity.value);})
//     const namenode = document.createTextNode(i.Product_Name);
//     const pricenode = document.createTextNode('$ '+i.price);
//     childName.appendChild(namenode);
//     childPrice.appendChild(pricenode);
//     childImage.src = dummyImg;
//     childImage.loading="lazy"
//     child.className = "product-card";
//     subChild.className = "product-desc";
   
//     subChild.appendChild(childName);
//     subChild.appendChild(childPrice);
//     subChild.appendChild(childquantity);
//     subChild.appendChild(childCheckout);
//     child.appendChild(childImage);
//     child.appendChild(subChild);
//     parent.appendChild(child);

    

// });



ZOHO.CREATOR.init()
    .then(function (data) {



        let config = {
            appName: "product-page",
            reportName: "All_Products",
            criteria: "(type == \"preworkout\")"
        }

        console.log('hi');

        ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {

            let testData = response.data;
            console.log(testData);
            
            
testData.map((i) => {

    let imgName = i.Image.split("=");
    let imgURL = 'https://creatorexport.zoho.com/file/buildsandbox/product-page/All_Products/' + i.ID + '/Image/image-download?filepath=/' + imgName[1];
    const parent = document.getElementById('product-display');
    const child = document.createElement("div");
    const subChild = document.createElement("div");
    const childImage = document.createElement("img");
    const childName = document.createElement("h3");
    const childPrice = document.createElement("h4");
    const childCheckout = document.createElement("button");
    const childquantity = document.createElement("div");


    childquantity.className="product-quantity";
    const quanplus = document.createElement("span");
    quanplus.className = "plus" + i.ID;
    quanplus.innerHTML="+"
    const quantity = document.createElement("input");
    quantity.className = "quantity"+i.ID;
    quantity.setAttribute("type", "text");
    quantity.setAttribute("value", 0);
    const quanminus = document.createElement("span");
    quanminus.className = "minus"+i.ID;
    quanminus.innerHTML = "-"

    quanplus.addEventListener("click", () => { plus(quantity.className,quantity.value);} );
    quanminus.addEventListener("click", () => { minus(quantity.className);});

    childquantity.appendChild(quanplus);
    childquantity.appendChild(quantity);
    childquantity.appendChild(quanminus);

    childCheckout.innerHTML = "Add to cart";
    childCheckout.addEventListener("click",()=>{cartHandler(i.Product_Name,i.ID,quantity.value);})
    const namenode = document.createTextNode(i.Product_Name);
    const pricenode = document.createTextNode('$ '+i.price);
    childName.appendChild(namenode);
    childPrice.appendChild(pricenode);
    childImage.src = imgURL;
    childImage.loading="lazy"
    child.className = "product-card";
    subChild.className = "product-desc";
   
    subChild.appendChild(childName);
    subChild.appendChild(childPrice);
    subChild.appendChild(childquantity);
    subChild.appendChild(childCheckout);
    child.appendChild(childImage);
    child.appendChild(subChild);
    parent.appendChild(child);

    

});
            


        }
        );
    });



