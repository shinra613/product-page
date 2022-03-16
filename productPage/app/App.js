
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

const cartHandler = (productName, productId, quantity, Image, price) => {





    let checker = cartData.find((i) => i.id == productId);


    if (checker == undefined && quantity > 0) {

        let total = quantity * price;

        cartData.push({ name: productName, id: productId, quantity: quantity, Image: Image, price: price, amount: total });

    } else if (checker.id == productId) {

        cartData[cartData.indexOf(cartData.find((i) => i.id == productId))].quantity = quantity;
        cartData[cartData.indexOf(cartData.find((i) => i.id == productId))].amount = cartData[cartData.indexOf(cartData.find((i) => i.id == productId))].quantity * price;

    }




}

const cardDisplayHandler = (cartData) => {

    console.log(cartData);

    const parentsec = document.getElementById('cart-container');
    parentsec.innerHTML = "";
    let totalCounter = 0;

    const childCheckout = document.createElement("button");
    childCheckout.innerHTML = "Proceed to checkout"
    childCheckout.className = "Cart-checkout"
    const cptotalholder = document.createElement("div");
    cptotalholder.className = "totaldiv"
    const cptotallabel = document.createElement("div");
    cptotallabel.innerHTML = "Total:";
    const cptotal = document.createElement("div");

    cartData.map((i) => {


        totalCounter += i.amount;




        const cartCard = document.createElement("div");
        cartCard.className = "cart-card";

        const cpname = document.createElement("div");
        cpname.innerHTML = i.name;

        const cpquan = document.createElement("div");
        cpquan.innerHTML = i.quantity;

        const cpprice = document.createElement("div");
        cpprice.innerHTML = i.price;

        const cpamount = document.createElement("div");
        cpamount.innerHTML = "$" + i.amount;

        const cpimage = document.createElement("img");
        cpimage.src = i.Image;
        cpimage.loading = "lazy"

        cartCard.appendChild(cpimage);
        cartCard.appendChild(cpname);
        cartCard.appendChild(cpquan);
        cartCard.appendChild(cpprice);
        cartCard.appendChild(cpamount);


        parentsec.appendChild(cartCard);



    });

    cptotalholder.appendChild(cptotallabel);
    cptotal.innerHTML = "$" + totalCounter;
    cptotalholder.appendChild(cptotal);

    parentsec.appendChild(cptotalholder);
    parentsec.appendChild(childCheckout);

    childCheckout.addEventListener("click", () => { finalCheckout(); });

}

const finalCheckout = () => {
    const cname = document.getElementById('order-cname');

    const email = document.getElementById('order-email');



    const customerSec = document.getElementById('customer-section');
    const productSec = document.getElementById('Product-section');

    customerSec.style.display = "block";

    productSec.style.display = "none";



    const revertButton = document.getElementById('page-revert');
    revertButton.addEventListener('click', () => {

        customerSec.style.display = "none";

        productSec.style.display = "block";

        console.log('loggin');

    });

    const ConfirmButton = document.getElementById('payment');
    ConfirmButton.addEventListener('click', () => {
        console.log("order confirm");
        cartData.push({ customerName: cname.value, customerEmail: email.value });
        orderHandler();
    });


}


const orderHandler = () => {
     
    const customerSec = document.getElementById('customer-section');
    const productSec = document.getElementById('Product-section');
    const cartSec = document.getElementById('Cart-section');
    const tqSec = document.getElementById('tqnote-section');

    


    
    let customerDetails = cartData.splice(cartData.length - 1, 1);
    let productlist = [];
    let quantitylist = [];
    let newAmount = 0;

    cartData.map((i) => {
        newAmount += i.quantity*i.price
        productlist.push(i.id);
        quantitylist.push(i.name+"x"+i.quantity);
    });

    console.log(cartData);
    console.log(customerDetails[0]);

    
       
        let formData = {
            "data":{
            "Name": {
                "first_name": customerDetails[0].customerName,
            },
            "Email": customerDetails[0].customerEmail,
            "Product_Name":productlist,
            "quantity1": quantitylist.toString(),         
            "total": newAmount
        }}
        

        ZOHO.CREATOR.init()
        .then(function (data) {
            var config = {
                appName: "product-page",
                formName: "Order",
                data: formData
            }
            ZOHO.CREATOR.API.addRecord(config).then(function (response) {
                if (response.code == 3000) {
                    console.log("Record added successfully");
                    customerSec.style.display = "none";
                    productSec.style.display = "none";
                    cartSec.style.display = "none";
                    tqSec.style.display = "block";
                } else { 
                    console.log(response);
                    console.log(formData);
                }
            });
        });

    

    


}


