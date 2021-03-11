let products = []; //global variable. This might be bad, I don't know.
//A function too get all the products from an API.
function getProducts() {
    const url = 'https://fakestoreapi.com/products';

    fetch(url)
        .then((resp) => resp.json())
        .then((json) => {
            for (var i = 0; i < json.length; i++) {
                products.push(json[i]);
            }
            renderProducts(products);
        })
        .catch(function (error) { //if we encounter an error, we print it to the console.
            console.log(error);
        });
}
//foreach product in the array that we pass in, we'll render a 'card'.
//TODO ADD EVENT LISTNER
function renderProducts(productsArray) {
    let output = "";
    productsArray.forEach(product => {
        output += `
       <div class="col-lg-4 col-md-6 mb-4">
       <div class="card h-100">
           <a href="#"><img class="card-img-top imgMain" src="${product.image}" alt=""></a>
           <div class="card-body">
               <h4 class="card-title">
                   <a href="#">${product.title}</a>
               </h4>
               <h5>${product.price}</h5>
               <p class="card-text">${product.description}</p>
           </div>
           <div class="card-footer">
               <button class="btn btn-primary" onclick="getProduct(${product.id})">Buy</button> 
           </div>
       </div>
   </div>
       `
    });
    document.getElementById("products").innerHTML = output;
}

//we pass in an ID as argument, if that ID matches anything in our products list
//we get it.
function getProduct(id) {
    products.forEach(product => {
        if(product.id == id){
            addProductToCart(product);
        }
    });
}