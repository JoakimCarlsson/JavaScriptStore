
//this function returns an array with all the products from our localStorage
function getOroder() {
    const products = []
    for (const key in localStorage) {
        if (Object.hasOwnProperty.call(localStorage, key)) {
            const value = localStorage[key];
            products.push(JSON.parse(value));
        }
    }
    return products;
}
//a function that renders our total order in checkout.html
function renderOrder() {
    const productsArray = getOroder();
    let output = "";

    productsArray.forEach(product => {
        output += `<li class="d-flex align-items-center justify-content-between"><strong
        class="small font-weight-bold">${product.title} x${product.amount}</strong><span
        class="text-muted small">$${product.price * product.amount}</span></li>
        <li class="border-bottom my-2"></li>`;
    });

    output += `                                
    <li class="d-flex align-items-center justify-content-between"><strong
    class="text-uppercase small font-weight-bold" id="totalAmount">Total:</strong><span>$${GetTotal()}</span>
    </li>`

    document.getElementById("totalOrder").innerHTML = output;
}

//When we placed an order, and we submit. 
//We come too our Confirmation.html, then we use this function too render everything we bought.
//After we done rendering we clear local storage. because then we 'bought' everything.

function renderOrderConfirmation() {
    const productsArray = getOroder();
    let output = "";
    productsArray.forEach(product => {
        output += `
        <div class="pl-0 border-0" scope="row">
        <div class="media align-items-center"><a class="reset-anchor d-block animsition-link" href="detail.html"><img src="${product.imageUrl}" alt="..." width="70" /></a>
            <div class="media-body ml-3"><strong class="h6"><a class="reset-anchor animsition-link">${product.title} (Qty:${product.amount})</a></strong></div>
            <p class="mb-0 small">$${product.price * product.amount}</p>
        </div>
        </div>
        <div class="mb-3">
        <hr class="new1">
    </div>
    </div>
    `;
    });

    output += `                                
    <li class="d-flex align-items-center justify-content-between"><strong
    class="text-uppercase small font-weight-bold" id="totalAmount">Total:</strong><span>$${GetTotal()}</span>
    </li>`
    document.getElementById("orderedItems").innerHTML = output;
    localStorage.clear();
}

//This fucntion just gets the total amount of what everything costs.
function GetTotal() {
    const productsArray = getOroder();
    let amount = 0;
    productsArray.forEach(product => {
        amount += product.amount * product.price;
    });

    return amount;
}