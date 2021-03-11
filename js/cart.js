let cartItems = [];

//Adds a product too our cart, for this we use the local storage.
function addProductToCart(product) {
    let cartProduct = localStorage.getItem(product.id); // we try too get the item.
    if (cartProduct === null) { //If getItem() returns null, that means we do not have the product in the cart. 
        let cartProduct = {
            "id": product.id,
            "title": product.title,
            "price": product.price,
            "description": product.description,
            "amount": 1, //We can hardcode the value too once, since we know the user just added one item.
            "imageUrl": product.image
        }

        localStorage.setItem(product.id, JSON.stringify(cartProduct));
    }
    else {
        cartProduct = JSON.parse(localStorage.getItem(product.id)); //If the above did not return null, we get the cartProduct from local storage.
        cartProduct.amount += 1; //We simply add 1 too our amount. 
        localStorage.setItem(product.id, JSON.stringify(cartProduct)); //and we save it again.
    }
}
//we get all the items from our local storage.
function getAllCartItems() {
    let products = []
    for (const key in localStorage) {
        if (Object.hasOwnProperty.call(localStorage, key)) {
            const value = localStorage[key];
            products.push(JSON.parse(value));
        }
    }
    renderCart(products)
}
//We render out an array of products.
function renderCart(productsArray) {
    let output = "";

    productsArray.forEach(product => {
        output += `<tr>
            <th class="pl-0 border-0" scope="row">
                <div class="media align-items-center"><a class="reset-anchor d-block animsition-link" href="detail.html"><img src="${product.imageUrl}" alt="..." width="70" /></a>
                    <div class="media-body ml-3"><strong class="h6"><a class="reset-anchor animsition-link" href="#">${product.title}</a></strong></div>
                </div>
            </th>
            <td class="align-middle border-0">
                <p class="mb-0 small">${product.price}</p>  
            </td>
            <td class="align-middle border-0">
                <div class="border d-flex align-items-center justify-content-between px-3"><span class="small text-uppercase text-gray headings-font-family">Quantity</span>
                    <div class="quantity">
                        <button onclick="removeItemFromCart(${product.id})" class="dec-btn p-0" ><i class="fas fa-caret-left"></i></button>
                        <input class="form-control form-control-sm border-0 shadow-0 p-0" type="text" value="${product.amount}" />
                        <button onclick="addCartItemAmount(${product.id})" class="inc-btn p-0"><i class="fas fa-caret-right"></i></button>
                    </div>
                </div>
            </td>
            <td class="align-middle border-0">
                <p class="mb-0 small">$${product.price * product.amount}</p>
            </td>
            <td class="align-middle border-0" onclick="removeAllItemsFromCart(${product.id})"><a class="reset-anchor" href="#" id="removeAll"><i class="fas fa-trash-alt small text-muted"></i></a></td>
        </tr>
        `;
    });

    document.getElementById("cartBody").innerHTML = output;
}

//this function will remove all of the choosen product in our cart.
function removeAllItemsFromCart(productId) {
    localStorage.removeItem(productId); //since we remove an item we have too render again.
    getAllCartItems(); //we this the function because it'll also render our items. This might be bad, but it works.
    renderOrder()   
}

//we remove only 1 item from our product in our cart.
function removeItemFromCart(productId) {
    let cartProduct = JSON.parse(localStorage.getItem(productId));
    cartProduct.amount -= 1; //hardcoded too one, since we only want too remove 1 at a time.
    if (cartProduct.amount <= 0) { //We can't have items with 0 quanities in our cart, that would be weird. If we have 1 item and remove one more we simply remove the product.
        localStorage.removeItem(productId);
    }
    else{
        localStorage.setItem(productId, JSON.stringify(cartProduct));
    }
    getAllCartItems();
    renderOrder()
}

//we add 1 quanity too the product in our cart.
function addCartItemAmount(productId) {
    let cartProduct = JSON.parse(localStorage.getItem(productId));
    cartProduct.amount += 1;
    localStorage.setItem(productId, JSON.stringify(cartProduct));
    getAllCartItems();
    renderOrder()
}