
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
// ]



// testData.map((i) => {
//     let imgName = i.Image.split("=");
//     let imgURL = 'https://creatorexport.zoho.com/file/buildsandbox/product-page/All_Products/' + i.ID + '/image-download?filepath=/' + imgName[1];
//     console.log(imgURL);
//     console.log(imgName);
//     const parent = document.getElementById('product-display');
//     const child = document.createElement("div");
//     const subChild = document.createElement("div");
//     const childImage = document.createElement("img");
//     const childName = document.createElement("h3");
//     const childPrice = document.createElement("h4");
//     const childCheckout = document.createElement("button");
//     childCheckout.innerHTML= "Checkout"
//     const namenode = document.createTextNode(i.Product_Name);
//     const pricenode = document.createTextNode('$ '+i.price);
//     childName.appendChild(namenode);
//     childPrice.appendChild(pricenode);
//     childImage.src = i.Image;
//     childImage.loading="lazy"
//     child.className = "product-card";
//     subChild.className = "product-desc";
   
//     subChild.appendChild(childName);
//     subChild.appendChild(childPrice);
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
                console.log("i");
                const parent = document.getElementById('product-display');
                const child = document.createElement("div");
                const subChild = document.createElement("div");
                const childImage = document.createElement("img");
                const childName = document.createElement("h3");
                const childPrice = document.createElement("h4");
                const childCheckout = document.createElement("button");
                childCheckout.innerHTML= "Add to Cart"
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
                subChild.appendChild(childCheckout);
                child.appendChild(childImage);
                child.appendChild(subChild);
                parent.appendChild(child);
            
            });


        }
        );
    });



