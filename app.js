/* Set up cart*/

let addItemBtns = document.querySelectorAll(".addItem");
let cartItem = document.querySelector(".cartItem");
let count = 0;
let emptyCart = document.querySelector("#empty-cart");
let removeItemBtns = document.querySelectorAll(".removeItem");
let cartFullContainer =  document.querySelector("#full-cart-container");

addItemBtns.forEach(addItemBtn => {
    addItemBtn.addEventListener('click', addItem)
})

removeItemBtns.forEach(removeItemBtn => {
    removeItemBtn.addEventListener('click', removeItem)
})


window.onload = () => {
    count = localStorage.getItem("foodItems") ? +localStorage.getItem("foodItems") : 0;
    displayItemAmount(count);
    displayCart(count);

}

function addItem(e){
    e.preventDefault();
    count += 1;
    localStorage.setItem("foodItems", JSON.stringify(count));
    displayItemAmount(count);
    displayCart(count);

}

function removeItem(e){
    e.preventDefault();
    count -= 1;
    if(count < 0){
        count = 0;
        displayItemAmount(count);
        displayCart(count);
    }
    localStorage.setItem("foodItems", JSON.stringify(count));
    displayItemAmount(count);
    displayCart(count);

}


function displayItemAmount(data){

    if(data > 0){
        cartItem.innerHTML = data;
    }

    else {
        cartItem.innerHTML = null;
    }
}


function displayCart(count){
    if(window.location.href == "file:///D:/Wake%20Tech/s2022/WEB125/finalProject/cart.html"){ // change it after post

        if(count > 0){
            emptyCart.style.display = "none";
            cartFullContainer.style.display ="block";
            document.querySelector("#full-cart").innerHTML = "<h1>You have " + count + " dishes in your cart!</h1>"
        }

        if(count <= 0){
            emptyCart.style.display = "block";
            cartFullContainer.style.display ="none";
            document.querySelector("#full-cart").innerHTML = null;
        }

    }
    

}