const divDisplayHandler = () => {
    const productSec = document.getElementById('Product-section');
    const cartSec = document.getElementById('Cart-section');
    const productDis = document.getElementById('product-display');

    cartSec.style.display = "block"
    productSec.style.width = "50%";
    cartSec.style.width = "40%"
    productDis.style.flexDirection = "column";

}

const itemRemovalHandler = (prodid, quan) => {



    if (quan == 0) {

        let indexvar = cartData.indexOf(cartData.find((i) => i.id == prodid))
        cartData.splice(indexvar, 1);
        cardDisplayHandler(cartData);
    }




}

const emptyCartHandler = () => {

    console.log('reached');

    console.log(cartData);

    if (!Array.isArray(cartData) || !cartData.length) {


        const cartSec = document.getElementById('Cart-section');
        const productSec = document.getElementById('Product-section');
        const productDis = document.getElementById('product-display');
        cartSec.style.display = "none";
        productSec.style.width = "100%";
        productDis.style.flexDirection = "row"
    }
}

const plus = (data, value) => {


    let exquantity = value;
    let qantityIP = document.getElementsByClassName(data);
    newValue = parseInt(exquantity) + 1;
    qantityIP[0].setAttribute("value", newValue);


}


const minus = (data) => {



    let qantityIP = document.getElementsByClassName(data)[0];

    if (qantityIP.value > 0) {

        newValue = parseInt(qantityIP.value) - 1;
        qantityIP.setAttribute("value", newValue);

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


//     childquantity.className = "product-quantity";
//     const quanplus = document.createElement("span");
//     quanplus.className = "plus" + i.ID;
//     quanplus.innerHTML = "+"
//     const quantity = document.createElement("input");
//     quantity.className = "quantity" + i.ID;
//     quantity.setAttribute("type", "text");
//     quantity.setAttribute("value", 0);
//     const quanminus = document.createElement("span");
//     quanminus.className = "minus" + i.ID;
//     quanminus.innerHTML = "-"

//     quanplus.addEventListener("click", () => { plus(quantity.className, quantity.value); });
//     quanminus.addEventListener("click", () => { minus(quantity.className); });

//     childquantity.appendChild(quanplus);
//     childquantity.appendChild(quantity);
//     childquantity.appendChild(quanminus);

//     childCheckout.innerHTML = "Add to cart";
//     childCheckout.addEventListener("click", () => {
//         cartHandler(i.Product_Name, i.ID, quantity.value, dummyImg, i.price); cardDisplayHandler(cartData); divDisplayHandler(); itemRemovalHandler(i.ID, quantity.value); emptyCartHandler();
//     })
//     const namenode = document.createTextNode(i.Product_Name);
//     const pricenode = document.createTextNode('$ ' + i.price);
//     childName.appendChild(namenode);
//     childPrice.appendChild(pricenode);
//     childImage.src = dummyImg;
//     childImage.loading = "lazy"
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


                childquantity.className = "product-quantity";
                const quanplus = document.createElement("span");
                quanplus.className = "plus" + i.ID;
                quanplus.innerHTML = "+"
                const quantity = document.createElement("input");
                quantity.className = "quantity" + i.ID;
                quantity.setAttribute("type", "text");
                quantity.setAttribute("value", 0);
                const quanminus = document.createElement("span");
                quanminus.className = "minus" + i.ID;
                quanminus.innerHTML = "-"

                quanplus.addEventListener("click", () => { plus(quantity.className, quantity.value); });
                quanminus.addEventListener("click", () => { minus(quantity.className); });

                childquantity.appendChild(quanplus);
                childquantity.appendChild(quantity);
                childquantity.appendChild(quanminus);

                childCheckout.innerHTML = "Add to cart";
                childCheckout.addEventListener("click", () => {
                    cartHandler(i.Product_Name, i.ID, quantity.value, imgURL, i.price); cardDisplayHandler(cartData); divDisplayHandler(); itemRemovalHandler(i.ID, quantity.value); emptyCartHandler();
                })
                const namenode = document.createTextNode(i.Product_Name);
                const pricenode = document.createTextNode('$ ' + i.price);
                childName.appendChild(namenode);
                childPrice.appendChild(pricenode);
                childImage.src = imgURL;
                childImage.loading = "lazy"
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



